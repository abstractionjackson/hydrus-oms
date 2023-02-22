<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	export let patientId: number;

	const submit: SubmitFunction = ({ data }) => {
		data.append('patient_id', patientId.toString());
	};
</script>

<form method="POST" action="?/reading" use:enhance={submit} class="form flex flex-col">
	<!-- date input -->
	<label for="date"
		>Date
		<input type="date" name="date" class="input my-4 border-neutral-300 w-fit" />
	</label>
	<!-- psi input -->
	<label for="psi"
		>Pressure (psi)
		<input type="number" name="psi" class="input my-4 border-neutral-300 w-fit" />
	</label>
	<!-- submit button -->
	<button class="btn btn-primary" type="submit">Submit</button>
</form>
