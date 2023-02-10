<script lang="ts">
	import { supabase } from '$lib/db';
	import { goto } from '$app/navigation';

	const handleLogout = () => {
		supabase.auth.signOut();
		goto('/');
	};
</script>

<button class="btn btn-accent my-4" on:click={handleLogout}>Sign Out</button>
