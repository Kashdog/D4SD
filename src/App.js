import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter, Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import './components/stripe.css';
import store from './store'
import Signup from './components/Signup/signup'
import Login from './components/LogIn/Login'
import Activation from './components/Activation/Activation'
import Facebook from './components/Facebook/Facebook'
import CurrentUser from './components/CurrentUser/CurrentUser'
import Signin from './components/Signin/Signin'
import Poll from './components/Poll/Poll';
import Entry from './components/Entry';
import { createMemoryHistory } from 'history';
import {Elements, StripeProvider} from 'react-stripe-elements-universal';
import CardDemo from './components/CardDemo';

const history = createMemoryHistory();

class App extends Component {


  render () {
    return (
      <Provider store={ store }>
          <div className="App">
              <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Link to='/signin' className="active">Log In Here</Link>
              <Link to='/create' className="active">Create an Entry</Link>
            </header>
            <CurrentUser />
            <div className="CardContainer">
              <CardDemo />
            </div>
            <Switch>
              <Route path="/signin" component={Signin} />
              <Route path="/activation/:id" component={Activation} />
              <Route path="/poll" component={Poll} />
              <Route path="/create" component={Entry} />

              <Route redirectTo="/home"/>
            </Switch>
          </div>
      </Provider>
    )
  }
}

export default App

