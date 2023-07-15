import unittest
import os


from dev.mock_data_gen.constants import PROJECT_ROOT
from dev.mock_data_gen.utils import save_user_credentials

TEST_MOCK_USER_CREDENTIALS_FILE = PROJECT_ROOT + "/test/mock_user_credentials.csv"

class TestSaveUserCredentials(unittest.TestCase):
    def __init__(self, methodName: str = "runTest") -> None:
        super().__init__(methodName)
        self.user_id = "123"
        self.email = "test@example.com"
        self.password = "password"

    def setUp(self) -> None:
        save_user_credentials(id=self.user_id, email=self.email, password=self.password, file=TEST_MOCK_USER_CREDENTIALS_FILE)
        return super().setUp()
    def test_save_user_credentials(self):
        with open(TEST_MOCK_USER_CREDENTIALS_FILE, "r") as f:
            f.readline() # skip the header
            line = f.readline()
            self.assertEqual(line, "{},{},{}\n".format(self.user_id, self.email, self.password))
    def tearDown(self) -> None:
        # delete the user credentials file
        # from the file system
        os.remove(TEST_MOCK_USER_CREDENTIALS_FILE)
 