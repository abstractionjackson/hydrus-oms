<!-- takes a list of patient readings, and graphs average iop by interval -->
<script lang="ts">
	import type { HOMSInterval, Patient, Reading } from '$types';
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
	import { getPatientsIntervalMap } from '$lib/utils';
	import type { IntervalMap } from '$lib/models';

	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	interface Patients extends Patient {
		reading: Reading[];
	}
	export let patients: Patients[];

	function getAverages(intervalMap: IntervalMap, key: 'iop' | 'medication'): number[] {
			const averages: number[] = [];
			for (const [interval, value] of intervalMap.entries()) {
				if (value.length === 0) continue;
				const averageIop =
					value.reduce((acc: number, reading: Reading) => acc + reading[key], 0) /
					value.length;
				averages.push(averageIop);
			}
			return averages;
		};

	$: patientIntervalMap = getPatientsIntervalMap(patients)
	$: {
		patientIntervalMap.delete(HOMS_INTERVAL[0]); // delete pre-op
	};

	// chart
	const labels = [...HOMS_INTERVAL].slice(1);
	$: data = {
		labels,
		datasets: [
			{
				label: 'IOP',
				data: getAverages(patientIntervalMap, 'iop'),
				backgroundColor: 'rgba(255, 127, 80, 0.5)',
				borderColor: 'rgba(255, 127, 80, 1)',
				borderWidth: 1
			},
			{
				label: 'Medication',
				data: getAverages(patientIntervalMap, 'medication'),
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
