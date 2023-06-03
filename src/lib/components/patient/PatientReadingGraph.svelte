<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	} from 'chart.js';
	import { getReadingAvgByInterval } from '$lib/utils';
	import { INTERVALS } from '$lib/constants';
	import type { Medication, Patient, Reading } from '$lib/types';

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let patient: Patient & { reading: Reading[]; medication: Medication[] };

	const data = {
		labels: INTERVALS,
		datasets: [
			{
				label: 'IOP',
				data: patient.reading.filter(({ date }) => date > patient.case_date).map(({ iop }) => iop),
				// color coral
				backgroundColor: 'rgba(255, 127, 80, 0.5)',
				borderColor: 'rgba(255, 127, 80, 1)'
			},
			{
				label: 'Meds',
				data: patient.reading
					.filter(({ date }) => date > patient.case_date)
					.map(({ medication }) => medication),
				// color light blue
				backgroundColor: 'rgba(173, 216, 230, 0.5)',
				borderColor: 'rgba(173, 216, 230, 1)'
			}
		]
	};
</script>

<div>
	<Bar {data} />
</div>
