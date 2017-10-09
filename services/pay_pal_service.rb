class PaypalService
  class << self
    ##
    # Fetch request's details
    def fetch_details(token)
      request = client!
      request.details(token)
    end

    ##
    # Generate token with authorized payment token
    def authorize(amount:, currency: nil, description:, success_url:, cancel_url:)
      paypal_options = {
        no_shipping:   true, # if you want to disable shipping information
        allow_note:    false, # if you want to disable notes
        pay_on_paypal: true # if you don't plan on showing your own confirmation step
      }

      request         = client!
      payment_request = payment_request!(amount: amount, currency: currency, description: description)

      response        = request.setup(payment_request, success_url, cancel_url, paypal_options)
      yield response.token
      response.redirect_uri
    end

    ##
    # Checkout payment transaction
    def checkout(token:, payer_id:, amount:, currency: nil, description:)
      client!.checkout!(token, payer_id, payment_request!(amount: amount, currency: currency, description: description))
    end

    ##
    # Charge the holded money
    def charge(authorization_id, amount, currency)
      client!.capture!(authorization_id, amount, currency)
    end

    ##
    # Return back the money that we hold
    def refund(transaction_id, comment)
      client!.void!(transaction_id, note: comment)
    end

    ##
    # Generate payment request object
    def payment_request!(amount:, currency:, description:)
      Paypal::Payment::Request.new(
        currency_code: currency,   # if nil, PayPal use USD as default
        description:   description,    # item description
        amount:        amount,
        item: [{
          name: description,
          description: description,
          amount: amount
        }],
        custom_fields: {
          CARTBORDERCOLOR: '000000',
          LOGOIMG:         'https://pickapaw.com/images/pickapaw_logo.png'
        }
      )
    end

    ##
    # Create authorized paypal client
    def client!
      Paypal.sandbox! unless Sinatra::Base.production?
      Paypal::Express::Request.new(
        username:  PayPallApp.settings.paypal['username'],
        password:  PayPallApp.settings.paypal['password'],
        signature: PayPallApp.settings.paypal['signature']
      )
    end
  end
end
