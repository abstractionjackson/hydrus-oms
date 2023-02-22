<script lang="ts">
	import type { PageData } from './$types';
	import OperationForm from './OperationForm.svelte';
	import ReadingForm from './ReadingForm.svelte';

	export let data: PageData;
	let showAddOperationForm = false;
	let showAddReadingForm = false;
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">Patient Details</h2>
	{#if !data.patient}
		<h3>Loading...</h3>
	{:else}
		<!-- a card with the patient's details -->
		<div class="card mx-auto card-bordered max-w-fit text-center">
			<div class="card-body">
				<!-- patient's name -->
				<h3 class="card-title">
					{data.patient.name_first}
					{data.patient.name_last}
				</h3>
				<!-- patient's dob -->
				<p class="card-subtitle text-gray-500">DOB: {data.patient.dob}</p>
				<!-- the patient's operation history -->
				<h4 class="card-title">Operation History</h4>
				{#if !data.operation}
					<p class="card-subtitle text-gray-500">No operations</p>
				{:else}
					<table class="table mx-auto">
						<!-- columnss: id, and date -->
						<thead>
							<tr>
								<th />
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{#each data.operation as { date }, i}
								<tr>
									<td><a class="link" href={`operations/${i}`}>{i}</a></td>
									<td>{date}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				<!-- the patient's reading history -->
				<h4 class="card-title">Reading History</h4>
				{#if !data.readings}
					<p class="card-subtitle text-gray-500">No readings</p>
				{:else}
					<table class="table mx-auto">
						<!-- columns: id, date, and psi -->
						<thead>
							<tr>
								<th />
								<th>Date</th>
								<th>Pressure (psi)</th>
							</tr>
						</thead>
						<tbody>
							{#each data.readings as { date, psi }, i}
								<tr>
									<td><a class="link" href={`readings/${i}`}>{i}</a></td>
									<td>{date}</td>
									<td>{psi}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
		</div>
		<!-- a button to show the add operation form -->
		<button class="btn" on:click={() => (showAddOperationForm = true)}>Add Operation</button>
		<!-- a button to show the add reading form -->
		<button class="btn" on:click={() => (showAddReadingForm = true)}>Add Reading</button>
	{/if}
	{#if showAddOperationForm}
		<div class="modal modal-open">
			<div class="modal-box">
				<div class="modal-header">
					<h3 class="modal-title">Add Operation</h3>
					<OperationForm patientId={data.patient.id} />
				</div>
				<button class="btn btn-ghost" on:click={() => (showAddOperationForm = false)}>Close</button>
			</div>
		</div>
	{/if}
	{#if showAddReadingForm}
		<div class="modal modal-open">
			<div class="modal-box">
				<div class="modal-header">
					<h3 class="modal-title">Add Reading</h3>
					<ReadingForm patientId={data.patient.id} />
				</div>
				<button class="btn btn-ghost" on:click={() => (showAddReadingForm = false)}>Close</button>
			</div>
		</div>
	{/if}
</main>
