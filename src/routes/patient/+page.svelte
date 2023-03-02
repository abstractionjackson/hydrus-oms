<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;

	const title: string = 'Patient List';

	const sortFunctions = {
		name_last: (a, b) => a.name_last.localeCompare(b.name_last),
		name_first: (a, b) => a.name_first.localeCompare(b.name_first),
		dob: (a, b) => Date.parse(a.dob) - Date.parse(b.dob)
	};
	const defaultActiveSortFunctionKey: string = Object.keys(sortFunctions)[0];
	let activeSortFunctionKey = defaultActiveSortFunctionKey;
	let reverse: boolean = false;
	const handleSort = (e: MouseEvent) => {
		const { attributes } = e.target as HTMLButtonElement;
		const keyAttr = attributes.getNamedItem('data-key');
		const key = keyAttr ? keyAttr.value : defaultActiveSortFunctionKey;
		if (key === activeSortFunctionKey) {
			reverse = !reverse;
		} else {
			activeSortFunctionKey = key;
		}
	};

	$: patients = !reverse
		? data.patients?.sort(sortFunctions[activeSortFunctionKey])
		: data.patients?.sort(sortFunctions[activeSortFunctionKey]).reverse();
</script>

<main class="text-center">
	<h2 class="text-4xl font-bold my-4">{title}</h2>
	<div class="flex">
		<table class="table mx-auto">
			<thead class:reverse>
				<tr>
					<!-- columns: index, last name, first name -->
					<th />
					<th
						><button
							data-key="name_last"
							on:click={handleSort}
							class:active={activeSortFunctionKey === 'name_last'}>Last Name</button
						></th
					>
					<th
						><button
							data-key="name_first"
							on:click={handleSort}
							class:active={activeSortFunctionKey === 'name_first'}>First Name</button
						></th
					>
					<th
						><button
							data-key="dob"
							on:click={handleSort}
							class:active={activeSortFunctionKey === 'dob'}>Date of Birth</button
						></th
					>
				</tr>
			</thead>
			{#each patients as patient}
				<tr>
					<td><a class="link" href={`patient/${patient.id}`}>{patient.id}</a></td>
					<td>{patient.name_last}</td>
					<td>{patient.name_first}</td>
					<td>{new Date(Date.parse(patient.dob)).toLocaleDateString()}</td>
				</tr>
			{/each}
		</table>
		<button
			class="fixed bottom-0 flex justify-center items-center flex-col right-0 m-4 p-4 rounded-full btn btn-primary text-white text-2xl font-bold"
		>
			<a href="/patient/new" class="pb-[3px]">+</a>
		</button>
	</div>
</main>

<style>
	th button {
		min-width: 8rem;
		text-transform: uppercase;
	}
	th button.active::after {
		content: ' ↑';
	}
	thead.reverse th button.active::after {
		content: ' ↓';
	}
</style>
