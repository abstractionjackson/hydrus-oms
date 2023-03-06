<script lang="ts">
	import { Line, Scatter } from 'svelte-chartjs';
	import 'chartjs-adapter-luxon';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		TimeScale,
		PointElement
	} from 'chart.js';
	export let data: import('../$types').PageServerData;
	const lineData = {
		datasets: data.readingList
			.filter(({ oir }) => 10000 > oir)
			.reduce((acc, cv) => {
				const patient = acc.find((item) => item.id === cv.patient_id);
				if (patient !== undefined) {
					patient.readings.push(cv);
				} else {
					acc.push({ id: cv.patient_id, readings: [cv] });
				}
				return acc;
			}, [])
			.map((patient) => ({
				label: patient.id,
				data: patient.readings.map((reading) => ({
					x: reading.date,
					y: reading.oir
				}))
			}))
	};
	const lineOptions = {
		scales: {
			x: {
				type: 'time'
			},
			y: {
				title: { text: 'oir', display: true },
				min: 0,
				max: 100
			}
		},
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Ocular Pressure Readings',
				font: {
					size: 24,
					weight: 'bold'
				}
			},
			legend: {
				display: false
			}
		}
	};
	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		TimeScale,
		CategoryScale,
		LinearScale,
		PointElement
	);
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">{data.title}</h2>
	<div class="border border-neutral-300 shadow-lg p-4 my-4 max-w-4xl mx-auto">
		<Line data={lineData} options={{ ...lineOptions }} />
	</div>
</main>
