<script lang="ts">
	import type { Patient } from '$types';
	import Typeahead from 'svelte-typeahead';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';

	const patients = getContext<Patient[]>('patients');

	const extract = (item: Patient) => item.name_last + ', ' + item.name_first;

	const handlePatientSelect = (item: {
		detail: {
			original: Patient;
		};
	}) => {
		goto(`/patient/${item.detail.original.id}`);
	};
</script>

<Typeahead label="Patient" hideLabel data={patients} {extract} on:select={handlePatientSelect} />
