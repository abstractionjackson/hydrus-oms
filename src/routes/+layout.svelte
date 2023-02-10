<script>
	import '../app.postcss';
	import { supabase } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import logo from './logo.png';
	import SignOutBtn from '$lib/components/SignOutBtn.svelte';

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
			<a href="/login" class="btn btn-accent ml-auto mx-4">Sign In</a>
		{:else}
			<!-- link to patients page -->
			<a href="/patients" class="font-semibold text-neutral-100 mx-4">Patients</a>
			<!-- sign out button -->
			<div class="ml-auto mx-4">
				<SignOutBtn />
			</div>
		{/if}
	</nav>
	<!-- Content -->
	<div id="content" class="flex flex-col flex-1">
		<slot />
	</div>
</div>
