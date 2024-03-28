class ApplicationController < ActionController::API
	include ActionController::RequestForgeryProtection

	def current_user
		@current_user ||= User.find_by(session_token: session[:session_token])
	end

	def require_logged_in
		unless logged_in?
			render json: {errors: ['Must be logged in']}, 401
		end
	end

	def require_logged_out
		if logged_in?
			render json: {errors: ['must be logged out']}, 403
		end
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
		headers['X-CSRF-Token'] = masked_authenticity_token(session)
end
