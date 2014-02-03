class StaticPagesController < ApplicationController
  def index
    render :index
  end
  
  def snake
    render :snake
  end
  
  def ttt
    render :ttt
  end
end
