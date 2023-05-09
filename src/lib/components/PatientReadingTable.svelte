<script lang="ts">
	import type { Patient } from "$lib/types";

    export let patient: Patient;
    
    const po_intervals = [
        "1 day",
        "3 months",
        "6 months",
        "12 months"
    ];
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
            <td>{po_intervals[i]}</td>
            <td>{reading.iop}</td>
        </tr>
    {/each}
</table>