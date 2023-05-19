<script lang="ts">
	import { NavBarTop, SignUp, Toast } from '$lib/components';
	import type { ActionData } from './$types';
	export let form: ActionData;

	const message = 'Account created. Check your email to confirm, and sign in.';
</script>

<main>
	<header>
		<NavBarTop />
		{#if form?.success}
			<Toast type="success" {message} />
		{/if}
	</header>
	<section class="container">
		<header>
			<h2>Sign up for Hydrus</h2>
		</header>
		<SignUp />
	</section>
</main>

<style>
	main > header {
		padding: 2rem 0;
	}
	h2 {
		text-align: center;
	}
	.container {
		max-width: 368px;
	}
</style>
