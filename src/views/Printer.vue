<template>
	<div v-if="printer" id="printer">
		<section class="infos">
			<img :src="printer.icon">
			<h1>{{ printer.name }}</h1>
			<h2>{{ printer.info }}</h2>
			<div>
				{{ printer.state.state }}
				-
				{{ printer.state.message }}
			</div>
			<div>
				<fa icon="map-pin"/>
				{{ printer.location }}
			</div>
		</section>
		<section class="jobs">
			<table v-if="printer.jobs">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>User</th>
						<th>State</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="job in printer.jobs"
						:key="job.id"
					>
						<td>{{ job.id }}</td>
						<td @click="viewDocument(job)">{{ job.name }}</td>
						<td>by {{ job.user }}</td>

						<td v-if="job.state === 'completed'" class="job-completed">
							<fa icon="check"/>
						</td>
						<td v-else-if="job.state === 'canceled'" class="job-canceled">
							<fa icon="times"/>
						</td>
						<td v-else-if="job.state === 'processing'" class="job-processing">
							<svg viewBox="0 0 36 36">
								<path
									d="M18 2.0845
									a 15.9155 15.9155 0 0 1 0 31.831
									a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke-width="4"
									:stroke-dasharray="`${job.progress}, 100`"
								/>
							</svg>
						</td>
						<td v-else>{{ job.state }}</td>
					</tr>
				</tbody>
			</table>
			<div v-else>
				Loading
			</div>
		</section>
		<section class="stats">
			<polar :data="jobsStates" :height="300" :width="300" autoresize>
				<pie
					:radius="[50, 100]"
					show-label
					show-value
					label-prop="name"
					prop="value"
				/>
			</polar>
		</section>
	</div>	
	<div v-else>Loading</div>
</template>

<script>
import { ippRequest, TAG_TYPE_URI, TAG_TYPE_KEYWORD } from "@/ipp"
import { Polar, Pie } from 'laue'

export default {
	props: ['uri'],

	data() {
		return {
			printer: null,
			cupsGetDocument: false,
		}
	},

	components: {
		Polar,
		Pie,
	},

	computed: {
		jobsStates() {
			return Object.entries((this.printer.jobs || []).reduce((c, v) => {
				if (!(v.state in c))
					c[v.state] = 0
				c[v.state]++
				return c
			}, {})).map(([name, value]) => ({ name, value }))
		}
	},


	methods: {
		async viewDocument(job) {
			const res = await ippRequest('/ipp', 'CUPS-Get-Document', {
				attributes: {
					'attributes-charset': { type: 71, value: 'utf-8' },
					'attributes-natural-language': { type: 72, value: 'en' },
					'job-uri': { type: TAG_TYPE_URI, value: job.uri },
					'document-number': 1
				}
			})
		}
	},

	async mounted() {
		const { printerAttributes } = await ippRequest('/ipp', 'Get-Printer-Attributes', {
			attributes: {
				'attributes-charset': { type: 71, value: 'utf-8' },
				'attributes-natural-language': { type: 72, value: 'en' },
				'printer-uri': { type: TAG_TYPE_URI, value: this.uri }
			}
		})

		const {
			["printer-name"]: { value: name },
			["printer-info"]: { value: info },
			["printer-uuid"]: { value: uuid },
			["printer-icons"]: { value: icon },
			["printer-state"]: state,
			["printer-location"]: { value: location },
			["printer-state-message"]: { value: stateMessage },
			["printer-uri-supported"]: { value: uri },
			["printer-settable-attributes-supported"]: editableAttributesRaw,
			["printer-resolution-default"]: printerDefaultResolution,
			["printer-resolution-supported"]: printerResolutionsRaw,
			["operations-supported"]: supportedOps
		} = printerAttributes

		const editableAttributes = editableAttributesRaw.map(({ value }) => value)
		const printerResolutions = printerResolutionsRaw.map(({ crossFeed, feed, unit }) => ({
			crossFeed,
			feed,
			unit,
			default: printerDefaultResolution.crossFeed == crossFeed
				&& printerDefaultResolution.feed == feed
				&& printerDefaultResolution.unit == unit
		}))

		console.log(printerAttributes)

		this.printer = {
			name,
			info,
			uuid,
			icon,
			state: {
				state,
				message: stateMessage
			},
			uri,
			location,
			supportedOps,
			editableAttributes,
			printerResolutions,
			jobs: null
		}

		this.cupsGetDocument = supportedOps.includes("Cups-Get-Document")

		if (supportedOps.includes("Get-Jobs")) {

			const { jobAttributes } = await ippRequest('/ipp', 'Get-Jobs', {
				attributes: {
					'attributes-charset': { type: 71, value: 'utf-8' },
					'attributes-natural-language': { type: 72, value: 'en' },
					'printer-uri': { type: TAG_TYPE_URI, value: this.uri },
					'requested-attributes': { type: TAG_TYPE_KEYWORD, value: 'all' },
					'which-jobs': { type: TAG_TYPE_KEYWORD, value: 'all' }
				}
			})

			const jobs = Array.isArray(jobAttributes) ? jobAttributes : [jobAttributes]

			this.printer.jobs = jobs.map(({
				['job-id']: id,
				['job-state']: state,
				['job-name']: { value: name } = {},
				['job-media-progress']: progress,
				['job-originating-user-name']: { value: user } = {},
				['job-originating-host-name']: { value: hostname } = {},
				['job-uri']: { value: uri}
			}) => ({
				id,
				state,
				name,
				progress,
				user,
				hostname,
				uri
			})).reverse()

			console.log(jobAttributes)
		}
	}
}
</script>

<style lang="stylus">

	$red = #F44336;
	$blue = #2196F3;
	$green = #4CAF50;

	#printer {
		height: 100vh;
		display: flex;

		.infos {
			padding: 16px;
			background-color: white;
			box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
			min-width: 12%;

			& > img {
				width: 194px;
				height: @width;
				object-fit: cover;
			}
			003
			& > h1 {
				margin: 0;
				font-size: 20px;
			}
			& > h2 {
				margin: 0;
				font-size: 16px;
				font-weight: normal;
			}
		}

		.jobs {
			min-width: 44%;
			padding: 16px;
			display: flex;
			flex-direction: column;

			& > table {
				display: block;
				overflow-y: scroll;
				height: 100%;
				box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);

				td:nth-child(1), th:nth-child(1) {
					width: 10%;
				}

				td:nth-child(2), th:nth-child(2) {
					width: 50%;
				}

				td:nth-child(3), th:nth-child(3) {
					width: 30%;
				}

				td:nth-child(4), th:nth-child(4) {
					width: 10%;
				}

				tr {
					display: flex;
				}

				& > thead {
					box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
					height: 34px;
					position: sticky;
					top: 0;
					background-color: white;
					display: block;
				}

				& > tbody {
					display: block;
				}

				td, th {
					padding: 8px;
				}
			}

			.job-completed {
				color: $green;
			}

			.job-canceled {
				color: $red;
			}

			.job-processing > svg {
				stroke: $blue;
				width: 16px;
				height: @width;

				@keyframes rotate {
					0% {
						transform: rotate(0deg)
						//stroke-dashoffset: 0;
					}
					100% {
						transform: rotate(360deg)
						//stroke-dashoffset: 1000;
					}
				}

				animation: rotate infinite 1s;
			}

		}

		.stats {
			width: 44%;
		}
	}
</style>
