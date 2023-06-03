<script lang="ts">
	import { PatientReadingGraph } from '$lib/components';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Toast } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { getPreOpReading } from '$lib/utils';

	export let data: PageData;

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

	const handleAddReading = () => goto(`/patient/${patient?.id}/reading/add`);
</script>

<main class="container-fluid grid">
	<section>
		<header>
			<h3 class="label">Patient</h3>
			<h4 id="detail-heading-name">
				<span>{patient?.name_last}, </span><span>{patient?.name_first}</span>
			</h4>
		</header>
		<table>
			<tbody>
				<tr>
					<td> Case Date </td>
					<td>
						{patient?.case_date}
					</td>
				</tr>
				<tr>
					<td> Pre-Op IOP </td>
					<td>
						{getPreOpReading(patient, 'iop')}
					</td>
				</tr>
				<tr>
					<td> Pre-Op Meds </td>
					<td>
						{getPreOpReading(patient, 'medication')}
					</td>
				</tr></tbody
			>
		</table>
		<div class="container">
			<button on:click={handleAddReading}> Add Reading </button>
		</div>
	</section>
	<section>
		{#if patient}
			<section class="container-fluid">
				<header>
					<h3>IOP and Meds</h3>
				</header>
				<PatientReadingGraph {patient} />
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
	</section>
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

<style lang="scss">
	main {
		@media (min-width: 992px) {
			grid-template-columns: 1fr 4fr;
		}
	}
	.label {
		font-size: 12px;
		border: 1px solid black;
		padding: 0 0.25rem;
		border-radius: 1rem;
		background-color: var(--secondary);
		color: var(--secondary-inverse);
		margin: 0 auto 0.25rem 0;
	}
	#detail-heading-name {
		margin: 0;
	}
	table {
		border: 1px solid #ccc;
	}
	tr {
		border: none;
		td:first-child {
			font-weight: bold;
		}
	}
	td {
		border: none;
		font-size: 12px;
	}
	#patient-detail {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
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
