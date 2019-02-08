import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.withCredentials = true;

const propTypes = {
  params: PropTypes.object.isRequired,
};

const contextTypes = {
  router: PropTypes.object,
};

const defaultProps = {
};

class CurrentUser extends React.Component {
  state = { messages: [], isLoggedIn: false }
    
  componentDidMount() {
    /*axios.create({withCredentials : true}).get('/api/loggedinstatus', {withCredentials: true})
    .then(res => {
        console.log(res);
        console.log(res.data);
    })*/
    axios('/api/loggedinstatus', { 
      method: 'get',
      withCredentials: true 
    })
    .then((response) => {
      console.log(response);
      const data = response.data;
      this.setState({ messages: data });
      if(response.data){
        this.setState({isLoggedIn: true});
      }
      console.log(this.state);
    })
  }
  
  render() {
    if (this.state.isLoggedIn){
      return (
        <div>
          <h1>Current User</h1>
          <h3>{this.state.messages}</h3>
        </div>
      );
    }
    else{
      return (
        <div>
          <h1>Current User</h1>
          <h3>No user logged in</h3>
        </div>
      );
    }
  }
}


CurrentUser.propTypes = propTypes;
CurrentUser.contextTypes = contextTypes;
CurrentUser.defaultProps = defaultProps;

export default CurrentUser;