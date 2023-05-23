<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$assets/images/logo4_no_bg.png';
	export let brandtext = 'Hydrus';
	export let description: string =
		'Track patient outcomes for Hydrus microstent surgery, and visualize IOP and medication data across patients and time.';
</script>

<div class="container">
	<header>
		<img src={logo} alt="logo" />
		<h1>{brandtext}</h1>
		<p>{description}</p>
	</header>
	<div class="btn-container">
		<button on:click={() => goto('/signup')}>Sign Up</button>
		<button on:click={() => goto('/signin')} class="outline">Sign In</button>
	</div>
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
	h1 {
		font-size: 3em;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	button {
		width: fit-content;
		margin: 0 auto;
		font-weight: 700;
	}
	.btn-container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
	}
</style>
