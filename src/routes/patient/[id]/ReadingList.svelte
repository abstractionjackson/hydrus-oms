<script>
	export let reading = [];
	reading.sort((a, b) => a.date.localeCompare(b.date));
</script>

<ul>
	{#each reading as { id, date, psi }, i}
		<li>
			<div>{i}</div>
			<div>{id}</div>
			<div>{date}</div>
			<div>{psi}</div>
		</li>
	{/each}
</ul>
