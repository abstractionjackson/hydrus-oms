<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const patient = writable();
	patient.set(data.patient);
	setContext('patient', patient);
</script>

<slot />
