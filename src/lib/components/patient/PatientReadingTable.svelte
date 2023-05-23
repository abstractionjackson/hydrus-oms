<script lang="ts">
	import type { Patient, Reading } from '$lib/types';
	import { intervalFromDates } from '$lib/utils';

	export let patient: Patient & { reading: Reading[] };
</script>

<table id="reading">
	<thead>
		<tr>
			<th>Date</th>
			<th>Post-Op Interval</th>
			<th>IOP (mmHg)</th>
		</tr>
	</thead>
	<tbody>
		{#each patient.reading as reading, i}
			<tr>
				<td>{new Date(reading.date).toLocaleDateString()}</td>
				<td>{intervalFromDates(new Date(patient.case_date ?? ''), new Date(reading.date))}</td>
				<td>{reading.iop}</td>
			</tr>
		{/each}
	</tbody>
</table>
