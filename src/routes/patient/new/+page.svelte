<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';

	let loading = false;

	const submit: SubmitFunction = () => {
		loading = true;

		return function ({ result }) {
			loading = false;
			if (result.type === 'success') {
				const { id } = result.data;
				goto(`/patient/${id}`);
			}
		};
	};
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">New Patient</h2>
	<!-- a form to add a new patient -->
	<form
		method="POST"
		action="/patient?/create"
		use:enhance={submit}
		class="text-left flex flex-col max-w-sm mx-auto"
	>
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
		<label for="dob">Date of Birth</label>
		<input
			type="date"
			placeholder="Date of Birth"
			class="border-2 border-gray-300 p-2 my-2"
			name="dob"
			required
		/>
		<!-- operation date -->
		<label for="operation_date"
			>Operation Date <span class="text-sm text-neutral-400">optional</span></label
		>
		<input
			type="date"
			placeholder="Operation Date"
			class="border-2 border-gray-300 p-2 my-2"
			name="operation_date"
		/>
		<!-- submit button -->
		<button type="submit" disabled={loading} class="btn btn-primary">Submit</button>
	</form>
</main>
