import assert from 'assert'
import enums from './enums'

export const IPP_URL = 'http://cups.home.delta.sh'

const ATTRIBUTES_TAG = 0x01
const JOB_ATTRIBUTES_TAG = 0x02
const END_OF_ATTRIBUTES_TAG = 0x03
const PRINTER_ATTRIBUTES_TAG = 0x04

const TAG_TYPE_UNKNOWN = 0x12
const TAG_TYPE_NO_VALUE = 0x13
const TAG_TYPE_INTEGER = 0x21
const TAG_TYPE_BOOLEAN = 0x22
const TAG_TYPE_ENUM = 0x23
const TAG_TYPE_OCTET_STRING = 0x30
const TAG_TYPE_DATETIME = 0x31
const TAG_TYPE_RESOLUTION = 0x32
const TAG_TYPE_RANGE = 0x33
const TAG_TYPE_CHARSET = 0x47
const TAG_TYPE_TEXT_WITHOUT_LANGUAGE = 0x41
const TAG_TYPE_NAME_WITHOUT_LANGUAGE = 0x42
const TAG_TYPE_NATURAL_LANGUAGE = 0x48
const TAG_TYPE_MIME_MEDIA_TYPE = 0x49
export const TAG_TYPE_KEYWORD = 0x44
export const TAG_TYPE_URI = 0x45
const TAG_TYPE_URI_SCHEME = 0x46
const TAG_TYPE_BEG_COLLECTION = 0x34
const TAG_TYPE_END_COLLECTION = 0x37
const TAG_TYPE_MEMBER_ATTR_NAME = 0x4A

const asciiDecoder = new TextDecoder('ascii')
const asciiEncoder = new TextEncoder('ascii')

const textDecoder = new TextDecoder()
const textEncoder = new TextEncoder()

function deserialize(buffer, request) {
	const view = new DataView(buffer)

	let offset = 8
	let tag
	let lastName
	let multiple
	const groups = {}
	let attributes

	let collection
	let oldCollections = []
	let attr

	while ((tag = view.getInt8(offset++)) != END_OF_ATTRIBUTES_TAG) {
		if (tag >= 0x00 && tag <= 0x0F) {
			if (tag === ATTRIBUTES_TAG)
				groups.attributes = attributes = {}
			else if (tag == JOB_ATTRIBUTES_TAG) {
				if ("jobAttributes" in groups) {
					if (!Array.isArray(groups.jobAttributes))
						groups.jobAttributes = [groups.jobAttributes]
					groups.jobAttributes.push(attributes = {})
				} else
					groups.jobAttributes = attributes = {}
			}
			else if (tag == PRINTER_ATTRIBUTES_TAG) {
				if ("printerAttributes" in groups) {
					if (!Array.isArray(groups.printerAttributes))
						groups.printerAttributes = [groups.printerAttributes]
					groups.printerAttributes.push(attributes = {})
				} else
					groups.printerAttributes = attributes = {}
			}
			else
			{
				console.warn(`Unsupported group 0x${tag.toString(16)}`)
				throw new Error(`Unsupported group 0x${tag.toString(16)}`)
			}
			continue
		}
		assert(attributes)
		const nameLen = view.getInt16(offset)
		offset += 2
		const name = nameLen ? asciiDecoder.decode(buffer.slice(offset, offset += nameLen)) : lastName
		const valueLen = view.getInt16(offset)
		let value
		offset += 2
		switch (tag) {
			case TAG_TYPE_NO_VALUE:
				assert(valueLen == 0)
				break
			case TAG_TYPE_UNKNOWN:
				value = buffer.slice(offset, offset += valueLen)
				break
			case TAG_TYPE_INTEGER:
				value = view.getInt32(offset)
				offset += 4
				break
			case TAG_TYPE_BOOLEAN:
				value = view.getInt8(offset++) == 0x01
				break
			case TAG_TYPE_ENUM:
				assert(name in enums, `Enum ${name} not known`)
				value = enums[name][view.getInt32(offset)]
				if (!value)
				{
					value = view.getInt32(offset)
					console.warn('Unknown value', value, 'in enum', name)
				}
				offset += 4
				break
			case TAG_TYPE_DATETIME:
				assert(valueLen == 11)
				value = "date"
				offset += 11;
				//throw new Error('unsuported datetime')
				break
			case TAG_TYPE_RESOLUTION:
				const crossFeed  = view.getInt32(offset)
				offset += 4
				const feed  = view.getInt32(offset)
				offset += 4
				value = {
					type: 'resolution',
					crossFeed,
					feed,
					unit: view.getInt8(offset++)
				}
				break
			case TAG_TYPE_RANGE:
				const lower  = view.getInt32(offset)
				offset += 4
				const upper  = view.getInt32(offset)
				offset += 4
				value = {
					type: 'range',
					lower,
					upper
				}
				break
			case TAG_TYPE_OCTET_STRING:
			case TAG_TYPE_NAME_WITHOUT_LANGUAGE:
			case TAG_TYPE_TEXT_WITHOUT_LANGUAGE:
				value = {
					type: tag,
					value: valueLen ? textDecoder.decode(buffer.slice(offset, offset += valueLen)) : ""
				}
				break
			case TAG_TYPE_CHARSET:
			case TAG_TYPE_NATURAL_LANGUAGE:
			case TAG_TYPE_MIME_MEDIA_TYPE:
			case TAG_TYPE_KEYWORD:
			case TAG_TYPE_URI:
			case TAG_TYPE_URI_SCHEME:
				value = {
					type: tag,
					value: asciiDecoder.decode(buffer.slice(offset, offset += valueLen))
				}
				break
			case TAG_TYPE_BEG_COLLECTION:
				offset += valueLen // ignore value
				oldCollections.push(collection)
				value = {}
				break
			case TAG_TYPE_MEMBER_ATTR_NAME:
				attr = textDecoder.decode(buffer.slice(offset, offset += valueLen))
				continue
			case TAG_TYPE_END_COLLECTION:
				collection = oldCollections.pop();
				continue
			default:
				console.log(`Unsupported tag type 0x${tag.toString(16)} for ${name}`)
				offset += valueLen
		}
		if (collection)
		{
			// TODO: better collection support: eg multiple value
			assert(!(attr in collection))
			collection[attr] = value
		}
		else if (nameLen !== 0) {
			assert(!(name in attributes && Object.is(attributes[name],value)), `Duplicate attribute name ${name} with different value`)
			attributes[name] = value
			lastName = name
			multiple = false
		}
		else {
			assert(lastName, "Empty name")
			if (multiple)
				attributes[lastName].push(value)
			else
				attributes[lastName] = [attributes[lastName], value]
			multiple = true
		}
		if (tag == TAG_TYPE_BEG_COLLECTION)
			collection = value;
	}

	return {
		version: `${view.getInt8(0)}.${view.getInt8(1)}`,
		[request ? 'operation' : 'statusCode']: view.getInt16(2),
		id: view.getInt32(4),
		...groups,
		buffer: buffer.slice(offset)
	}
}

function calcSize(attributes) {
	let size = 0
	for (const [key, value] of Object.entries(attributes)) {
		size += 1 // tag
		size += 2 // name-length
		size += key.length // name
		size += 2 // value-length

		switch (typeof value) {
			case 'number':
				size += 4
				break
			case 'boolean':
				size += 1
				break
			case 'string':
				size += value.length
				break
			case 'object':
				if (value.type === 'range') size += 8
				else if (value.type === 'resolution') size += 9
				else if (typeof value.type === 'number') size += value.value.length
				break
		}
	}
	return size
}

function serialize({ version, operation, statusCode, id, attributes }) {
	const buffer = new Uint8Array(8 + 2 + calcSize(attributes))
	const view = new DataView(buffer.buffer)
	const [major, minor] = version.split('.')

	view.setInt8(0, major)
	view.setInt8(1, minor)
	view.setInt16(2, operation || statusCode)
	view.setInt32(4, id)
	view.setInt8(8, ATTRIBUTES_TAG)

	let offset = 9

	for (const [key, value] of Object.entries(attributes)) {
		if (key in enums)
			view.setInt8(offset++, TAG_TYPE_ENUM)
		else switch (typeof value) {
			case 'number':
				view.setInt8(offset++, TAG_TYPE_INTEGER)
				break
			case 'boolean':
				view.setInt8(offset++, TAG_TYPE_BOOLEAN)
				break
			case 'object':
				if (value.type == 'range') view.setInt8(offset++, TAG_TYPE_RANGE)
				else if (value.type == 'resolution') view.setInt8(offset++, TAG_TYPE_RESOLUTION)
				else if (typeof value.type === 'number') view.setInt8(offset++, value.type)
				break
		}
		const string = asciiEncoder.encode(key)
		view.setInt16(offset, string.byteLength)
		offset += 2
		assert(key.length == string.byteLength)
		buffer.set(string, offset)
		offset += string.byteLength
		switch (typeof value) {
			case 'number':
				view.setInt16(offset, 4)
				offset += 2
				view.setInt32(offset, value)
				offset += 4
				break
			case 'boolean':
				view.setInt16(offset, 1)
				offset += 2
				view.setInt8(offset++, value ? 0x01 : 0x00)
				break
			case 'object':
				if (value.type == 'range') {
					view.setInt8(offset++, TAG_TYPE_RANGE)
				} else if (value.type == 'resolution') {
					view.setInt8(offset++, TAG_TYPE_RESOLUTION)
				} else if (typeof value.type === 'number') {
					const string = asciiEncoder.encode(value.value)
					view.setInt16(offset, string.byteLength)
					offset += 2
					assert(value.value.length == string.byteLength)
					buffer.set(string, offset)
					offset += string.byteLength
				}
				break
		}
	}
	view.setInt8(offset, END_OF_ATTRIBUTES_TAG)

	return buffer
}

async function isCups(uri) {
	const { headers } = await fetch(uri, {
		method: 'OPTIONS'
	})
	return headers.has('server') && headers.get('server').includes('CUPS')
}

let id = 1
export async function ippRequest(uri, operation, data) {
	const [operationId] = Object.entries(enums['operations-supported']).find(([key, value]) => value === operation) || []
	if (!operationId)
		throw new Error(`Unknown operation ${operation}`)
	const buffer = await fetch(uri, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/ipp',
			'Authorization': 'Basic cm9vdDpyb290'
		},
		body: serialize({
			version: '2.1',
			id: id++,
			operation: operationId,
			...data
		})
	}).then(res => res.arrayBuffer())
	return deserialize(buffer, false)
}