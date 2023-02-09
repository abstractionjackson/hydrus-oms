<script>
	import '../app.postcss';
	import { supabase } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import logo from './logo.png';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<!-- Layout -->
<div id="layout" class="flex flex-col min-h-screen">
	<!-- Navbar -->
	<nav class="h-16 shadow bg-blue flex items-center">
		<!-- Logo -->
		<a href="/">
			<img src={logo} alt="logo" class="mt-4 h-12 ml-8" />
		</a>
		{#if !$page.data.session}
			<!-- login button -->
			<a href="/login" class="btn btn-accent ml-auto mx-4">Login</a>
		{:else}
			<!-- profile button -->
			<a href="/profile" class="btn btn-accent ml-auto mx-4">Profile</a>
		{/if}
	</nav>
	<!-- Content -->
	<div id="content" class="flex flex-col flex-1">
		<slot />
	</div>
</div>
