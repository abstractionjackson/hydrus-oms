import psycopg2

from os import environ
from dotenv import load_dotenv
from user import User
from patient import Patient

load_dotenv()

MOCK_ENV = environ.get('MOCK_ENV') or 'dev'
db_host = environ.get('SUPABASE_DB_HOST') if MOCK_ENV == 'prod' else 'localhost'
db_port = environ.get('SUPABASE_DB_PORT') or '54322'
db_name = environ.get('SUPABASE_DB_NAME') or 'postgres'
db_user = environ.get('SUPABASE_DB_USER') or 'postgres'
db_password = environ.get('SUPABASE_DB_PASSWORD') or 'postgres'

conn = psycopg2.connect(
    host=db_host,
    port=db_port,
    database=db_name,
    user=db_user,
    password=db_password
)

def create_tables():
    with conn.cursor() as cursor:
        # setup dependencies
        cursor.execute(
            '''
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            '''
        )
        # create a user table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS auth.users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                email TEXT NOT NULL,
                encrypted_password TEXT NOT NULL
                );
            """
        )
        # create a patient table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS patients (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name_last TEXT NOT NULL,
                name_first TEXT NOT NULL,
                dob DATE NOT NULL,
                operation_date DATE NOT NULL,
                user_id UUID NOT NULL,
                FOREIGN KEY (user_id) REFERENCES auth.users (id)
                );
            """
        )
        # create an iop_reading table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS iop_readings (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                mmHG FLOAT NOT NULL,
                date DATE NOT NULL,
                patient_id UUID NOT NULL,
                FOREIGN KEY (patient_id) REFERENCES patients (id)
                );
            """
        )
        # create a medication_reading table
        cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS medication_readings (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            quantity INTEGER NOT NULL,
            date DATE NOT NULL,
            patient_id UUID NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES patients (id)
            );
        """
        )
        conn.commit()

def insert_users(n=100):
    # insert n users into the users table
    for _ in range(n):
        user = User()
        with conn.cursor() as cursor:
            query = "INSERT INTO auth.users (email, password) VALUES (%s, %s)"
            data = (user.email, user.password)
            cursor.execute(query, data)
        conn.commit()
    pass

def get_user_ids():
    # get all user ids from the users table
    with conn.cursor() as cursor:
        cursor.execute(
            """
            SELECT id FROM auth.users;
            """
        )
        # convert the cursor to a list of ids
        return [row[0] for row in cursor.fetchall()]

def insert_patients(user_ids=[], n=10):
    # for each user_id, insert n patients into the patients table
    for user_id in user_ids:
        for _ in range(n):
            patient = Patient(user_id)
            with conn.cursor() as cursor:
                query = "INSERT INTO patients (name_last, name_first, dob, operation_date, user_id) VALUES (%s, %s, %s, %s, %s)"
                data = (patient.name_last, patient.name_first, patient.dob, patient.operation_date, patient.user_id)
                cursor.execute(query, data)
            conn.commit()

def get_patient_ids():
    # get all patient ids from the patients table
    with conn.cursor() as cursor:
        cursor.execute(
            """
            SELECT id from patients;
            """
        )
        # convert the cursor to a list of ids
        return [row[0] for row in cursor.fetchall()]

def get_patient_last_names():
    # get all patient last names from the patients table
    with conn.cursor() as cursor:
        cursor.execute(
            """
            SELECT name_last from patients;
            """
        )
        # convert the cursor to a list of last names
        return [row[0] for row in cursor.fetchall()]

def get_operation_date_and_id():
    # get all operation dates and ids from the patients table
    with conn.cursor() as cursor:
        cursor.execute(
            """
            SELECT operation_date, id from patients;
            """
        )
        # convert the cursor to a list of tuples
        return [row for row in cursor.fetchall()]

def add_iop_reading(iopReading):
    with conn.cursor() as cursor:
        query = "INSERT INTO iop_readings (mmHG, date, patient_id) VALUES (%s, %s, %s)"
        data = (iopReading.mmhg, iopReading.date, iopReading.patient_id)
        cursor.execute(query, data)
    conn.commit()

def add_medication_reading(medicationReading):
    with conn.cursor() as cursor:
        query = "INSERT INTO medication_readings (quantity, date, patient_id) VALUES (%s, %s, %s)"
        data = (medicationReading.quantity, medicationReading.date, medicationReading.patient_id)
        cursor.execute(query, data)
    conn.commit()

"""
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS iop_readings CASCADE;
DROP TABLE IF EXISTS medication_readings CASCADE;
"""