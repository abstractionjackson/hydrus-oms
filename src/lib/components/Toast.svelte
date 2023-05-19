<script lang="ts">
	import { fly } from 'svelte/transition';
	export let type: 'success' | 'info' | 'warn' | 'error' | 'default' = 'default';
	export let message: string;
</script>

<div transition:fly class="container-fluid">
	{#if type === 'success'}
		<span class="icon success icon-sm">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</span>
	{/if}
	<p class={`toast ${type}`}>{message}</p>
</div>

<style>
	.container-fluid {
		position: absolute;
		display: flex;
		align-items: center;
		bottom: 0;
		padding: 0 1rem;
	}
	p {
		margin: 0;
		margin-left: 1rem;
	}
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
