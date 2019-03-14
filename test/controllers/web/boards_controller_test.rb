require 'test_helper'

class Web::BoardsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get board_url
    assert_response :success
  end

  setup do
    user = create(:user)
    sign_in_as user
  end
end
