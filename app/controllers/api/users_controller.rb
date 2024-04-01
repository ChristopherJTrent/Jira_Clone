# frozen_string_literal: true

module Api
  # handles user registration
  class UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']
    before_action :require_logged_out, only: [:create]

    def create
      @user = User.new(user_params)

      render json: @user.errors.full_messages, status: 422 unless @user.save

      log_in(@user)
      render :show
    end

    def show
      @user = User.find_by(id: params[:id])
      render :show
    end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
  end
end
