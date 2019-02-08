import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter, Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import store from './store'
import Signup from './components/Signup/signup'
import Login from './components/LogIn/Login'
import Activation from './components/Activation/Activation'
import Facebook from './components/Facebook/Facebook'
import CurrentUser from './components/CurrentUser/CurrentUser'
import Signin from './components/Signin/Signin'
import { createMemoryHistory } from 'history';


const history = createMemoryHistory();

class App extends Component {


  render () {
    return (
      <Provider store={ store }>
          <div className="App">
              <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Link to='/signin' className="active">Log In Here</Link>
            </header>
            <CurrentUser />
            <Switch>
              <Route path="/signin" component={Signin} />
              <Route path="/activation/:id" component={Activation} />
            </Switch>
          </div>
      </Provider>
    )
  }
}

export default App

