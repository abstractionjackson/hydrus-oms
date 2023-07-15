from controllers import create_user
from constants import N_USERS, N_PATIENTS, PROJECT_ROOT
from db import create_tables,insert_patients, get_operation_date_and_id, add_iop_reading, add_medication_reading
from interval import interval_list, get_reading_date
from iop_reading import IopReading
from medication_reading import MedicationReading
from utils import save_user_credentials
from dotenv import load_dotenv
from os import environ

load_dotenv()

# Constants
user_credentials_file = PROJECT_ROOT + ("/supabase_mock_user_credentials.csv" if environ.get("MOCK_ENV") == "prod" else "/mock_user_credentials.csv")

# Variables
user_ids = []

if __name__ == "__main__":
    create_tables()
    for _ in range(N_USERS):
        user = create_user()
        save_user_credentials(id=user['id'], email=user['email'], password=user['password'], file=user_credentials_file)
        user_ids.append(user['id'])
    insert_patients(user_ids, n=N_PATIENTS)
    for operation_date, id in get_operation_date_and_id():
        for interval in interval_list: # "PRE_OP", "ONE_DAY"...
            reading_date_at_interval = get_reading_date(operation_date, interval)
            add_iop_reading(IopReading(patient_id=id, reading_date=reading_date_at_interval))
            add_medication_reading(MedicationReading(patient_id=id, reading_date=reading_date_at_interval))
    print("Success! Created {} IOP readings and {} medication readings.".format(N_USERS * N_PATIENTS * len(interval_list), N_USERS * N_PATIENTS * len(interval_list)))
