require "application_system_test_case"

class InsposTest < ApplicationSystemTestCase
  setup do
    @inspo = inspos(:one)
  end

  test "visiting the index" do
    visit inspos_url
    assert_selector "h1", text: "Inspos"
  end

  test "creating a Inspo" do
    visit inspos_url
    click_on "New Inspo"

    fill_in "Code snippet", with: @inspo.code_snippet
    fill_in "Img url", with: @inspo.img_url
    fill_in "Title", with: @inspo.title
    click_on "Create Inspo"

    assert_text "Inspo was successfully created"
    click_on "Back"
  end

  test "updating a Inspo" do
    visit inspos_url
    click_on "Edit", match: :first

    fill_in "Code snippet", with: @inspo.code_snippet
    fill_in "Img url", with: @inspo.img_url
    fill_in "Title", with: @inspo.title
    click_on "Update Inspo"

    assert_text "Inspo was successfully updated"
    click_on "Back"
  end

  test "destroying a Inspo" do
    visit inspos_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Inspo was successfully destroyed"
  end
end
