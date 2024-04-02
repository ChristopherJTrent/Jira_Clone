class Project < ApplicationRecord
  validates :key, presence: true, length: { maximum: 3 }
  belongs_to :owner, class_name: :User, foreign_key: :owner_id
end
