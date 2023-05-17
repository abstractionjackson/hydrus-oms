<script lang="ts">

    import type { PageServerData } from "./$types"

	import Breadcrumb from "$lib/components/Breadcrumb.svelte";

    export let data: PageServerData

    const { patient } = data;

</script>
<main class="container-fluid">
    <header>
        <Breadcrumb />
    </header>
    <section>
        <header>
            <h2>IOP Reading for <i>{patient.name_last}, {patient.name_first}</i></h2>
        </header>
        <form action="?/create" method="post">
            <label for="date">Date</label>
          <input type="date" name="date" id="date" placeholder="Date" required />
          <label for="iop">Interocular Pressure (mmHg)</label>
          <input type="number" name="iop" id="iop" placeholder="IOP" required />
          <input type="submit" value="Add">
        </form>
    </section>
</main>

<style>
    form {
        margin: auto;
        max-width: var(--form-max-width);
    }
    main {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    h2 {
        text-align: center;
    }
</style>