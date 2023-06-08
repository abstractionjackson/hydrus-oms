<script lang="ts">
	import { RecoverPassword } from '$lib/components';
	import { error } from '@sveltejs/kit';
	import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<main>
	<section class="container">
		<header>
			<h2>Reset HOMS Password</h2>
		</header>
		<RecoverPassword />
		<footer>
            {#if form?.success}
                <p>Password successfully updated</p>
			{:else if form}
                <p>Error</p>
			{/if}
		</footer>
	</section>
</main>

<style>
	h2 {
		text-align: center;
	}
	.container {
		max-width: 368px;
	}
</style>
