import csv

from constants import PROJECT_ROOT

def save_user_credentials(id, email, password, file=PROJECT_ROOT + "/mock_user_credentials.csv"):
    # if the file exists, do not overwrite it
    try:
        with open(file, 'x') as f:
            writer = csv.writer(f)
            writer.writerow(["id", "email", "password"]) # header
            writer.writerow([id, email, password])
    except FileExistsError:
        # append rows
        with open(file, 'a') as f:
            writer = csv.writer(f)
            writer.writerow([id, email, password])
    pass