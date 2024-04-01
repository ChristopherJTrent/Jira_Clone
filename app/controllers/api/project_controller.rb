# frozen_string_literal: true

module Api
  class ProjectController < ApplicationController
    private

    def project_params
      params.require(:project)
            .permit(:title, :description, :owner_id)
            .with_defaults!({ owner_id: current_user.id })
    end
  end
end
