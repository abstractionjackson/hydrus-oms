<script lang="ts">
	import { getContext } from 'svelte';

	let patient: any;
	const patientContext = getContext('patient');
	patientContext.subscribe((data) => (patient = data));
</script>

<form method="POST" action={`/patient/${patient.id}?/update`} class="grid max-w-md mx-auto">
	<!-- patient id -->
	<input readonly class="hidden" name="id" bind:value={patient.id} type="number" />
	<!-- patient demo info -->
	<label>
		Last Name
		<input bind:value={patient.name_last} name="name_last" class="input" required />
	</label>
	<label>
		First Name
		<input bind:value={patient.name_first} name="name_first" class="input" required />
	</label>
	<label>
		Date of Birth
		<input type="date" bind:value={patient.dob} name="dob" required />
	</label>
	<button class="btn btn-primary">Save</button>
</form>
