<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Patient, Reading } from '$lib/types';
	import { formatInterval, getReadingInterval } from '$lib/utils/utils';

	export let patient: Patient & { reading: Reading[] };

	const selected = new Set<string>();

	const handleChanged = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const tr = event.currentTarget.closest('tr') as HTMLTableRowElement;
		const readingId: string = tr.dataset.readingid as string;
		if (selected.has(readingId)) {
			selected.delete(readingId);
		} else {
			selected.add(readingId);
		}
	};

	const handleDelete: SubmitFunction = ({ data }) => {
		// append readidng ids to form data
		const readingIds = Array.from(selected);
		data.append('readingIds', JSON.stringify(readingIds));
		// return a function that invalidates the page, and updates, too
		return async function ({ update }) {
			await invalidate('supabase:reading');
			await update();
		};
	};
</script>

<table id="reading">
	<thead>
		<tr>
			<td>
				<form action="?/deleteReading" method="post" use:enhance={handleDelete}>
					<button type="submit" class="secondary"> Delete </button>
				</form>
			</td>
		</tr>
		<tr>
			<th />
			<th>Date</th>
			<th>Post-Op Interval</th>
			<th>IOP (mmHg)</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each patient.reading as reading}
			<tr data-readingId={reading.id}>
				<td>
					<input type="checkbox" on:change={handleChanged} />
				</td>
				<td>{new Date(reading.date).toLocaleDateString()}</td>
				<td>{formatInterval(getReadingInterval(reading, patient.case_date))}</td>
				<td>{reading.iop}</td>
				<td>
					<button
						on:click={() => goto(`/patient/${patient.id}/reading/${reading.id}/edit`)}
						class="secondary">Edit</button
					>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
