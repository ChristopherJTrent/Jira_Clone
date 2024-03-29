# frozen_string_literal: true

module Api
  # handles login and logout
  class SessionController < ApplicationController
    def index
      @user = current_user
      if @user
        render 'api/users/show'
      else
        render json: { user: nil }
      end
    end

    def create
      @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
      if @user
        log_in(@user)
        render json: :ok
      else
        render json: { errors: ['user not found'] }, status: 401
      end
    end

    def destroy
      log_out
    end
  end
end
