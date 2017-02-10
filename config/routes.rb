Rails.application.routes.draw do
  root to: 'application#angular'

  resources :hosts #do
  resources :events#, :only
      #Putting in a member block makes it so our url parameters map to :id instead of :host_id
      #member do
      #end
    #end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
