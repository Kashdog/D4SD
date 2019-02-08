import React, { Component } from 'react'
import Signup from '../../components/Signup/signup'
import Login from '../LogIn/Login'
import Facebook from '../../components/Facebook/Facebook'
import { createMemoryHistory } from 'history';


const history = createMemoryHistory();

class Signin extends Component {


  render () {
    return (
        <div>
        <div class="row">
            <div class="col-sm-4">
            <h1> Sign Up :</h1>
            <Signup />
            </div>
            <div class="col-sm-4">
            <h1> Login here: </h1>
            <Login />
            </div>
        </div>
        
        
        <h1> Logout Here </h1>
        <a href="/logout"><button>Log Out</button></a>
        <h1> Google Login</h1>
        <a href="/auth/google"><button>Google Login</button></a>
        <h1> Facebook Login </h1>
        <Facebook />
        </div>
    )
  }
}

export default Signin

