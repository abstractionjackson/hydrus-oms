<script lang="ts">
	import { getContext } from 'svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import ReadingList from './ReadingList.svelte';

	const patient = getContext('patient');
	const { id, name_last, name_first, dob, operation, reading } = $patient;
	const sectionTitlePSI = 'Pressure History';
</script>

<main class="text-center">
	<heading class="flex mx-auto items-center justify-center">
		<a href="/patient" class="mx-4"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
				/>
			</svg>
		</a>
		<h2 class="text-4xl font-bold my-4">Patient Details</h2>
	</heading>
	{#if !patient}
		<h3>Loading...</h3>
	{:else}
		<article class="flex mx-auto w-fit">
			<!-- patient demo ifo -->
			<table class="mx-4 table">
				<thead>
					<th>Last Name</th>
					<th>First Name</th>
					<th>Date of Birth</th>
				</thead>
				<tbody>
					<tr>
						<td>{name_last}</td>
						<td>{name_first}</td>
						<td>{new Date(Date.parse(dob)).toLocaleDateString()}</td></tr
					>
				</tbody>
			</table>
			<!-- edit btn -->
			<a href={`/patient/${id}/edit`} class="btn btn-sm btn-outline mx-4"> Edit </a>
		</article>
	{/if}
</main>
