<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$assets/images/logo4_no_bg.png';
	import SignOutBtn from './auth/SignOutBtn.svelte';

	const { session } = $page.data;

	let showConfirmSignOut = false;

	let dropdown: HTMLDetailsElement;
</script>

<nav>
	<ul></ul>
	<ul>
		<li>
			<a href="/">
				<img id="logo" src={logo} alt="logo" />
			</a>
		</li>
	</ul>
	<ul id="menu">
		{#if session}
			<li>
				<details role="list" dir="rtl" bind:this={dropdown}>
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
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<p
								on:click={() => {
									showConfirmSignOut = true;
									dropdown.open = false;
								}}
							>
								Sign Out
							</p>
						</li>
					</ul>
				</details>
			</li>
		{/if}
	</ul>
</nav>

<dialog open={showConfirmSignOut}>
	<article>
		<button class="outline secondary" on:click={() => (showConfirmSignOut = false)}> X </button>
		<header class="container">
			<h3>Confirm</h3>
		</header>
		<div class="container">
			<SignOutBtn />
		</div>
	</article>
</dialog>

<style lang="scss">
	nav {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	nav > ul {
		margin: auto;
	}
	ul#menu {
		width: 100%;
		display:flex;
		justify-content: flex-end;  
	}
	p { margin: 0;}
	p:hover { cursor: pointer; }
	img#logo {
		width: 200px;
		margin: auto;
	}
	#icon-hamburger > svg {
		width: 2em;
	}
	summary::after {
		/* remove */
		display: none;
	}
	dialog {
		article {
			position: relative;
			width: 100%;
			button {
				position: absolute;
				width: fit-content;
				top: 0;
				right: 0;
				border: none;
			}
			header {
				h3 {
					margin-top: 2.5rem;
					margin-bottom: 0;
				}
			}
		}
	}
</style>
