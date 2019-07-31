Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
post '/users', to:'users#create'
get '/posts', to: 'posts#index'
post '/posts', to: 'posts#create'

post '/login', to: 'users#login'

end
