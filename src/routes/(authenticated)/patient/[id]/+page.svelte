<script lang="ts">
	import { PatientDetailTable, PatientReadingGraph, PatientReadingTable } from '$lib/components';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Toast } from '$lib/stores';
	import { goto } from '$app/navigation';

	export let data: PageServerData;

	$: patient = data.patient;

	const redirectFrom = $page.url.searchParams.get('redirectFrom');

	const toast = getContext<Writable<Toast>>('toast');

	if (redirectFrom === 'editReading') {
		const recordDate = new Date($page.url.searchParams.get('date') ?? '');
		toast.set({
			hasMessage: true,
			message: `Updated IOP Reading from ${recordDate.toDateString()}`
		});
	}

	let showConfirmDelete = false;

	const toggleShowConfirmDelete = () => {
		showConfirmDelete = !showConfirmDelete;
	};

	const handleAddIOP = () => goto(`/patient/${patient?.id}/reading/add`);

	const handleAddMed = () => goto(`/patient/${patient?.id}/medication/add`);
</script>

<main class="container-fluid">
	<header id="patient-detail">
		<div />
		<h2 id="patient-detail-heading">
			<span>{patient?.name_last}, </span><span>{patient?.name_first}</span>
		</h2>
		<details role="list" id="patient-detail-menu">
			<summary class="icon">
				<!-- three vertical dots icon -->
				<svg
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
						d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
					/>
				</svg>
			</summary>
			<ul>
				<li>
					<button on:click={toggleShowConfirmDelete}>Delete</button>
				</li>
			</ul>
		</details>
		<div id="patient-detail-btn-group">
			<button id="patient-add-iop" on:click={handleAddIOP}>Add IOP</button>
			<button id="patient-add-med" on:click={handleAddMed}>Add Medication</button>
		</div>
	</header>
	{#if patient}
		<section class="container-fluid">
			<header>
				<h3>IOP and Meds</h3>
			</header>
			<PatientReadingGraph {patient} />
		</section>
		<section class="grid">
			<article>
				<header>
					<h3>Patient Detail</h3>
				</header>
				<PatientDetailTable {patient} />
			</article>
			<article>
				<header>
					<h3>Reading List</h3>
				</header>
				<PatientReadingTable {patient} />
				<footer>
					<a href="{patient.id}/reading/add" class="icon-md">
						<svg
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
								d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</a>
				</footer>
			</article>
		</section>
	{:else}
		<section>
			<article>
				<header>
					<h2>Patient Not Found</h2>
				</header>
			</article>
		</section>
	{/if}
	<dialog open={showConfirmDelete}>
		<article>
			<header>
				<h2>Confirm Delete</h2>
			</header>
			<p>Are you sure you want to delete this patient?</p>
			<form action="?/deletePatient" method="post">
				<input type="hidden" name="name_last" value={patient?.name_last} />
				<input type="hidden" name="name_first" value={patient?.name_first} />
				<button type="submit">Delete</button>
			</form>
			<footer>
				<button on:click={toggleShowConfirmDelete}>Cancel</button>
			</footer>
		</article>
	</dialog>
</main>

<style>
	main {
		padding: 1rem;
	}
	#patient-detail {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: 1fr 1fr;
	}
	#patient-detail-heading {
		grid-column: 2;
		grid-row: 1;
		height: 100%;
		width: 100%;
		text-align: center;
	}
	#patient-detail-btn-group {
		display: flex;
		justify-content: space-around;
		grid-column-start: 1;
		grid-column-end: 4;
		margin: auto;
		width: 100%;
	}
	#patient-detail-btn-group > button {
		width: fit-content;
	}
	#patient-detail-menu {
		grid-column: 3;
		grid-row: 1;
		margin-bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	#patient-detail-menu > .icon {
		margin: 0;
		padding: 0;
		width: fit-content;
		height: fit-content;
		display: flex;
		border: none;
		margin-left: auto;
	}
	#patient-detail-menu > .icon > svg {
		width: 2rem;
	}
	#patient-detail-menu > .icon::after {
		display: none;
	}
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h2,
	h3 {
		margin: auto;
	}
</style>
