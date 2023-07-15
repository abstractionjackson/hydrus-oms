<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { reading } = data;

	let date: string = new Date(reading?.date as string).toISOString().split('T')[0];
	let iop: number = reading?.iop as number;
</script>

<main class="container-fluid">
	<section>
		<header>
			<h3>Edit</h3>
			<h2>IOP Reading for <i>{reading?.patient?.name_last}, {reading?.patient?.name_first}</i></h2>
		</header>
		<form method="post">
			<label for="date">Date</label>
			<input type="date" name="date" id="date" placeholder="Date" required bind:value={date} />
			<label for="iop">Intraocular Pressure (mmHg)</label>
			<input type="number" name="iop" id="iop" placeholder="IOP" required bind:value={iop} />
			<input type="submit" value="Save" />
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
