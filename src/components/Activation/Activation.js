import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  params: PropTypes.object.isRequired,
};

const contextTypes = {
  router: PropTypes.object,
};

const defaultProps = {
};

class Activation extends React.Component {
  state = { messages: [] }

  componentDidMount() {
    fetch(`/api/activation/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(messages => this.setState({ messages }));
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.state.messages.map(message =>
          <div>{message.message}</div>
        )}
      </div>
    );
  }
}


Activation.propTypes = propTypes;
Activation.contextTypes = contextTypes;
Activation.defaultProps = defaultProps;

export default Activation;