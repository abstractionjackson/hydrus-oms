<script lang="ts">
	import { getContext } from 'svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import ReadingList from './ReadingList.svelte';

	const patient = getContext('patient');
	const { id, name_last, name_first, dob, operation, reading } = $patient;
	const sectionTitlePSI = 'Pressure History';
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">Patient Details</h2>
	{#if !patient}
		<h3>Loading...</h3>
	{:else}
		<article class="flex mx-auto w-fit">
			<!-- patient demo ifo -->
			<table class="mx-4 table">
				<thead>
					<th>Name</th>
					<th>Date of Birth</th>
				</thead>
				<tbody>
					<tr
						><td>{name_last}, {name_first}</td>
						<td>{new Date(Date.parse(dob)).toLocaleDateString()}</td></tr
					>
				</tbody>
			</table>
			<!-- edit btn -->
			<a href={`/patient/${id}/edit`} class="btn btn-sm btn-outline mx-4"> Edit </a>
		</article>
	{/if}
</main>
