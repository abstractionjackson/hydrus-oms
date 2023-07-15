import unittest

from dev.mock_data_gen.user import User

class TestUser(unittest.TestCase):
    def test_user(self):
        user = User()
        self.assertIsInstance(user, User)
        self.assertIsInstance(user.email, str)
        self.assertRegex(user.email, r"[^@]+@[^@]+\.[^@]+")
        self.assertIsInstance(user.password, str)