<script lang="ts">
    import type { PageServerData } from "./$types"
    export let data: PageServerData
    const { patient } = data;
</script>

<style>
    table tr td:first-child {
        font-weight: 700;
        background-color: #f4f4f4;
    }
</style>

<main class="container-fluid">
    <header>
        <h2>Patient Detail</h2>
    </header>
    <section>
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
    </section>
</main>