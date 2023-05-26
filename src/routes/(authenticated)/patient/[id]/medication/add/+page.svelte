<script lang="ts">
	export let data;

	const { patient } = data;
</script>

<main class="container-fluid">
	<section>
		<header>
			<h3>Add</h3>
			<h2>Medication Amount for <i>{patient?.name_last}, {patient?.name_first}</i></h2>
		</header>
		<form action="?/create" method="post">
			<label for="date">Date</label>
			<input type="date" name="date" id="date" placeholder="Date" required />
			<label for="amount">Amount</label>
			<input type="number" name="amount" id="amount" placeholder="Amount" required />
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
