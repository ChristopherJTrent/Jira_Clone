# frozen_string_literal: true

module Api
  # controller responsible for serving projects
  class ProjectController < ApplicationController
    def index
      @projects = current_user.associated_projects
      render :index
    end

    def show
      @project = Project.find_by(id: params[:id])
      render :show
    end

    private

    def project_params
      params.require(:project)
            .permit(:title, :description, :owner_id)
    end
  end
end
