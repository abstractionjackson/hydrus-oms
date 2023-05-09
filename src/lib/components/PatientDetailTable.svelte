<script lang="ts">
    import type { Patient } from "$lib/types";
    export let patient: Patient;
</script>
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