<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { onMount, getContext } from 'svelte';
	import { enhance } from '$app/forms';

	let patient: any;
	const patientContext = getContext('patient');
	patientContext.subscribe((data) => (patient = data));

	const sortReadingByDate = (a, b) => Date.parse(a.date) - Date.parse(b.date);

	onMount(() => patient.reading.sort(sortReadingByDate));

	let next_local_id: number = 0;

	const handleSubmit: SubmitFunction = (event) => {
		event.data.append('reading', JSON.stringify(patient.reading));
	};
	const updateReading = (reading) => (patient.reading = reading);
	const findReading = (id) => patient.reading.find((reading) => reading.id === id);
	const flagReadingDelete = (id) => {
		findReading(id).flag_delete = true;
		updateReading(patient.reading);
	};
	const flagReadingSave = (id) => {
		findReading(id).flag_delete = false;
		updateReading(patient.reading);
	};
	const addReading = () => {
		updateReading([...patient.reading, { local_id: next_local_id }]);
		next_local_id += 1;
	};
	const cancelAddReading = (local_id) => {
		const readingIndex = patient.reading.findIndex((reading) => reading.local_id === local_id);
		patient.reading.splice(readingIndex, 1);
		updateReading(patient.reading);
	};
</script>

<main class="text-center">
	<heading class="flex mx-auto justify-center items-center">
		<a href={`/patient/${patient.id}`} class="mx-4">
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
					d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
				/>
			</svg>
		</a>
		<h2 class="my-4 text-3xl font-bold">
			Patient: <span id="name_last">{patient.name_last}</span>,
			<span id="name_first">{patient.name_first}</span>
		</h2>
	</heading>
	<form
		method="POST"
		action={`/patient/${patient.id}?/update`}
		class="flex flex-col text-left max-w-md mx-auto p-4 my-4"
		use:enhance={handleSubmit}
	>
		<!-- patient id -->
		<input readonly class="hidden" name="id" bind:value={patient.id} type="number" />
		<!-- patient demo info -->
		<h3 class="text-xl mx-auto text-center my-4 font-bold">Demographic</h3>
		<fieldset id="demogrpahic" class="flex flex-col">
			<label for="name_last"> Last Name </label>
			<input
				bind:value={patient.name_last}
				id="name_last"
				name="name_last"
				class="border-2 border-gray-300 p-2 my-2 rounded"
				required
			/>
			<label for="name_first"> First Name </label>
			<input
				bind:value={patient.name_first}
				id="name_first"
				name="name_first"
				class="border-2 border-gray-300 p-2 my-2 rounded"
				required
			/>
			<label for="dob"> Date of Birth </label>
			<input
				type="date"
				bind:value={patient.dob}
				id="dob"
				name="dob"
				required
				class="border-2 border-gray-300 p-2 my-2 rounded"
			/>
		</fieldset>
		{#if patient.reading}
			<!-- Ocular Pressure Readings -->
			<h3 class="text-xl mx-auto text-center my-4 font-bold">Readings</h3>
			<fieldset id="opr">
				{#each patient.reading as { local_id, id, date, oir, flag_delete }}
					<div class="flex items-center">
						<fieldset id={`reading-${local_id ?? id}`} disabled={flag_delete}>
							<input
								type="date"
								id={`reading-date-${local_id ?? id}`}
								bind:value={date}
								class="border-2 border-gray-300 p-2 my-2 rounded"
							/>
							<input
								type="number"
								id={`reading-oir-${local_id ?? id}`}
								bind:value={oir}
								class="w-16 border-2 border-gray-300 p-2 my-2 rounded"
							/>
							<label for={`reading-oir-${local_id ?? id}`}>OIR</label>
						</fieldset>
						{#if id !== undefined}
							{#if !flag_delete}
								<button
									type="button"
									class="btn btn-sm mx-4 bg-neutral-400"
									on:click={() => flagReadingDelete(id)}>Delete</button
								>
							{:else}
								<button
									type="button"
									class="btn btn-sm mx-4 bg-neutral-400"
									on:click={() => flagReadingSave(id)}>Restore</button
								>
							{/if}
						{:else}
							<button
								type="button"
								class="btn btn-sm mx-4 bg-neutral-400"
								on:click={() => cancelAddReading(local_id)}>Cancel</button
							>
						{/if}
					</div>
				{/each}
			</fieldset>
			<button type="button" on:click={addReading} class="btn btn-secondary btn-sm my-4"
				>Add Reading</button
			>
		{/if}
		<button type="submit" class="btn btn-primary">Save</button>
	</form>
</main>

<style>
	fieldset:disabled {
		opacity: 0.6;
	}
</style>
