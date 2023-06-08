<script lang="ts">
	import { page } from '$app/stores';
	import { PatientGraph, PatientList, SearchPatients } from '$lib/components';
	import { getReadingArray } from '$lib/utils/utils';
	import { setContext } from 'svelte';
	import type { PageData } from '../patient/$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: patients = data.patients.map(patient => {
		return {
			...patient,
			reading: getReadingArray(patient.reading)
		};	
	})

	$: setContext('patients', patients);
	
</script>

<main class="container-fluid grid">
	<section>
		<header>
			<h3>Patients</h3>
			<SearchPatients />
		</header>
		<button on:click={() => goto('/patient/add')}>Add Patient</button>
		<details>
			<summary>Patient List</summary>
			<PatientList {patients} />
		</details>
	</section>
	<section>
		<h3>IOP and Medication Averages</h3>
		<PatientGraph patients={patients.map(patient => {
			return {
				...patient,
				reading: patient.reading
			}
		})} />
	</section>
</main>

<style>
	main {
		@media (min-width: 992px) {
			grid-template-columns: 1fr 4fr;
		}
	}
</style>
