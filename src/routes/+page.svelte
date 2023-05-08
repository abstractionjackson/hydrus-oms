<script lang="ts">
    import type { ActionData } from "./$types"

    export let form: ActionData
</script>

<style>
    h2 {
        width: fit-content;
        margin: auto;
    }
    form {
        margin: auto;
        max-width: var(--form-max-width);
    }
    article {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .icon-sm > svg {
        width: 1em;
    }
</style>
<main class="container-fluid">
    <section>
        <article>
            <header>
                <h2>Sign In</h2>
            </header>
            <form action="?/signin" method="post">
                <input type="email" name="email" placeholder="Email" />
                <input type="submit" value="Send Link" />
            </form>
        </article>
        {#if form?.success}
        <article class="flash">
            <span class="icon success icon-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>              
            </span>
            <span class="flash message">
                Check your email for the sign in link.
            </span>
        </article>
        {/if}
    </section>
</main>