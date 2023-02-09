<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	let loading = false;

	const handleSubmit: SubmitFunction = async () => {
		loading = true;

		return function ({ update }) {
			loading = false;

			alert('Check your email!');

			update();
		};
	};
</script>

<main>
	<!-- a form -->
	<h1 class="mx-auto w-min my-4 text-2xl">Login</h1>
	<form
		method="POST"
		use:enhance={handleSubmit}
		class="max-w-md form-control bg-neutral-100 mx-auto rounded shadow-xl p-8"
	>
		<!-- an input for email -->
		<input class="input my-4" type="email" name="email" placeholder="Email" />
		<!-- a submit button -->
		<button disabled={loading} type="submit" class="btn btn-secondary my-2">Login</button>
	</form>
</main>
