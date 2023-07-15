import unittest

from dev.mock_data_gen.db import conn
from dev.mock_data_gen.controllers import create_user

class TestControllers(unittest.TestCase):
    def __init__(self, methodName: str = "runTest") -> None:
        self.user_email = "test@example.com"
        self.user_password = "password"
        super().__init__(methodName)

    def _delUsers(self):
        # delete the user(s) from supabase
        with conn.cursor() as cursor:
            values = (self.user['id'], self.random_user['id'])
            cursor.execute(
                """
                DELETE FROM auth.users WHERE id IN (%s, %s);
                """,
                values
            )
        conn.commit()
        pass

    def setUp(self) -> None:
        self.user = create_user(self.user_email, self.user_password)
        self.random_user = create_user()
        return super().setUp()

    def tearDown(self) -> None:
        self._delUsers()
        return super().tearDown()

    def test_create_user(self):
        # it creates a user with the given email and password
        self.assertEqual(self.user['email'], self.user_email)
        self.assertEqual(self.user['password'], self.user_password)
        self.assertIsNotNone(self.user['id'])
        
    def test_create_fake_user(self):
        # it creates a user with a random email and password
        self.assertIsNotNone(self.random_user['email'])
        self.assertIsNotNone(self.random_user['password'])
        self.assertIsNotNone(self.random_user['id'])