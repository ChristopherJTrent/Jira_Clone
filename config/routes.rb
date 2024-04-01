# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[create show]
    resources :session, only: %i[index create]
    resources :project, only: %i[index show create update destroy]
    delete 'session', to: 'session#destroy'
  end
end
