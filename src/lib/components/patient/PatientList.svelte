<script lang="ts">
	import type { Patient } from '$lib/types';

	export let patients: Patient[];
</script>

<ul>
	{#each patients as patient}
		<li>
			<a href="/patient/{patient.id}">
				<span>{patient.name_last}, </span><span>{patient.name_first}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	li {
		list-style: none;
	}
</style>
