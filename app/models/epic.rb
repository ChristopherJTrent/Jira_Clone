# frozen_string_literal: true

class Epic < ApplicationRecord
	validates :title, presence: true, uniqueness: { scope: :project_id }

	belongs_to :project

end
