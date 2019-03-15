class Api::ApplicationController < ApplicationController
  require 'application_responder'
  include Concerns::AuthHelper
  helper_method :current_user
end
