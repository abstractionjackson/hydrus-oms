<script>
	import Chart from 'svelte-frappe-charts';

	export let readings = [];
	// sort the readings by date
	readings.sort((a, b) => a.date.localeCompare(b.date));

	const title = 'PSI by Date';
	const colors = ['#38CDBE'];
	let data = {
		labels: readings.map((r) => r.date),
		datasets: [
			{
				values: readings.map((r) => r.psi)
			}
		]
	};
</script>

<Chart type="bar" {data} {title} {colors} />
