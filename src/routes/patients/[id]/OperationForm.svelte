<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	export let patientId: number;

	const submit: SubmitFunction = ({ data }) => {
		data.append('patient_id', patientId.toString());
	};
</script>

<form method="POST" action="?/operation" use:enhance={submit} class="form flex flex-col">
	<!-- date input -->
	<label for="date"
		>Date
		<input type="date" name="date" class="input my-4 border-neutral-300 w-fit" />
		<!-- submit button -->
		<button class="btn btn-primary" type="submit">Submit</button>
	</label>
</form>
<!-- TODO a modal form to add an operation -->
