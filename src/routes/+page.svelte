<script lang="ts">
	import { page } from '$app/stores';
	let title = 'Surgical Outcomes Tracker';
	let description = 'Outcomes management for surrgeons that tracks patient progress.';
</script>

<main class="flex flex-1 justify-center items-center h-full">
	<div class="max-w-md bg-neutral-100 text-slate-800 p-12 text-center rounded shadow-xl">
		<h1 class="text-5xl font-bold text-black">{title}</h1>
		<p class="py-6">{description}</p>
		<button class="btn btn-accent">Get Started</button>
	</div>
</main>
