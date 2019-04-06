# frozen_string_literal: true

class JsonResponder < ActionController::Responder
  def api_behaviour(*args, &block)
    byebug
    if post?
      display(resource, status: :created)
    elsif put? || patch?
      display(resource, status: :ok)
    else
      super
    end
  end
end
