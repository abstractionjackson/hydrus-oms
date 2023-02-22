<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">All Patients</h2>
	<table class="table mx-auto">
		<thead>
			<tr>
				<!-- columns: index, last name, first name -->
				<th />
				<th>Last Name</th>
				<th>First Name</th>
			</tr>
		</thead>
		{#each data.patients as patient}
			<tr>
				<td><a class="link" href={`patients/${patient.id}`}>{patient.id}</a></td>
				<td>{patient.name_last}</td>
				<td>{patient.name_first}</td>
			</tr>
		{/each}
	</table>
	<button
		class="fixed bottom-0 flex justify-center items-center flex-col right-0 m-4 p-4 rounded-full btn btn-primary text-white text-2xl font-bold"
	>
		<a href="/patients/new">+</a>
	</button>
</main>
