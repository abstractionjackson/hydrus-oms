import random

def get_random_quantity():
    return random.randint(0, 3)

class MedicationReading:
    def __init__(self, patient_id, reading_date):
        self.patient_id = patient_id
        self.date = reading_date
        self.quantity = get_random_quantity()