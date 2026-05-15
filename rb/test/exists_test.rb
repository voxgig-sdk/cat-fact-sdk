# CatFact SDK exists test

require "minitest/autorun"
require_relative "../CatFact_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CatFactSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
