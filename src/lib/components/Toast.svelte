<script lang="ts">
	import { fly } from 'svelte/transition';
	export let type: 'success' | 'info' | 'warn' | 'error' | 'default' = 'default';
	export let message: string;
</script>

<p out:fly={{ duration: 1500, y: -25 }} class={`toast ${type}`}>{message}</p>

<style>
	.toast {
		padding: 1rem;
		/* round bottom border-radius */
		border-radius: 0 0 0.5rem 0.5rem;
		color: var(--color-text);
		background-color: var(--color-bg);
		box-shadow: var(--shadow);
	}
	.toast.success {
		color: var(--color-success);
		background-color: var(--color-success-bg);
	}
	.toast.info {
		color: var(--color-info);
		background-color: var(--color-info-bg);
	}
	.toast.warn {
		color: var(--color-warn);
		background-color: var(--color-warn-bg);
	}
	.toast.error {
		color: var(--color-error);
		background-color: var(--color-error-bg);
	}
	.toast.default {
		color: var(--color-text);
		background-color: var(--color-bg);
	}
</style>
