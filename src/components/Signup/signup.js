import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {
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

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/api/signup', { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
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
          <label>
            Confirm Password:
            <input type="password" name="confirmpassword"  />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}