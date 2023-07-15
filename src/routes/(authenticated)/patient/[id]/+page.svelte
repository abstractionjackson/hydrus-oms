<script lang="ts">
	import { PatientReadingGraph } from '$lib/components';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { getPreOpReading, getReadingArray, isPostOp, mapDiffToReading } from '$lib/utils/utils';
	import { ReadingDiff } from '$lib/models/models';

	export let data: PageData;

	$: patient = data.patient;

	const handleAddReading = () => goto(`/patient/${patient?.id}/reading/add`);

	const getPreOpIop = (patient: { operation_date: string }, iop_readings: { date: string, mmhg: number }[]) => iop_readings
	.find(reading => reading.date < patient.operation_date);

	const getPreOpMed = (patient: { operation_date: string }, medication_readings: { date: string, quantity: number }[]) => medication_readings
	.find(reading => reading.date < patient.operation_date);

	$: preOpIop = getPreOpIop(patient, patient?.iop_readings);
	$: preOpMed = getPreOpMed(patient, patient?.medication_readings);
</script>

<main class="container-fluid grid">
	<section>
		<header>
			<h3 class="label">Patient</h3>
			<h4 id="detail-heading-name">
				<span>{patient?.name_last}, </span><span>{patient.name_first}</span>
			</h4>
		</header>
		<table>
			<tbody>
				<tr>
					<td> Case Date </td>
					<td>
						{patient.operation_date}
					</td>
				</tr>
				<tr>
					<td> Pre-Op IOP </td>
					<td>
						{preOpIop ? preOpIop.mmhg : 'N/A'}
					</td>
				</tr>
				<tr>
					<td> Pre-Op Meds </td>
					<td>
						{preOpMed ? preOpMed.quantity : 'N/A'}
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
