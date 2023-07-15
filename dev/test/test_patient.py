# test that fake_dob returns a date object
import datetime
import unittest


from dev.mock_data_gen.patient import fake_dob, fake_operation_date, Patient

class TestFakeDob(unittest.TestCase):
    def test_fake_dob(self):
        self.assertIsInstance(fake_dob(), datetime.date)
    def test_fake_dob_range(self):
        today = datetime.date.today()
        start_date = today - datetime.timedelta(days=365*70)
        end_date = today - datetime.timedelta(days=365*18)
        dob = fake_dob()
        self.assertGreaterEqual(dob, start_date)
        self.assertLessEqual(dob, end_date)

class TestFakeOperationDate(unittest.TestCase):
    def test_fake_operation_date(self):
        self.assertIsInstance(fake_operation_date(), datetime.date)
    def test_fake_operation_date_range(self):
        today = datetime.date.today()
        start_date = today - datetime.timedelta(days=365*3)
        end_date = today
        operation_date = fake_operation_date()
        self.assertGreaterEqual(operation_date, start_date)
        self.assertLessEqual(operation_date, end_date)

class TestPatient(unittest.TestCase):
    def test_patient(self):
        patient = Patient(user_id=1)
        self.assertIsInstance(patient, Patient)
        self.assertIsInstance(patient.dob, datetime.date)
        self.assertGreaterEqual(patient.dob, datetime.date.today() - datetime.timedelta(days=365*70))
        self.assertLessEqual(patient.dob, datetime.date.today() - datetime.timedelta(days=365*18))
        self.assertIsInstance(patient.name_last, str)
        self.assertIsInstance(patient.name_first, str)
        self.assertIsInstance(patient.operation_date, datetime.date)
        self.assertIsInstance(patient.user_id, int)