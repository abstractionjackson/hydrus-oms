<script>
	import { page } from '$app/stores';
	import SignOutBtn from './auth/SignOutBtn.svelte';

	const { session } = $page.data;
</script>

<nav>
	<ul>
		<li>
			<a href="/">
				<div class="brand-logo" />
			</a>
		</li>
	</ul>
	<ul />
	<ul>
		{#if session}
			<li>
				<details role="list" dir="rtl">
					<summary role="listbox" id="icon-hamburger">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</summary>
					<ul role="listbox">
						<li>
							<SignOutBtn />
						</li>
					</ul>
				</details>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: flex-start;
		padding: 0 1rem;
	}
	ul:last-child {
		margin-left: auto;
	}
	img#logo {
		width: 4rem;
		margin: auto;
	}
	details {
		margin-left: auto;
	}
	#icon-hamburger > svg {
		width: 2em;
	}
	summary::after {
		/* remove */
		display: none;
	}
</style>
