require "test_helper"

class BagelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bagel = bagels(:one)
  end

  test "should get index" do
    get bagels_url
    assert_response :success
  end

  test "should get new" do
    get new_bagel_url
    assert_response :success
  end

  test "should create bagel" do
    assert_difference('Bagel.count') do
      post bagels_url, params: { bagel: { name: @bagel.name, price: @bagel.price, special: @bagel.special } }
    end

    assert_redirected_to bagel_url(Bagel.last)
  end

  test "should show bagel" do
    get bagel_url(@bagel)
    assert_response :success
  end

  test "should get edit" do
    get edit_bagel_url(@bagel)
    assert_response :success
  end

  test "should update bagel" do
    patch bagel_url(@bagel), params: { bagel: { name: @bagel.name, price: @bagel.price, special: @bagel.special } }
    assert_redirected_to bagel_url(@bagel)
  end

  test "should destroy bagel" do
    assert_difference('Bagel.count', -1) do
      delete bagel_url(@bagel)
    end

    assert_redirected_to bagels_url
  end
end
