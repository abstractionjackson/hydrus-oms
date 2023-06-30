import sqlite3
from user import User
from patient import Patient

# connect to an in-memory sqlite db
conn = sqlite3.connect(":memory:")

def create_tables():
    # create a user table
    conn.execute(
        """
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL
            );
        """
    )
    # create a patient table
    conn.execute(
        """
        CREATE TABLE patients (
            id INTEGER PRIMARY KEY,
            name_last TEXT NOT NULL,
            name_first TEXT NOT NULL,
            dob DATE NOT NULL,
            operation_date DATE NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
            );
        """
    )
    # create an iop_reading table
    conn.execute(
        """
        CREATE TABLE iop_readings (
            id INTEGER PRIMARY KEY,
            mmHG FLOAT NOT NULL,
            date DATE NOT NULL,
            patient_id INTEGER NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES patients (id)
            );
        """
    )
    # create a medication_reading table
    conn.execute(
        """
        CREATE TABLE medication_readings (
            id INTEGER PRIMARY KEY,
            quantity INTEGER NOT NULL,
            date DATE NOT NULL,
            patient_id INTEGER NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES patients (id)
            );
        """
    )
    pass

def insert_users(n=100):
    # insert n users into the users table
    for _ in range(n):
        user = User()
        conn.execute(
            """
            INSERT INTO users (email, password) VALUES (?, ?);
            """,
            (user.email, user.password)
        )
    pass

def get_user_ids():
    # get all user ids from the users table
    cursor = conn.execute(
        """
        SELECT id FROM users;
        """
    )
    # convert the cursor to a list of ids
    return [row[0] for row in cursor.fetchall()]

def insert_patients(user_ids=[], n=10):
    # for each user_id, insert n patients into the patients table
    for user_id in user_ids:
        for _ in range(n):
            patient = Patient(user_id)
            conn.execute(
                """
                INSERT INTO patients (name_last, name_first, dob, operation_date, user_id) VALUES (?, ?, ?, ?, ?);
                """,
                (patient.name_last, patient.name_first, patient.dob, patient.operation_date, patient.user_id)
            )

def get_patient_ids():
    # get all patient ids from the patients table
    cursor = conn.execute(
        """
        SELECT id FROM patients;
        """
    )
    # convert the cursor to a list of ids
    return [row[0] for row in cursor.fetchall()]

def get_patient_last_names():
    # get all patient last names from the patients table
    cursor = conn.execute(
        """
        SELECT name_last FROM patients;
        """
    )
    # convert the cursor to a list of last names
    return [row[0] for row in cursor.fetchall()]

def get_operation_date_and_id():
    # get all operation dates and ids from the patients table
    cursor = conn.execute(
        """
        SELECT operation_date, id FROM patients;
        """
    )
    # convert the cursor to a list of tuples
    return [row for row in cursor.fetchall()]

def add_iop_reading(iopReading):
    conn.execute(
        """
        INSERT INTO iop_readings (mmHG, date, patient_id) VALUES (?, ?, ?);
        """,
        (iopReading.mmhg, iopReading.date, iopReading.patient_id)
    )

def add_medication_reading(medicationReading):
    conn.execute(
        """
        INSERT INTO medication_readings (quantity, date, patient_id) VALUES (?, ?, ?);
        """,
        (medicationReading.quantity, medicationReading.date, medicationReading.patient_id)
    )
