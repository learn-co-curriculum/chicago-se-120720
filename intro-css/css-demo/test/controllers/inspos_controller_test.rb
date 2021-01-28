require "test_helper"

class InsposControllerTest < ActionDispatch::IntegrationTest
  setup do
    @inspo = inspos(:one)
  end

  test "should get index" do
    get inspos_url
    assert_response :success
  end

  test "should get new" do
    get new_inspo_url
    assert_response :success
  end

  test "should create inspo" do
    assert_difference('Inspo.count') do
      post inspos_url, params: { inspo: { code_snippet: @inspo.code_snippet, img_url: @inspo.img_url, title: @inspo.title } }
    end

    assert_redirected_to inspo_url(Inspo.last)
  end

  test "should show inspo" do
    get inspo_url(@inspo)
    assert_response :success
  end

  test "should get edit" do
    get edit_inspo_url(@inspo)
    assert_response :success
  end

  test "should update inspo" do
    patch inspo_url(@inspo), params: { inspo: { code_snippet: @inspo.code_snippet, img_url: @inspo.img_url, title: @inspo.title } }
    assert_redirected_to inspo_url(@inspo)
  end

  test "should destroy inspo" do
    assert_difference('Inspo.count', -1) do
      delete inspo_url(@inspo)
    end

    assert_redirected_to inspos_url
  end
end
