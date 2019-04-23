# frozen_string_literal: true

require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    admin = create(:admin)
    sign_in_as admin
  end
end
class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should get show' do
    user = create(:user)
    get admin_user_url(user)
    assert_response :success
  end
end
