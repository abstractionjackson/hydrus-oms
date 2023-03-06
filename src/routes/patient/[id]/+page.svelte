<script lang="ts">
	import { getContext } from 'svelte';

	const patient = getContext('patient');
	const { id, name_last, name_first, dob, operation, reading } = $patient;
	const sectionTitleoir = 'Pressure History';
</script>

<main class="text-center">
	<heading class="flex mx-auto items-center justify-center">
		<a href="/patient" class="mx-4"
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
					d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
				/>
			</svg>
		</a>
		<h2 class="text-4xl font-bold my-4">Patient Details</h2>
	</heading>
	{#if !patient}
		<h3>Loading...</h3>
	{:else}
		<div class="flex flex-col">
			<a href={`/patient/${id}/edit`} class="max-w-xs mx-auto btn btn-sm btn-outline mx-4">
				Edit
			</a>
			<article class="mx-auto my-4 w-fit flex flex-col">
				<!-- patient demo ifo -->
				<h2 class="text-2xl font-bold my-2">Demographic</h2>
				<table class="mx-4 table">
					<thead>
						<th>Last Name</th>
						<th>First Name</th>
						<th>Date of Birth</th>
					</thead>
					<tbody>
						<tr>
							<td>{name_last}</td>
							<td>{name_first}</td>
							<td>{new Date(Date.parse(dob)).toLocaleDateString()}</td></tr
						>
					</tbody>
				</table>
			</article>
			{#if reading}
				<article class="my-4 mx-auto w-fit flex flex-col">
					<h2 class="text-2xl font-bold my-2">Readings</h2>
					<table class="table">
						<thead>
							<th>Date</th>
							<th>oir</th>
						</thead>
						<tbody>
							{#each reading as { date, oir }}
								<tr>
									<td>{new Date(Date.parse(date)).toLocaleDateString()}</td>
									<td>{oir}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</article>
			{/if}
		</div>
	{/if}
</main>
