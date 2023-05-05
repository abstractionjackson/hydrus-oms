<script lang="ts">
    import type { ActionData } from "./$types"

    export let form: ActionData
</script>

<main class="container-fluid">
    <header>
        <h2>Sign In</h2>
    </header>
    <section>
        <form action="?/signin" method="post">
            <input type="email" name="email" placeholder="Email" />
            <input type="submit" value="Send Link" />
        </form>
        {#if form?.success}
        <article>
            <p>
                Check your email for the sign in link.
            </p>
        </article>
        {/if}
    </section>
</main>