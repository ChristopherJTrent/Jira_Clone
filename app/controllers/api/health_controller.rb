class Api::HealthController < ApplicationController 
	def index
		return render json: ['ok'], status: 200
	end
end