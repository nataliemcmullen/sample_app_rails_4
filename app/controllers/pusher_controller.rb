class PusherController < ApplicationController
  protect_from_forgery :except => :auth # stop rails CSRF protection for this action

  def auth
	channel = Pusher['presence-cody']
    session[:user_id] ||= rand(1000000)
    if current_user
      response = channel.authenticate(params[:socket_id], {
        :user_id => session[:user_id],
        :user_info => {
        	:name => current_user.name,
        }
      })
      render :json => response
    #Allowing people to enter the cookie queue without being logged in 
    else
      response = channel.authenticate(params[:socket_id], {
        :user_id => session[:user_id],
        :user_info => {}
      })
      render :json => response
    end
  end
end