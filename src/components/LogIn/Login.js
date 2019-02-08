import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

  
    const email = this.state.email;
    const password = this.state.password;

    /*axios.create({withCredentials : true}).post('/api/login', { email, password })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      */

     axios({
      method: 'post',
      url: '/api/login',
      data: {
        email,
        password
      },
      withCredentials: true 
    })
    .then( (response) => {
      console.log(response);
      if (response.data.status === "success" && window){ 
        window.location.href="/"; 
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}