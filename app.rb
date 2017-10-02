#!/usr/bin/env ruby

require 'sinatra'

class PayPallApp < Sinatra::Base
  get '/' do
    return 'It works!'
  end
end

if __FILE__ == $0
  PayPallApp.run!
end