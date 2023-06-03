<!-- takes a list of patient readings, and graphs average iop by interval -->
<script lang="ts">
	import type { Medication, Patient, Reading } from '$lib/types';
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
	import { onMount } from 'svelte';

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	interface Patients extends Patient {
		reading: Reading[];
	}
	export let patients: Patients[];

	function filterPostOpReadings(reading: Reading, case_date: string) {
		return new Date(reading.date).getTime() > new Date(case_date).getTime();
	}

	onMount(() => {
		//transform the patients array to include only post-op readings
		patients = patients.map((patient) => {
			let reading = patient.reading.filter((reading) =>
				filterPostOpReadings(reading, patient.case_date ?? '')
			);
			return {
				...patient,
				reading
			};
		});
	});

	// chart
	const labels = [...INTERVALS];
	const data = {
		labels,
		datasets: [
			{
				label: 'IOP',
				data: getReadingAvgByInterval(patients, 'iop'),
				backgroundColor: 'rgba(255, 127, 80, 0.5)',
				borderColor: 'rgba(255, 127, 80, 1)',
				borderWidth: 1
			},
			{
				label: 'Medication',
				data: getReadingAvgByInterval(patients, 'medication'),
				backgroundColor: 'rgba(128, 128, 128, 0.5)',
				borderColor: 'rgba(128, 128, 128, 1)',
				borderWidth: 1
			}
		]
	};
</script>

<div>
	<Bar {data} />
</div>
