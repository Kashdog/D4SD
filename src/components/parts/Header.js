import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Header.css';

axios.defaults.withCredentials = true;

const propTypes = {
  params: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const contextTypes = {
  router: PropTypes.object,
};

const defaultProps = {
    status: 'disconnected'
};

class Header extends React.Component {
  state = { messages: [] }

  render() {
    return (
        <header>
            <h1>{this.props.title}</h1>
            <span id="connection-status" className={this.props.status}></span>
        </header>
    );
  }
}


Header.propTypes = propTypes;
Header.contextTypes = contextTypes;
Header.defaultProps = defaultProps;

export default Header;