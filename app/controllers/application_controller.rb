class ApplicationController < ActionController::Base
  include AuthConcern
  helper_method :current_user
end
