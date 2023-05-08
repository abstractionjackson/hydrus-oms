<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
import type { PageServerData } from "./$types"
    export let data: PageServerData
    const { patient } = data;
</script>

<main class="container-fluid">
    <header>
        <Breadcrumb />
    </header>
    <section>
        <article>
            <header>
                <h2>Patient Detail</h2>
            </header>
            <table>
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
    </section>
</main>

<style>
    main {
        padding: 1rem;
    }
    article {
        margin: auto;
        max-width: 600px;
    }
    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    h2 {
        margin: auto;
    }
    table {
        margin: auto;
        width:fit-content;
    }
    table tr td:first-child {
        font-weight: 700;
    }
</style>