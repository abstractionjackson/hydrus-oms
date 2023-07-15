<script lang="ts">
	import type { Patient, Reading } from '$types';
	import { Chart } from "chart.js"
	import { HOMS_INTERVAL } from '$lib/constants';
	import { getPatientReadingAverages, getPatientsIntervalMap } from '$lib/utils';
	import { onMount } from 'svelte';

	interface Patients extends Patient {
		reading: Reading[];
	}
	export let patients: Patients[];

	$: patientIntervalMap = getPatientsIntervalMap(patients)
	$: {
		patientIntervalMap.delete(HOMS_INTERVAL[0]); // delete pre-op
	};

	// chart
	let chart: HTMLCanvasElement
	const labels = [...HOMS_INTERVAL].slice(1);
	$: data = {
		labels,
		datasets: [
			{
				label: 'IOP',
				data: getPatientReadingAverages(patientIntervalMap, 'iop'),
				backgroundColor: 'rgba(255, 127, 80, 0.5)',
				borderColor: 'rgba(255, 127, 80, 1)',
				borderWidth: 1
			},
			{
				label: 'Medication',
				data: getPatientReadingAverages(patientIntervalMap, 'medication'),
				backgroundColor: 'rgba(128, 128, 128, 0.5)',
				borderColor: 'rgba(128, 128, 128, 1)',
				borderWidth: 1
			}
		]
	};

	// Execution
	onMount(() => {
		const ctx = chart.getContext('2d');
		if(ctx) {
			new Chart(ctx, {
				type: 'bar',
				data
			});
		}
	});
</script>

<div>
	<canvas bind:this={chart}></canvas>
</div>
