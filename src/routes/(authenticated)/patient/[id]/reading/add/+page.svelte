<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { patient } = data;
</script>

<main class="container-fluid">
	<section>
		<header>
			<h3>Add</h3>
			<h2>IOP Reading for <i>{patient?.name_last}, {patient?.name_first}</i></h2>
		</header>
		<form action="?/create" method="post">
			<input type="hidden" name="case_date" value={patient?.case_date} />
			<label for="date">Date</label>
			<input type="date" name="date" id="date" placeholder="Date" required />
			<label for="iop">Interocular Pressure (mmHg)</label>
			<input type="number" name="iop" id="iop" placeholder="IOP" required />
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
	h3 {
		margin-bottom: 0;
	}
</style>
