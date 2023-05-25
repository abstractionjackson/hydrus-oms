<script lang="ts">
	import { page } from '$app/stores';
	import { PatientGraph, PatientList } from '$lib/components';
	import type { Reading } from '$lib/types';
	import { handleArrayResult } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { PageData } from '../patient/$types';
	import type { Writable } from 'svelte/store';
	import type { Toast } from '$lib/stores';

	const toast = getContext<Writable<Toast>>('toast');

	export let data: PageData;

	const patients = data.patients.map((patient) => {
		let reading = handleArrayResult<Reading>(patient.reading);
		return {
			...patient,
			reading
		};
	});

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
	<PatientGraph {patients} />
	<PatientList {patients} />
</main>

<style>
	main {
		padding: 2rem 1rem;
	}
</style>
