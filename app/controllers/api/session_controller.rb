# frozen_string_literal: true

module Api
  # handles login and logout
  class SessionController < ApplicationController
    def show
      @user = current_user
      if @user
        render 'api/users/show'
      else
        render json: { user: nil }
      end
    end
  end
end
