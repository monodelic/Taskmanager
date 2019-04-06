# frozen_string_literal: true

require 'coveralls'
Coveralls.wear!('rails')
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

module SignInHelper
  def sign_in_as(admin)
    post session_path, params: {
      session: {
        password: admin.password,
        email: admin.email
      }
    }
  end

  def sign_in(author)
    session[:user_id] = author.id
  end
end

class ActionDispatch::IntegrationTest
  include SignInHelper
end

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
  include SignInHelper
end
