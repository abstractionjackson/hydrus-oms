<script lang="ts">
	import { SignInWithEmailAndPasswordForm } from '$lib/components';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main>
	<SignInWithEmailAndPasswordForm signUpPath="/signup" />
</main>

<style>
	main {
		padding: 0 1rem;
	}
</style>
