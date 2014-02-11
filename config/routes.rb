PortfolioWebsite::Application.routes.draw do
  root :to => "static_pages#index"
  
  resource :static_pages, :only => [:index] do
    get :snake, :on => :collection
    get :ttt, :on => :collection
    get :toh, :on => :collection
  end
end
