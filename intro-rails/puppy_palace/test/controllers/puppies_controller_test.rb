require "test_helper"

class PuppiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get puppies_index_url
    assert_response :success
  end

  test "should get show" do
    get puppies_show_url
    assert_response :success
  end

  test "should get new" do
    get puppies_new_url
    assert_response :success
  end
end
