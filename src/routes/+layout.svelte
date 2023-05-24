<script lang="ts">
	import '@picocss/pico';
	import '$assets/css/styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount, setContext } from 'svelte';
	import { toast } from '$lib/stores';

	export let data;

	$: ({ supabase, session } = data);

	let message: string;

	toast.subscribe((value) => {
		message = value.message ?? '';
	});

	setContext('toast', toast);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const handleDismissToast = () => {
		toast.set({ hasMessage: false });
	};
</script>

{#if $toast.hasMessage}
	<div class="toast">
		<span class="message">
			{message}
		</span>
		<div class="button" on:click={handleDismissToast}>
			<!-- X icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</div>
	</div>
{/if}
<slot />

<style>
	.toast {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		z-index: 1;
		background-color: var(--secondary);
		color: var(--secondary-inverse);
		margin: 1rem;
		padding: 0.75rem;
	}
	.toast > .button {
		width: 0.75rem;
		display: flex;
		flex-direction: column;
		justify-content: start;
		top: 0;
		right: 0;
		margin-left: 1rem;
	}
	.toast > .button:hover {
		cursor: pointer;
	}
	.toast > .message {
		margin-left: 1rem;
	}
</style>
