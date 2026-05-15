# ProjectName SDK exists test

import pytest
from catfact_sdk import CatFactSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CatFactSDK.test(None, None)
        assert testsdk is not None
