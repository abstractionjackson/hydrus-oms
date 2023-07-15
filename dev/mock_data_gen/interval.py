# define the interval set

import datetime
import random


interval_list = [
    "PRE_OP",
    "ONE_DAY",
    "ONE_MONTH",
    "THREE_MONTH",
    "SIX_MONTH",
    "TWELVE_MONTH",
]

def get_interval(operation_date, reading_date):
    if reading_date < operation_date:
        return "PRE_OP"
    if reading_date == operation_date:
        return "ONE_DAY"
    if reading_date <= operation_date + datetime.timedelta(days=1):
        return "ONE_DAY"
    if reading_date <= operation_date + datetime.timedelta(days=30):
        return "ONE_MONTH"
    if reading_date <= operation_date + datetime.timedelta(days=90):
        return "THREE_MONTH"
    if reading_date <= operation_date + datetime.timedelta(days=180):
        return "SIX_MONTH"
    if reading_date <= operation_date + datetime.timedelta(days=365):
        return "TWELVE_MONTH"
    return "TWELVE_MONTH"

def get_reading_date(operation_date, interval):
    if interval == "PRE_OP":
        # get random date up to 30 days before operation date
        td = datetime.timedelta(days=30)
        return operation_date - datetime.timedelta(days=1) * random.randint(1, 30)
    if interval == "ONE_DAY":
        # get random date up to one day after the operation
        td = datetime.timedelta(days=1)
        return operation_date + datetime.timedelta(days=1) * random.randint(0, 1)
    if interval == "ONE_MONTH":
        # get random date up to one month after the operation
        td = datetime.timedelta(days=30)
        return operation_date + datetime.timedelta(days=1) * random.randint(2, 30)
    if interval == "THREE_MONTH":
        # get random date up to three months after the operation
        td = datetime.timedelta(days=90)
        return operation_date + datetime.timedelta(days=1) * random.randint(31, 90)
    if interval == "SIX_MONTH":
        # get random date up to six months after the operation
        td = datetime.timedelta(days=180)
        return operation_date + datetime.timedelta(days=1) * random.randint(91, 180)
    if interval == "TWELVE_MONTH":
        # get random date up to twelve months after the operation
        td = datetime.timedelta(days=365)
        return operation_date + datetime.timedelta(days=1) * random.randint(181, 365)
    return operation_date