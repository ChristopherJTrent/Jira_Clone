# frozen_string_literal: true

module Api
  # controller responsible for serving projects
  class ProjectController < ApplicationController
    def index
      if current_user
        @projects = current_user.associated_projects
        render :index
      else
        render json: ['user is undefined.'], status: 403
      end
    end

    def show
      @project = Project.find_by(id: params[:id])
      render :show
    end

    def create
      parameters = project_params
      parameters[:owner_id] ||= current_user.id
      @project = Project.new(parameters)

      if (!parameters[:key].empty? && !parameters[:title].empty?) && @project.save
        render :show
      else
        render json: @project.errors.full_messages
      end
    end

    def update
      invalid = params[:title].empty? || params[:key].empty?
      @project = Project.find_by(id: params[:id])
      if @project && !invalid
        @project.update(project_params)
        render :show
      else
        render json: ["project '#{params[:id]}' not found"], status: 404
      end
    end

    def destroy
      p_id = params[:id]
      project = Project.find_by(id: p_id)
      if project&.owner_id == current_user.id
        project.destroy
        render json: :ok
      else
        render json: ['cannot delete another user\'s project'], status: 403
      end
    end

    private

    def project_params
      params.require(:project)
            .permit(:title, :key, :description, :owner_id, :id)
    end
  end
end
