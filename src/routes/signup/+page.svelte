<script lang="ts">
	import { NavBarTop, SignUp, Toast } from '$lib/components';
	import type { ActionData } from './$types';
	// export let form: ActionData;

	// const message = 'Account created. Check your email to confirm, and sign in.';
</script>

<main>
	<header>
		<NavBarTop />
	</header>
	<section class="container">
		<header>
			<h2>Sign up for HOMS</h2>
		</header>
		<SignUp />
	</section>
	<!-- {#if form?.success}
		<Toast type="success" {message} />
	{/if} -->
</main>

<style>
	main > header {
		padding: 1rem 0 2rem;
		margin: 0 1rem;
	}
	h2 {
		text-align: center;
	}
	.container {
		max-width: 368px;
	}
</style>
