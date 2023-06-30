import datetime
from db import create_tables, insert_users, get_user_ids, insert_patients, get_patient_ids, get_operation_date_and_id, add_iop_reading, add_medication_reading
from interval import interval_list, get_reading_date
from iop_reading import IopReading
from medication_reading import MedicationReading

# Constants
N_USERS = 100
N_PATIENTS = 20

if __name__ == "__main__":
    create_tables()
    insert_users(n=N_USERS)
    insert_patients(user_ids=get_user_ids(), n=N_PATIENTS)
    for operation_date, id in get_operation_date_and_id():
        for interval in interval_list: # "PRE_OP", "ONE_DAY"...
            reading_date_at_interval = get_reading_date(datetime.date.fromisoformat(operation_date), interval)
            add_iop_reading(IopReading(patient_id=id, reading_date=reading_date_at_interval))
            add_medication_reading(MedicationReading(patient_id=id, reading_date=reading_date_at_interval))
    print("Success! Created {} IOP readings and {} medication readings.".format(N_USERS * N_PATIENTS * len(interval_list), N_USERS * N_PATIENTS * len(interval_list)))
