class Api::EpicController < ApplicationController
	wrap_parameters include: Epic.attribute_names + ['projectId']
	before_action :require_logged_in
	def index
		@epics = current_user.associated_epics
		render :index
	end
	def create
		epic_parameters = epic_params
		print epic_parameters
		@epic = Epic.new(epic_parameters)
		if @epic.save
			render :show
		else
			render json: @epic.errors.full_messages, status: 422
		end
	end
	def update
		@epic = Epic.find_by(id: params[:id])
		if @epic.update(epic_params)
			render :show
		else 
			render json: @epic.errors.full_messages, status: 422
		end
	end
	def destroy
		@epic = Epic.find_by(id: params[:id])
		if @epic&.project&.owner_id == current_user.id
			@epic.destroy
			render json: :ok
		elsif @epic == nil
			render json: ["epic not found"], status: 404
		else
			render json: ['cannot delete someone else\'s epic'], status: 403
		end
	end

	private

	def epic_params
		params.require(:epic).permit(:title, :description, :project_id)
	end
end
