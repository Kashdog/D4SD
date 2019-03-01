import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements-universal';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import './stripe.css';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class _CardForm extends Component {
  state = {
    errorMessage: '',
    payed: false
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(({token}) => {
        console.log('Received Stripe token:', token);
      });
      console.log("success");
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  amount = 100;

  onToken = token => {
    console.log(this.amount);
    const body = {
      amount: this.amount,
      token: token
  };
  axios.post("/api/pay", body)
      .then(response => {
        console.log(response);
        this.setState({payed: true});
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  render() {
    return (
      <div className="CardDemo">
      <StripeCheckout
        amount={this.amount}
        label="Pay with 💳"
        description="Awesome Product"
        locale="auto"
        name=""
        stripeKey="pk_test_s36QFRzRzSsBFCbW6orqhS1j"
        token={this.onToken}
        zipCode
      />

      <h1 >{this.state.payed ? `You payed ${this.amount/100} USD` : 'Waiting for Payment'}</h1>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

export default class CardDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_s36QFRzRzSsBFCbW6orqhS1j">
        <Elements>
          <CardForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}