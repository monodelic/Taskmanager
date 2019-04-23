# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include AuthConcern
  helper_method :current_user
end
