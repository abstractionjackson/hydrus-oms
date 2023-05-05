<script lang="ts">
	import '@picocss/pico';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/images/logo3.png';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<style>
	form {
		margin: 0;
	}
	input[type='submit'] {
		/* link */
		background: none;
		border: none;
		color: var(--primary);
		cursor: pointer;
		font: inherit;
		outline: inherit;
		padding: 0;
		text-align: left;
	}
	input[type='submit']:hover {
		text-decoration: underline;
		color: var(--primary-hover);
	}
</style>

<div class="container-fluid">
	<nav>
		<ul>
			<li>
				<a href="/">
					<img src={logo} alt="eye" width="32" height="32" />
				</a>
			</li>
		</ul>
		<ul>
			
		</ul>
		<ul>
			{#if session}
				<li>
					<form action="/?/signout" method="post">
						<input type="submit" value="Sign Out" />
					</form>
				</li>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
