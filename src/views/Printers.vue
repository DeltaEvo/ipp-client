<template>
	<div id="printers">
		<router-link
			v-for="printer in printers" :key="printer.uuid"
			tag="div"
			class="printer"
			:to="{ name: 'Printer', query: { uri: printer.uri }}"
		>
			<img :src="printer.icon">
			<h2>{{ printer.name }}</h2>
			<h3>{{ printer.info }}</h3>
		</router-link>
	</div>	
</template>

<script>
import { ippRequest, IPP_URL } from "@/ipp"
export default {
	data() {
		return {
			printers: []
		}
	},
	async mounted() {
		const { printerAttributes } = await ippRequest(IPP_URL, 'CUPS-Get-Printers', {
			attributes: {
				'attributes-charset': { type: 71, value: 'utf-8' },
				'attributes-natural-language': { type: 72, value: 'en' }
			}
		})
		console.log(printerAttributes)
		const printers = Array.isArray(printerAttributes) ? printerAttributes : [printerAttributes]

		this.printers = printers.map(({
			["printer-name"]: { value: name },
			["printer-info"]: { value: info },
			["printer-uuid"]: { value: uuid },
			["printer-icons"]: { value: icon },
			["printer-state"]: state,
			["printer-state-message"]: { value: stateMessage },
			["printer-uri-supported"]: { value: uri }
		}) => ({
			name,
			info,
			uuid,
			icon,
			uri,
			state: {
				value: state,
				message: stateMessage
			}
		}))
		console.log(this.printers)
	}
}
</script>

<style lang="stylus">
	#printers {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		height: 100vh;
		box-sizing: border-box;
		padding: 32px;

		align-items: flex-start;
		align-content: flex-start;

		.printer {
			background-color: white;
			padding: 8px;
			box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);

			&:hover {
				cursor: pointer;
				box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12);
			}

			& > img {
				width: 194px;
				height: @width;
				object-fit: cover;
			}

			& > h2 {
				margin: 0;
			}
			& > h3 {
				margin: 0;
			}
		}
	}
</style>
