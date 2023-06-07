<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	const handleSubmit: SubmitFunction = async ({ cancel, data }) => {
		const [od, os] = [data.get('od'), data.get('os')];
		if (!od && !os) {
			alert('Please select at least one eye.');
			return cancel();
		}
	};
</script>

<section>
	<header>
		<h2>Add Patient</h2>
	</header>
	<form action="?/create" method="post" use:enhance={handleSubmit}>
		<!-- fields for creating a new patient -->
		<label for="name_last">Last Name</label>
		<input type="text" name="name_last" id="name_last" placeholder="Doe" required />
		<label for="name_first">First Name</label>
		<input type="text" name="name_first" id="name_first" placeholder="John" required />
		<label for="dob">D.O.B.</label>
		<input type="date" name="dob" id="dob" placeholder="Date of Birth" required />
		<label for="case_date">Case Date</label>
		<input type="date" name="case_date" id="case_date" placeholder="Case Date" required />
		<div class="input-group">
			<span id="od_os">OD/OS</span>
			<div class="checkbox-group">
				<input type="checkbox" name="od" id="od" value="od" />
				<label for="od">OD</label>
			</div>
			<div class="checkbox-group">
				<input type="checkbox" name="os" id="os" value="os" />
				<label for="os">OS</label>
			</div>
		</div>
		<input type="submit" value="Submit" />
	</form>
</section>

<style>
	form {
		margin: auto;
		max-width: var(--form-max-width);
	}

	h2 {
		text-align: center;
	}
	.input-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 16px;
	}
	.checkbox-group {
		flex-direction: row;
	}
	#od_os {
		margin-bottom: 4px;
	}
</style>
