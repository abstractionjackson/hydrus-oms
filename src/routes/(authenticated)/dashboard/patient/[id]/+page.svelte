<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
import type { PageServerData } from "./$types"
    export let data: PageServerData
    const { patient } = data;

    // 1 day, 3mo, 6mo, 12mo
    const po_intervals = [
        "1 day",
        "3 months",
        "6 months",
        "12 months"
    ];
</script>

<main class="container-fluid">
    <header>
        <Breadcrumb />
    </header>
    <section class='grid'>
        {#if patient}
        <article>
            <header>
                <h3>Patient Detail</h3>
            </header>
            <table id="demo">
                <tbody>
                    <tr>
                        <td>Last Name</td>
                        <td>{patient.name_last}</td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td>{patient.name_first}</td>
                    </tr>
                    <tr>
                        <td>D.O.B.</td>
                        <td>{patient.dob}</td>
                    </tr>
                    <tr>
                        <td>Case Date</td>
                        <td>{patient.case_date}</td>
                    </tr>
                    <tr>
                        <td>OD/OS</td>
                        <td>{patient.od_os}</td>
                    </tr>
                    <tr>
                        <td>Pre-Op IOP</td>
                    <td>{patient.pre_op_iop}</td>
                    </tr>
                    <tr>
                        <td>Pre-Op Meds</td>
                        <td>{patient.pre_op_meds_count}</td>
                    </tr>
                </tbody>
            </table>
        </article>
        <article>
            <header>
                <h3>Readings</h3>
            </header>
            <table id="reading">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Post-Op Interval</th>
                        <th>IOP (mmHg)</th>
                    </tr>
                </thead>
                <tbody>
                {#each patient.reading as reading, i}
                    <tr>
                        <td>{new Date(reading.date).toLocaleDateString()}</td>
                        <td>{po_intervals[i]}</td>
                        <td>{reading.iop}</td>
                    </tr>
                {/each}
            </table>
            <footer>
                <a href="{patient.id}/readings/add" class="icon-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>                      
                </a>
            </footer>
        </article>
        {:else}
        <article>
            <header>
                <h2>Patient Not Found</h2>
            </header>
        </article>
        {/if}
    </section>
</main>

<style>
    main {
        padding: 1rem;
    }
    article {
        max-width: 600px;
    }
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    h2, h3 {
        margin: auto;
    }
    table {
        margin: auto;
        width:fit-content;
    }
    table#demo tr td:first-child {
        font-weight: 700;
    }
    table#reading th {
        font-weight: 700;
    }
</style>