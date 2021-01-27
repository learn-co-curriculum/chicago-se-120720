Rails.application.routes.draw do
  resources :users, only: [:show, :create]
  resources :sessions, only: [:create]
  get "signup", to: "users#new"
  get "login", to: "sessions#new"
  delete "sessions", to: "sessions#destroy", as: "logout"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
