<script lang="ts">
	import { PatientDetailTable, PatientReadingGraph, PatientReadingTable } from '$lib/components';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { patient } = data;
</script>

<main class="container-fluid">
	<header>
		<!-- the patient's name -->
		<h2><span>{patient?.name_last}, </span><span>{patient?.name_first}</span></h2>
	</header>
	{#if patient}
		<section class="container-fluid">
			<article class="container-fluid">
				<header>
					<h3>IOP and Meds</h3>
				</header>
				<PatientReadingGraph {patient} />
			</article>
		</section>
		<section class="grid">
			<article>
				<header>
					<h3>Patient Detail</h3>
				</header>
				<PatientDetailTable {patient} />
			</article>
			<article>
				<header>
					<h3>Readings</h3>
				</header>
				<PatientReadingTable {patient} />
				<footer>
					<a href="{patient.id}/readings/add" class="icon-md">
						<svg
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
				</footer>
			</article>
		</section>
	{:else}
		<section>
			<article>
				<header>
					<h2>Patient Not Found</h2>
				</header>
			</article>
		</section>
	{/if}
</main>

<style>
	main {
		padding: 1rem;
	}
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h2,
	h3 {
		margin: auto;
	}
	table {
		margin: auto;
		width: fit-content;
	}
	table#demo tr td:first-child {
		font-weight: 700;
	}
	table#reading th {
		font-weight: 700;
	}
</style>
