<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let title = 'Surgical Outcomes Tracker';
	let description = 'Outcomes management for surrgeons that tracks patient progress.';
</script>

<main class="flex flex-1 justify-center items-center h-full bg-home bg-cover bg-center">
	<div class="max-w-md text-slate-800 p-12 text-center rounded shadow-xl" id="welcome">
		<h1 class="text-5xl font-bold text-black">{title}</h1>
		<p class="py-6">{description}</p>
		<button on:click={() => goto('/login')} class="btn btn-accent">Get Started</button>
	</div>
</main>

<style>
	#welcome {
		background: white;
	}
</style>
