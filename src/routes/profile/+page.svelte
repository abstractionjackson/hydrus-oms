<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/db';
	import { goto } from '$app/navigation';

	const handleLogout = () => {
		supabase.auth.signOut();
		goto('/');
	};
</script>

<main>
	<h1>Profile</h1>
	{#if $page.data.session}
		<p>Welcome, {$page.data.session.user.email}</p>
	{/if}
	<!-- logout button -->
	<button class="btn btn-primary" on:click={handleLogout}>Logout</button>
</main>
