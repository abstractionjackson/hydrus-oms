
<!-- form that accepts patient demo information -->
<main class="container-fluid">
    <header>
        <h2>New Patient</h2>
    </header>
    <section>
        <form action="?/create" method="post">
            <!-- fields for creating a new patient -->
            <label for="name_last">Last Name</label>
            <input type="text" name="name_last" id="name_last" placeholder="Doe" required />
            <label for="name_first">First Name</label>
            <input type="text" name="name_first" id="name_first" placeholder="John" required />
            <label for="dob">D.O.B.</label>
            <input type="date" name="dob" id="dob" placeholder="Date of Birth" required />
            <label for="case_date">Case Date</label>
            <input type="date" name="case_date" id="case_date" placeholder="Case Date" required />
            <div class="input-group">
                <span id="od_os">OD/OS</span>
                <div class="checkbox-group">
                    <input type="checkbox" name="od" id="od" value="od">
                    <label for="od">OD</label>
                </div>
                <div class="checkbox-group">
                    <input type='checkbox' name="os" id="os" value="os" />
                    <label for="os">OS</label>
                </div>
            </div>
            <label for="pre_op_iop">Pre-Op IOP
            </label>
            <input type="number" name="pre_op_iop" id="pre_op_iop" placeholder="0" required />
            <label for="pre_op_meds">Pre-Op Meds</label>
            <input type="number" name="pre_op_meds_count" id="pre_op_meds_count" placeholder="0" required>
            <input type="submit" value="Submit">
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
    header {
        width: fit-content;
        margin: auto;   
    }
    .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }
    .checkbox-group {
        flex-direction: row;
    }
    #od_os {
        margin-bottom: 4px;
    }
</style>