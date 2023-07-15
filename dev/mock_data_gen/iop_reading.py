import random

MIN_MMHG = 25
MAX_MMHG = 30
def get_random_mmHG():
    return random.randint(MIN_MMHG, MAX_MMHG)

class IopReading:
    def __init__(self, patient_id, reading_date):
        self.patient_id = patient_id
        self.date = reading_date
        self.mmhg = get_random_mmHG()