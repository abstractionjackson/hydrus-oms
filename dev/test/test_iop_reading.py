import datetime
import unittest

from dev.mock_data_gen.iop_reading import get_random_mmHG, IopReading, MAX_MMHG, MIN_MMHG
from dev.mock_data_gen.interval import interval_list, get_reading_date

class TestIOPReading(unittest.TestCase):
    def test_get_random_mmHG(self):
        for i in range(100):
            mmHG = get_random_mmHG()
            self.assertIsInstance(mmHG, int)
            self.assertTrue(MIN_MMHG <= mmHG <= MAX_MMHG)
    def test_IopReading(self):
        mock_patient_id = 1
        mock_operation_date = datetime.date(2021, 1, 1)
        mock_interval = interval_list[0] # "PRE_OP"
        mock_reading_date = get_reading_date(mock_operation_date, mock_interval)
        iop_reading = IopReading(mock_patient_id, mock_reading_date)
        self.assertIsInstance(iop_reading.mmhg, int)
        self.assertIsInstance(iop_reading.patient_id, int)
        self.assertIsInstance(iop_reading.date, datetime.date)
        self.assertEqual(iop_reading.patient_id, mock_patient_id)
        self.assertLess(iop_reading.date, mock_operation_date)