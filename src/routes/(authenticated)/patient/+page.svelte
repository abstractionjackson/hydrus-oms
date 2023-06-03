<script lang="ts">
	import { page } from '$app/stores';
	import { PatientGraph, PatientList, AddPatientBtn } from '$lib/components';
	import type { Patient, Reading } from '$lib/types';
	import { handleArrayResult } from '$lib/utils';
	import { getContext, setContext } from 'svelte';
	import type { PageData } from '../patient/$types';
	import type { Writable } from 'svelte/store';
	import type { Toast } from '$lib/stores';
	import SearchPatients from '$lib/components/patient/SearchPatients.svelte';

	const toast = getContext<Writable<Toast>>('toast');

	export let data: PageData;

	const patients = data.patients.map((patient) => {
		let reading = handleArrayResult<Reading>(patient.reading);
		return {
			...patient,
			reading
		};
	});

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

<main class="container-fluid">
	<section>
		<header>
			<h3>Patient</h3>
			<!-- <SearchPatients /> -->
			<AddPatientBtn />
		</header>
	</section>
	<section>
		<h3>IOP and Medication Averages</h3>
		<PatientGraph {patients} />
	</section>
	<section>
		<h3>All Patients</h3>
		<PatientList {patients} />
	</section>
</main>

<style>
	main {
		padding: 2rem 1rem;
	}
	header:first-of-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		height: min-content;
	}
	header:first-of-type > h3 {
		margin-bottom: 0;
	}
</style>
