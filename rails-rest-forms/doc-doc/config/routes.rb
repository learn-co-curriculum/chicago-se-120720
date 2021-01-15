Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get '/doctors', to: 'doctors#index'
  # get '/doctors/:id', to: 'doctors#show'
  # get 'doctors/new', to: 'doctors#new'
  # post '/doctors', to: 'doctors#create'
  get '/doctors/destroy_all', to: 'doctors#destroy_all_doctors'
  resources :doctors, only: [:index, :show, :new, :create]
end
