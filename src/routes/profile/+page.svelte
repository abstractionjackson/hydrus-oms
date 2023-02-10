<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/db';
	import { goto } from '$app/navigation';

	const handleLogout = () => {
		supabase.auth.signOut();
		goto('/');
	};
</script>

<main class="mx-auto text-center mt-8">
	<h2 class="font-bold text-xl my-4">Profile</h2>
	{#if $page.data.session}
		<p>Welcome, {$page.data.session.user.email}</p>
	{/if}
	<!-- logout button -->
	<button class="btn btn-primary my-4" on:click={handleLogout}>Logout</button>
</main>
