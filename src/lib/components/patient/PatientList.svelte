<script lang="ts">
	import type { Patient } from '$lib/types';

	export let patients: Patient[];
</script>

<section>
	<header>
		<h2>My Patients</h2>
		<div id="add-patient">
			<a href="/patient/add" class="icon-md"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</a>
		</div>
	</header>
	<ul>
		{#each patients as patient}
			<li>
				<a href="/patient/{patient.id}">
					<span>{patient.name_last}, </span><span>{patient.name_first}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		max-width: 652px;
		margin: auto;
	}
	header {
		display: flex;
	}
	#add-patient {
		margin-left: auto;
	}
</style>
