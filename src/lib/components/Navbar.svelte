<script lang="ts">
	import logo from '$lib/assets/images/logo3.png';

	export let show: boolean;
</script>

<nav>
	<ul />
	<ul>
		<li>
			<a href="/">
				<img src={logo} alt="eye" width="58" height="58" />
			</a>
		</li>
	</ul>
	<ul>
		{#if show}
			<li>
				<form action="/?/signout" method="post">
					<input type="submit" value="Sign Out" />
				</form>
			</li>
		{/if}
	</ul>
</nav>

<style>
    nav {
        background-color: #fbfbfc;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        height: 4rem;
		padding: 0rem 1rem;
    }
	ul {
		padding: 0rem 1rem;
	}
	form {
		margin: 0;
	}
	input[type='submit'] {
		/* link */
		background: none;
		border: none;
		color: var(--primary);
		cursor: pointer;
		font: inherit;
		outline: inherit;
		padding: 0;
		text-align: left;
	}
	input[type='submit']:hover {
		text-decoration: underline;
		color: var(--primary-hover);
	}
</style>
