<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return function ({ update }) {
			loading = false;
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
	{#if form?.success}
		<div class="alert max-w-md mx-auto alert-success shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Sent to <span class="font-bold">{form.email}</span></span>
			</div>
		</div>
	{/if}
</main>
