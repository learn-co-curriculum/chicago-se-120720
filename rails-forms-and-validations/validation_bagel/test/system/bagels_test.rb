require "application_system_test_case"

class BagelsTest < ApplicationSystemTestCase
  setup do
    @bagel = bagels(:one)
  end

  test "visiting the index" do
    visit bagels_url
    assert_selector "h1", text: "Bagels"
  end

  test "creating a Bagel" do
    visit bagels_url
    click_on "New Bagel"

    fill_in "Name", with: @bagel.name
    fill_in "Price", with: @bagel.price
    check "Special" if @bagel.special
    click_on "Create Bagel"

    assert_text "Bagel was successfully created"
    click_on "Back"
  end

  test "updating a Bagel" do
    visit bagels_url
    click_on "Edit", match: :first

    fill_in "Name", with: @bagel.name
    fill_in "Price", with: @bagel.price
    check "Special" if @bagel.special
    click_on "Update Bagel"

    assert_text "Bagel was successfully updated"
    click_on "Back"
  end

  test "destroying a Bagel" do
    visit bagels_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Bagel was successfully destroyed"
  end
end
