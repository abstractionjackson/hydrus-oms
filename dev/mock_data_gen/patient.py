import datetime
from faker import Faker

# write a function that return a random date
# in the range of 18 to 70 years prior to today's date
def fake_dob(faker=Faker()):
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=365*70)
    end_date = today - datetime.timedelta(days=365*18)
    # get a random date between start_date and end_date
    return faker.date_between(start_date=start_date, end_date=end_date)

def fake_operation_date(faker=Faker()):
    # a date within the last 3 years
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=365*3)
    end_date = today
    return faker.date_between(start_date=start_date, end_date=end_date)

class Patient:
    def __init__(self, user_id):
        faker = Faker()
        self.dob = fake_dob(faker)
        self.name_last = faker.last_name()
        self.name_first = faker.first_name()
        self.operation_date = fake_operation_date(faker)
        self.user_id = user_id
