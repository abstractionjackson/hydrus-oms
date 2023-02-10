<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let title = 'Surgical Outcomes Tracker';
	let description = 'Outcomes management for surgeons that tracks patient progress.';
</script>

<main class="flex flex-1 justify-center items-center h-full bg-home bg-cover bg-center">
	{#if !data.session}
		<div class="max-w-md text-slate-800 p-12 text-center rounded shadow-xl" id="welcome">
			<h1 class="text-5xl font-bold text-black">{title}</h1>
			<p class="py-6">{description}</p>
			<!-- link to Login page as button -->
			<a href="/login" class="btn btn-accent">Sign In</a>
		</div>
	{:else if data.session?.user}
		<div class="max-w-md text-slate-800 p-12 text-center rounded shadow-xl" id="welcome">
			<h1 class="text-4xl break-words my-4 font-bold text-black">
				Welcome back, {data.session.user.email}!
			</h1>
			<a href="/patients/new" class="btn btn-accent">New Patient</a>
			<a href="/patients" class="btn btn-primary">View Patients</a>
		</div>
	{/if}
</main>

<style>
	#welcome {
		background: white;
	}
</style>
