<div class="container">
	<header>
		<h2>Sign Up</h2>
	</header>
	<div class="content">
		<form action="?/signup" method="post">
			<input type="email" name="email" placeholder="Email" required autofocus />
			<input type="password" name="password" placeholder="Password" required />
			<input type="submit" value="Sign Up" />
		</form>
	</div>
</div>

<style>
	.container {
		max-width: var(--form-max-width);
		padding: 0;
		margin: 2rem auto;
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 5px 5px 10px 0 #ccc;
	}
	header,
	footer {
		padding: 1rem;
		background-color: var(--color-neutral-light);
	}
	.content {
		padding: 1rem;
	}
	.icon {
		height: min-content;
	}
	.icon > svg {
		width: 1.2em;
	}
</style>
