# frozen_string_literal: true

class Api::ApplicationController < ApplicationController
  include AuthConcern

  self.responder = JsonResponder
  respond_to :json

  helper_method :current_user
end
