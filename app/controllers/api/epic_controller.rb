class Api::EpicController < ApplicationController

	def index
		@epics = current_user.associated_epics
		render :index
	end
	def create
		@epic = Epic.new(epic_params)
		if @epic.save
			render :show
		else
			render json: @epic.errors.full_messages, status: 422
		end
	end
	def update
	end
	def destroy
	end

	private

	def epic_params
		params.require(:epic).permit(:title, :description, :project_id)
	end
end
