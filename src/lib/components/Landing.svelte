<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$assets/images/logo4_no_bg.png';
	export let brandtext = 'Hydrus';
	export let tagline = 'Microstent surgery outcomes tracking for physicians';
</script>

<div class="container">
	<header>
		<img src={logo} alt="logo" />
		<h1>{brandtext}</h1>
		<!-- <p>{tagline}</p> -->
	</header>
	<button on:click={() => goto('/signin')}>Sign In</button>
</div>

<style>
	.container {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}
	img {
		width: 100px;
	}
	button {
		width: fit-content;
		margin: 0 auto;
		font-size: 1.25em;
		font-weight: 700;
	}
</style>
