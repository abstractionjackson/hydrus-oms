import os
# Constants
N_USERS = int(os.environ.get("N_USERS") or 100)
N_PATIENTS = int(os.environ.get("N_PATIENTS") or 20)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # above the module dir
