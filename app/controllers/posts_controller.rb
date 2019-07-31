class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def create
    post = Post.create(user_id: params[:user_id], content: params[:content])
    render json:post 
  end

end
