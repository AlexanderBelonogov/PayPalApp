#!/usr/bin/env ruby

require 'sinatra'

class PayPallApp < Sinatra::Base
  set :haml, format: :html5

  get '/' do
    haml :index
  end

  get '/works' do
    @title = 'Why It Works?'
    haml :works
  end

  get '/help' do
    @title = 'Help'
    haml :help
  end

  get '/contact' do
    @title = 'Contact'
    haml :contact
  end

  get '/rules' do
    @title = 'Terms of Service'
    haml :rules
  end
end

if __FILE__ == $0
  PayPallApp.run!
end
