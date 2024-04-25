# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :health, only: %i[index]
    resources :users, only: %i[create show]
    resources :session, only: %i[index create]
    resources :project, only: %i[index show create update destroy]
    resources :epic, only: %i[index create update destroy]
    delete 'session', to: 'session#destroy'
  end
  get '*path', to: 'static_pages#frontend'
end
