<script lang="ts">
	import { page } from '$app/stores';
	import { PatientGraph, PatientList, AddPatientBtn } from '$lib/components';
	import type { Patient, Reading } from '$lib/types';
	import { getReadingArray, isPostOp } from '$lib/utils/utils';
	import { getContext, setContext } from 'svelte';
	import type { PageData } from '../patient/$types';
	import type { Writable } from 'svelte/store';
	import type { Toast } from '$lib/stores';
	import SearchPatients from '$lib/components/patient/SearchPatients.svelte';
	import { goto } from '$app/navigation';

	const toast = getContext<Writable<Toast>>('toast');

	export let data: PageData;

	$: patients = data.patients.map(patient => {
		return {
			...patient,
			reading: getReadingArray(patient.reading)
		};	
	})

	setContext('patients', patients);

	const { url } = $page;

	// Redirects from patient/add contain patient data
	const redirectFrom = url.searchParams.get('redirectFrom');
	if (redirectFrom === 'deletePatient') {
		const nameLast = $page.url.searchParams.get('name_last');
		const nameFirst = $page.url.searchParams.get('name_first');
		toast.set({
			hasMessage: true,
			message: `Deleted patient ${nameLast}, ${nameFirst}`
		});
	}

	if (redirectFrom === 'patient/add') {
		const nameLast = $page.url.searchParams.get('name_last');
		const nameFirst = $page.url.searchParams.get('name_first');
		toast.set({
			hasMessage: true,
			message: `Added patient ${nameLast}, ${nameFirst}`
		});
	}
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
