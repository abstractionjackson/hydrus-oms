<script>
    import { page } from '$app/stores'
    import errorImg from "$assets/images/404.png"
</script>

<main class="container">
    <div class="pico-center pico-text-center">
        <header>
            <img src={errorImg} alt="Page not found" class="error-image"/>
            <h1 class="pico-h1">{$page.status}</h1>
        </header>
        <h2 class="pico-h3">{$page.error?.message}</h2>
        <a href="/">Home</a>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f8f9fa;
    }
    header {
        display: flex;
        align-items: center;
        h1 {
            height: fit-content;
            margin-bottom: 0px;
        }
    }
    .pico-center {
        max-width: 600px;
    }
    img {
        height: 2.5rem;
        border-radius: 10px;
        margin-right: 1em;
    }
</style>
