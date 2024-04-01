# frozen_string_literal: true

# base class for all controllers
class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception, prepend: true
  before_action :snake_case_params
  before_action :attach_authenticity_token

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_logged_in
    return if logged_in?

    render json: { errors: ['Must be logged in'] }, status: 401
  end

  def require_logged_out
    return unless logged_in?

    render json: { errors: ['must be logged out'] }, status: 403
  end

  def log_in(user)
    session[:session_token] = user.reset_session_token!
  end

  def log_out
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

  private

  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end

  def attach_authenticity_token
    headers['X-CSRF-Token'] = form_authenticity_token
  end
end
