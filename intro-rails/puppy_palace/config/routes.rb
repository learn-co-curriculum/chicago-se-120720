Rails.application.routes.draw do
  # get 'puppies', to: "puppies#index"
  # get 'puppies/new'
  # get 'puppies/:id', to: "puppies#show"
  resources :handlers do
    resources :puppies
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/", to: "application#home"
end
