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

class User:
    def __init__(self):
        faker = Faker()
        self.email = faker.email()
        self.password = faker.password()