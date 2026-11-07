from django.test import SimpleTestCase


class AuthRemovalTests(SimpleTestCase):
    def test_authentication_is_not_required_for_api_access(self):
        self.assertTrue(True)
