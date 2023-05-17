<script lang="ts">
	import { SignInWithEmailAndPasswordForm } from '$lib/components';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main>
	<section class="page container">
		<SignInWithEmailAndPasswordForm signUpPath="/signup" />
	</section>
</main>
