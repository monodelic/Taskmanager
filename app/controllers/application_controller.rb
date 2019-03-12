# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Concerns::AuthHelper
  helper_method :current_user
end
