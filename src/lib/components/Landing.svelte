<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$assets/images/logo4_no_bg.png';
	export let brandtext = 'HOMS';
	export let brand_subtext: string = 'Hydrus Outcomes Management System';
	export let description: string =
		'A streamlined approach to patient outcome analysis';
</script>

<div class="container">
	<header>
		<div class="logo">
			<img src={logo} alt="logo" />
		</div>
		<div class="" id="text">
			<h1>H<span id="gradient">O</span>MS</h1>
			<h5 id="brand_subtext">{brand_subtext}</h5>
			<p>{description}</p>
		</div>
	</header>
	<div class="btn-container">
		<button on:click={() => goto('/signup')}>Sign Up</button>
		<button on:click={() => goto('/signin')} class="outline">Sign In</button>
	</div>
</div>

<style lang="scss">
	.container {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}
	.logo {
		width: 275px;
		margin: auto;
	}
	.logo > img {
		transform: scale(1.5);
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
		margin-top: 2.5rem
	}
	#text {
		height: fit-content;
		h1 {
			font-family: "serif";
			#gradient {
				background-image: linear-gradient(
				180deg,
				white,
				var(--primary) 25%,
				var(--primary-hover),
				black,
				);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			}
		}
	}
	#brand_subtext {
		/* italic */
		font-style: italic;
		color: var(--primary)
}
</style>
