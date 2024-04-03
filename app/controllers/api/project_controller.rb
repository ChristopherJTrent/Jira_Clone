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

    def create
      parameters = project_params
      parameters[:owner_id] ||= current_user.id
      @project = Project.new(parameters)

      if @project.save
        render :show
      else
        render json: @project.errors.full_messages
      end
    end

    def destroy
      puts params
      p_id = params[:id]
      puts p_id
      project = Project.find_by(id: p_id)
      if project&.owner_id == current_user.id
        project.destroy
        render json: :ok
      else
        puts "user #{current_user.id} attempted to delete project #{p_id} owned by #{project&.owner_id}"
        render json: ['cannot delete another user\'s project'], status: 403
      end
    end
    private

    def project_params
      params.require(:project)
            .permit(:title, :key, :description, :owner_id)
    end
  end
end
