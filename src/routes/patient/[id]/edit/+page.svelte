<script lang="ts">
	import { getContext } from 'svelte';

	let patient: any;
	const patientContext = getContext('patient');
	patientContext.subscribe((data) => (patient = data));
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
	>
		<!-- patient id -->
		<input readonly class="hidden" name="id" bind:value={patient.id} type="number" />
		<!-- patient demo info -->
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
		<button class="btn btn-primary">Save</button>
	</form>
</main>
