<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import type { Medication, Patient, Reading } from '$lib/types';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let patient: Patient & { reading: Reading[]; medication: Medication[] };

	const data = {
		labels: patient.reading.map(({ date }) => new Date(date).toLocaleDateString()),
		datasets: [
			{
				label: 'IOP',
				data: patient.reading.map(({ iop }) => iop),
				// color coral
				backgroundColor: 'rgba(255, 127, 80, 0.5)',
				borderColor: 'rgba(255, 127, 80, 1)'
			},
			{
				label: 'Meds',
				data: patient.medication.map(({ amount }) => amount),
				// color light blue
				backgroundColor: 'rgba(173, 216, 230, 0.5)',
				borderColor: 'rgba(173, 216, 230, 1)'
			}
		]
	};
</script>

<!-- A Line Graph of the Patient Reading set
iop by date -->
<div>
	<Line {data} />
</div>
