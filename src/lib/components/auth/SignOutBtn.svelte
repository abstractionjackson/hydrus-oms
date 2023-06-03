<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	//@ts-ignore
	const { supabase, session } = $page.data;

	const handleSignOut = async () => {
		if (session) {
			await supabase.auth.signOut();
			goto('/');
		}
	};
</script>

<button on:click={handleSignOut}>Sign Out</button>
