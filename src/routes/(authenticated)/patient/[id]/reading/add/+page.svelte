<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { patient } = data;
</script>

<main class="container-fluid">
	<section>
		<header>
			<h2>Add</h2>
			<h3>IOP and Medication Reading for <i>{patient?.name_last}, {patient?.name_first}</i></h3>
		</header>
		<form action="?/create" method="post">
			<input type="hidden" name="case_date" value={patient?.case_date} />
			<label for="date">Date</label>
			<input type="date" name="date" id="date" placeholder="Date" required />
			<label for="iop">Interocular Pressure (mmHg)</label>
			<input type="number" name="iop" id="iop" required />
			<label for="iop">Medication Amount</label>
			<input type="number" name="medication" id="medication" required />
			<input type="submit" value="Add" />
		</form>
	</section>
</main>

<style>
	form {
		margin: auto;
		max-width: var(--form-max-width);
	}
	main {
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h2,
	h3 {
		text-align: center;
	}
	h2 {
		margin-bottom: 0;
	}
</style>
