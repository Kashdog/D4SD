// MyStoreCheckout.js
import React from 'react';
import {Elements} from 'react-stripe-elements-universal';
import './stripe.css';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default MyStoreCheckout;