import datetime
import unittest

from dev.mock_data_gen.medication_reading import get_random_quantity, MedicationReading
from dev.mock_data_gen.interval import interval_list, get_reading_date

class TestMedicationReading(unittest.TestCase):
    def test_get_random_quantity(self):
        # returns an integer between 0 and 3
        qty = get_random_quantity()
        self.assertTrue(isinstance(qty, int))
        self.assertTrue(qty >= 0)
        self.assertTrue(qty <= 3)
    def test_MedicationReading(self):
        mock_patient_id = 1
        mock_operation_date = datetime.datetime.now()
        mock_interval = interval_list[0] # "PRE_OP"
        mock_reading_date = get_reading_date(mock_operation_date, mock_interval)
        mock_medication_reading = MedicationReading(mock_patient_id, mock_reading_date)
        self.assertTrue(isinstance(mock_medication_reading.quantity, int))
        self.assertTrue(isinstance(mock_medication_reading.date, datetime.date))
        self.assertTrue(isinstance(mock_medication_reading.patient_id, int))

        