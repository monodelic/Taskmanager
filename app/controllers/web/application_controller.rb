# frozen_string_literal: true

class Web::ApplicationController < ApplicationController
  include AuthConcern
  helper_method :current_user
end
