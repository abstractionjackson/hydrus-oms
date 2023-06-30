import datetime
import unittest

from .interval import get_interval, get_reading_date, interval_list

class TestInterval(unittest.TestCase):
    def test_interval_list(self):
        self.assertIsInstance(interval_list, list)
        self.assertEqual(len(interval_list), 6)
        for interval in interval_list:
            self.assertIsInstance(interval, str)
        pass
    def test_get_interval(self):
        mock_operation_date = datetime.date(2021, 1, 1)
        # day before operation
        td = datetime.timedelta(days=1)
        mock_reading_date = mock_operation_date - td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "PRE_OP")
        # day of operation
        td = datetime.timedelta(days=0)
        mock_reading_date = mock_operation_date - td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "ONE_DAY")
        # day after operation
        td = datetime.timedelta(days=1)
        mock_reading_date = mock_operation_date + td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "ONE_DAY")
        # 30 days after operation is one month
        td = datetime.timedelta(days=30)
        mock_reading_date = mock_operation_date + td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "ONE_MONTH")
        # 90 days after operation is three months
        td = datetime.timedelta(days=90)
        mock_reading_date = mock_operation_date + td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "THREE_MONTH")
        # 180 days after operation is six months
        td = datetime.timedelta(days=180)
        mock_reading_date = mock_operation_date + td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "SIX_MONTH")
        # 365 days after operation is twelve months
        td = datetime.timedelta(days=365)
        mock_reading_date = mock_operation_date + td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "TWELVE_MONTH")
        # 366 days after operation is twelve months
        td = datetime.timedelta(days=366)
        mock_reading_date = mock_operation_date + td
        self.assertEqual(get_interval(mock_operation_date, mock_reading_date), "TWELVE_MONTH")
        pass
    def test_get_reading_date(self):
        mock_operation_date = datetime.date(2021, 1, 1)
        for i in range(len(interval_list)):
            interval = interval_list[i]
            reading_date = get_reading_date(mock_operation_date, interval)
            if interval == "PRE_OP":
                # reading date is before operation date
                self.assertTrue(reading_date < mock_operation_date)
            elif interval == "ONE_DAY":
                lower_bound = mock_operation_date
                upper_bound = mock_operation_date + datetime.timedelta(days=1)
                self.assertTrue(lower_bound <= reading_date <= upper_bound)
            elif interval == "ONE_MONTH":
                lower_bound = mock_operation_date + datetime.timedelta(days=2)
                upper_bound = mock_operation_date + datetime.timedelta(days=30)
                self.assertTrue(lower_bound <= reading_date <= upper_bound)
            elif interval == "THREE_MONTH":
                lower_bound = mock_operation_date + datetime.timedelta(days=31)
                upper_bound = mock_operation_date + datetime.timedelta(days=90)
                self.assertTrue(lower_bound <= reading_date <= upper_bound)
            elif interval == "SIX_MONTH":
                lower_bound = mock_operation_date + datetime.timedelta(days=91)
                upper_bound = mock_operation_date + datetime.timedelta(days=180)
                self.assertTrue(lower_bound <= reading_date <= upper_bound)
            elif interval == "TWELVE_MONTH":
                lower_bound = mock_operation_date + datetime.timedelta(days=181)
                upper_bound = mock_operation_date + datetime.timedelta(days=365)
                self.assertTrue(lower_bound <= reading_date <= upper_bound)
        pass