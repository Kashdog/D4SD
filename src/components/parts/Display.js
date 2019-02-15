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

class Display extends React.Component {

  render() {
    return (
        (this.props.if) ? <div>{this.props.children}</div> : null
    );
  }
}


Display.propTypes = propTypes;
Display.contextTypes = contextTypes;
Display.defaultProps = defaultProps;

export default Display;