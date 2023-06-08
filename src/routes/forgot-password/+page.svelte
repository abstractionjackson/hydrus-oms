<script lang="ts">
	import { ForgotPasswordForm, NavBarTop } from '$lib/components';
	import type { ActionData } from './$types';
    
    export let form: ActionData
</script>

<main>
	<header>
		<NavBarTop />
	</header>
	<section class="container">
		<header>
			<h2>Recover HOMS Account</h2>
		</header>
		<ForgotPasswordForm />
	</section>
    <footer class="container">
        {#if form?.success}
            <p class="success">
                <span class='icon'>
                    <!-- paper plane icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>                       
                </span>
                An email has been sent to <b>{form.email}</b> with instructions on how to reset your password.</p>
        {:else if form?.error}
            <p class="error">{form.error}</p>
        {/if}
    </footer>
</main>

<style>
	main > header {
		padding: 1rem 0 2rem;
		margin: 0 1rem;
	}
	h2 {
		text-align: center;
	}
    footer {
        text-align: center;
    }
    .icon > svg {
        width: 1em;
    }
	.container {
		max-width: 368px;
	}
</style>
