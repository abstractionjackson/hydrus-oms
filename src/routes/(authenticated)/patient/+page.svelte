<script lang="ts">
	import { page } from '$app/stores';
	import PatientList from '$lib/components/patient/PatientList.svelte';
	import type { PageData } from '../patient/$types';

	export let data: PageData;

	const { patients } = data;

	const { url } = $page;

	let redirectFrom = url.searchParams.get('redirectFrom');
	let patient_id: string;
	let patient_name_last: string;
	let patient_name_first: string;
	if (redirectFrom === 'patient/add') {
		patient_id = url.searchParams.get('id');
		patient_name_last = url.searchParams.get('name_last');
		patient_name_first = url.searchParams.get('name_first');
	}
</script>

<main class="container-fluid">
	<PatientList {patients} />
	{#if redirectFrom === 'patient/add'}
		<section>
			<article class="flash">
				<span class="icon success icon-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						width="auto"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</span>
				<span class="flash message"
					><a href={`/patient/${patient_id}`}>{patient_name_last}, {patient_name_first}</a><span
						>&nbsp;created</span
					></span
				>
			</article>
		</section>
	{/if}
</main>

<style>
	main {
		padding: 2rem 1rem;
	}
	section {
		margin: auto;
		max-width: var(--form-max-width);
	}
</style>
