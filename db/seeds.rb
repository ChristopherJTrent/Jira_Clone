# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
ApplicationRecord.transaction do
  [User, Project, Membership].each(&:destroy_all)

  %w[users projects memberships].each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end
  demo = User.create!(username: 'Demo User', email: 'demo@example.com', password: '1Demonstration!')
  Project.create!(title: 'demo project',
                  description: 'this is a demo project to show the full layout of the site',
                  key: 'DP',
                  owner: demo)
  Project.create!(title: 'demo project 2',
                  description: 'this is another demo project to show how having multiple projects changes the site display',
                  key: 'DP2',
                  owner: demo)

  test = User.create!(username: 'Test User', email: 'test@example.com', password: 'testPasswordPleaseIgnore!')
  test_project = Project.create!(title: 'test project',
                                 description: 'this is a test project for making sure relations work',
                                 key: 'TP',
                                 owner: test)
  Membership.create!(user: demo, project: test_project)

end
