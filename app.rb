#!/usr/bin/env ruby

require 'sinatra'
require 'pry'
require 'paypal'
require 'sinatra/config_file'
require 'sinatra/required_params'
require 'sinatra/cookies'
require 'sysrandom/securerandom'
require './services/pay_pal_service'
require 'sinatra/custom_logger'
require 'logger'

class PayPallApp < Sinatra::Base
  register Sinatra::ConfigFile
  helpers Sinatra::RequiredParams
  helpers Sinatra::Cookies
  helpers Sinatra::CustomLogger
  DESCRIPTION = 'Transaction for adding %s to %s'

  set :haml, format: :html5
  set :logging, true
  set :session_secret, ENV.fetch('SESSION_SECRET') { SecureRandom.hex(64) }

  configure :development, :production do
    logger = Logger.new(File.open("#{root}/log/#{environment}.log", 'a+'))
    logger.formatter = proc do |severity, datetime, progname, msg|
      date_format = datetime.strftime("%Y-%m-%d %H:%M:%S")
      "[#{self}] - #{date_format} - #{severity.to_s.ljust(6)}: #{msg}\n"
    end
    logger.level = Logger::DEBUG if development?
    set :logger, logger
  end

  config_file "#{Dir.getwd}/config.yml"

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

  post '/pay' do
    # params[:type]
    # like or follower
    # params[:count] - count followers or likes
    required_params :amount, :type, :plan

    prefix = params[:type] == 'followers' ? params[:link_inst_followers] : params[:link_inst].join(" ")
    description = DESCRIPTION % [params[:plan], prefix]

    attr = {
      amount: params[:amount],
      description: description,
      success_url: "#{request.base_url}/success",
      cancel_url: request.base_url
    }
    redirect to PaypalService.authorize(attr) { |token| cookies[token] = attr.to_json }
  end

  get '/success' do
    required_params :token, :PayerID
    token = params[:token]
    amount, description = JSON.parse(cookies[token]).values_at('amount', 'description')
    PaypalService.checkout(token: token, payer_id: params[:PayerID], amount: amount, description: description)
    @title = 'After Payment'
    haml :success, layout: false
  end
end

if __FILE__ == $0
  PayPallApp.run!
end
