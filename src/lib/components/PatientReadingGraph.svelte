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
	import type { Patient, Reading } from '$lib/types';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let patient: Patient & { reading: Reading[] };

	const data = {
		labels: patient.reading.map(({ date }) => new Date(date).toLocaleDateString()),
		datasets: [
			{
				label: 'IOP',
				data: patient.reading.map(({ iop }) => iop)
			}
		]
	};
</script>

<!-- A Line Graph of the Patient Reading set
iop by date -->
<div>
	<Line {data} />
</div>
