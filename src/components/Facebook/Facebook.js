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

class Facebook extends React.Component {
  state = { messages: [] }

  render() {
    return (
      <div>
        <a href="/flogin"><button>Facebook Login</button></a>
      </div>
    );
  }
}


Facebook.propTypes = propTypes;
Facebook.contextTypes = contextTypes;
Facebook.defaultProps = defaultProps;

export default Facebook;