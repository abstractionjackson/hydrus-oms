<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';

	let loading = false;

	const submit: SubmitFunction = () => {
		loading = true;

		return function ({ update, result }) {
			loading = false;
			if (result.type === 'success') {
				goto('/patients');
			}
		};
	};
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">New Patient</h2>
	<!-- a form to add a new patient -->
	<form method="POST" use:enhance={submit} class="flex flex-col max-w-sm mx-auto">
		<!-- name_first -->
		<input
			type="text"
			placeholder="First Name"
			class="border-2 border-gray-300 p-2 my-2"
			name="name_first"
			required
		/>
		<!-- name_last -->
		<input
			type="text"
			placeholder="Last Name"
			class="border-2 border-gray-300 p-2 my-2"
			name="name_last"
			required
		/>
		<!-- dob -->
		<input
			type="date"
			placeholder="Date of Birth"
			class="border-2 border-gray-300 p-2 my-2"
			name="dob"
			required
		/>
		<!-- submit button -->
		<button type="submit" disabled={loading} class="btn btn-primary">Submit</button>
	</form>
</main>
