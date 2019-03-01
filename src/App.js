import React, { Component } from 'react';
import { Provider } from 'react-redux';
//import { BrowserRouter } from 'react-router-dom';
import { StaticRouter, Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './components/Stripe/stripe.css';
import store from './store';
//import Signup from './components/Signup/signup';
// import Login from './components/LogIn/Login';
import Activation from './components/Activation/Activation';
// import Facebook from './components/Facebook/Facebook';
import CurrentUser from './components/CurrentUser/CurrentUser';
import Signin from './components/Signin/Signin';
import Poll from './components/Voting/Poll';
import Entry from './components/Entry';
import Submission from './components/SubmissionPage/Submission';
//NOTE: We will fill in submission, team search all under Submission page. Want to run as a js not a new link
import { createMemoryHistory } from 'history';
// import {Elements, StripeProvider} from 'react-stripe-elements-universal';
import CardDemo from './components/Stripe/CardDemo';

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
              <Link to='/submission' classname="active">Submission Page</Link>
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
              <Route path="submission" component={Submission} />
              <Route redirectTo="/signin"/>
            </Switch>
          </div>
      </Provider>
    )
  }
}


// TODO Fix redirection
export default App

