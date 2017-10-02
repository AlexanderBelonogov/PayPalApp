#!/usr/bin/env ruby

require 'sinatra'

class PayPallApp < Sinatra::Base
  set :haml, format: :html5

  get '/' do
    haml :index
  end
end

if __FILE__ == $0
  PayPallApp.run!
end