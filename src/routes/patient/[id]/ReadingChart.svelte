<script>
	import Chart from 'svelte-frappe-charts';

	export let readings = [];
	// sort the readings by date
	readings.sort((a, b) => a.date.localeCompare(b.date));

	const title = 'oir by Date';
	const colors = ['#38CDBE'];
	let data = {
		labels: readings.map((r) => r.date),
		datasets: [
			{
				values: readings.map((r) => r.oir)
			}
		]
	};
</script>

<Chart type="bar" {data} {title} {colors} />
