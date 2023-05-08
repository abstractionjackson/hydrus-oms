<script lang="ts">
	import logo from '$lib/assets/images/logo3.png';

	export let show: boolean;

	let open = false;

	const toggleOpen = () => open = !open;
</script>

<nav>
	<ul><li></li></ul>
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
				<button class="icon-md outline" id="signout" on:click={toggleOpen}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
						  </svg></button>
			</li>
		{/if}
	</ul>
	<dialog {open}>
		<article>
			<header>
				<a href="#" class="close" on:click|preventDefault={toggleOpen}></a>
				<h2>Confirm</h2>
			</header>
			<form action="/?/signout" method="post">
				<button type="submit" class="secondary">
					Sign Out					  
				</button>
			</form>
		</article>
	</dialog>
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
	button.outline#signout {
		border: none;
		color: var(--primary);
	}
	dialog > article {
		width: 100%;
		max-width: var(--form-max-width);
	}
</style>
