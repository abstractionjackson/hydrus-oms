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
	import { HOMS_INTERVAL } from '$lib/constants';
	import type { Reading } from '$types';

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let reading: Reading[]
	const data = {
		labels: [...HOMS_INTERVAL].slice(1),
		datasets: [
			{
				label: 'IOP',
				data: reading.map(({ iop }) => iop),
				// color coral
				backgroundColor: 'rgba(255, 127, 80, 0.5)',
				borderColor: 'rgba(255, 127, 80, 1)',
				borderWidth: 1,
			},
			{
				label: 'Meds',
				data: reading
					.map(({ medication }) => medication),
				backgroundColor: 'rgba(128, 128, 128, 0.5)',
				borderColor: 'rgba(128, 128, 128, 1)',
				borderWidth: 1,
			}
		]
	};
</script>

<div>
	<Bar {data} />
</div>
