<script lang="ts">
	export let signUpPath: string;
</script>

<article>
	<header>
		<h2>Sign In</h2>
	</header>
	<form action="?/signinwithemailandpassword" method="post">
		<input type="email" name="email" placeholder="Email" required autofocus />
		<input type="password" name="password" placeholder="Password" required />
		<input type="submit" value="Sign In" />
	</form>
	<p>
		Don't have an account? <a href={signUpPath}>Sign Up</a>
	</p>
</article>

<style>
	article > header > h2 {
		margin: 0;
	}
</style>
