<script lang="ts">
	export let signUpPath: string;
</script>

<div class="container">
	<header>
		<h2>Sign In</h2>
	</header>
	<div class="content">
		<form action="?/signinwithemailandpassword" method="post">
			<input type="email" name="email" placeholder="Email" required autofocus />
			<input type="password" name="password" placeholder="Password" required />
			<input type="submit" value="Sign In" />
		</form>
	</div>
	<footer>
		<p>
			<span class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
					/>
				</svg>
			</span>
			Don't have an account? <a href={signUpPath}>Sign Up</a>
		</p>
	</footer>
</div>

<style>
	.container {
		max-width: var(--form-max-width);
		margin: 2rem auto;
		/* light gray border and shadow */
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 5px 5px 10px 0 #ccc;
	}
	header,
	footer {
		padding: 1rem;
		background-color: #f4f4f4;
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
