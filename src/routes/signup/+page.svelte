<script lang="ts">
	import { SignUp, Toast } from '$lib/components';
	import type { ActionData } from './$types';
	export let form: ActionData;

	const message = 'Account created. Check your email to confirm, and sign in.';
</script>

<main>
	{#if form?.success}
		<Toast type="success" {message} />
	{/if}
	<section class="page container">
		<SignUp />
	</section>
</main>
