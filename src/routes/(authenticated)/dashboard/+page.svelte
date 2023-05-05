<script lang="ts">
    import { page } from "$app/stores";
	import type { PageData } from "./$types";

    export let data: PageData

    const { patients } = data;

    const { url } = $page;

    let redirectFrom = url.searchParams.get('redirectFrom')
    let patient_id: string;
    let patient_name_last: string;
    let patient_name_first: string;
    if(redirectFrom === 'patient/new') {
        patient_id = url.searchParams.get('id');
        patient_name_last = url.searchParams.get('name_last');
        patient_name_first = url.searchParams.get('name_first');
    };
</script>

<main class="container-fluid">
    <header>
        <a href="/dashboard/patient/new">Add Patient</a>
        {#if redirectFrom === 'patient/new'}
            <article>
                <h4>Create Patient Success</h4>
                <p>Go to <a href={`/dashboard/patient/${patient_id}`}>{patient_name_last}, {patient_name_first}</a></p>
            </article>
        {/if}
    </header>
    <section>
        <h2>My Patients</h2>
        <ul>
            {#each patients as patient}
                <li>
                    <a href="/dashboard/patient/{patient.id}">
                        <span>{patient.name_last}, </span><span>{patient.name_first}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</main>