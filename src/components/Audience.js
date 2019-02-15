import React from 'react';
import PropTypes from 'prop-types';
import Display from './parts/Display';
import Join from './parts/Join';
import DefaultCarousel from './EntryVote';
import './Audience.css';

const propTypes = {
  params: PropTypes.object.isRequired,
};

const contextTypes = {
  router: PropTypes.object,
};

const defaultProps = {
};

class Audience extends React.Component {

  componentDidMount(){
  }
  
  render() {
    console.log(this.props);
    

    return (
        <div>
          <Display if={this.props.member.name}>
            <h2>Welcome {this.props.member.name}</h2>
            <p>{this.props.audience.length} audience members connected</p> 
            <DefaultCarousel />,

          </Display>
          <Display if={!this.props.member.name}>
						<h1>Vote on an Entry!</h1>
					    <Join emit={this.props.emit} />
					</Display>
        </div>
    );
  }
}


Audience.propTypes = propTypes;
Audience.contextTypes = contextTypes;
Audience.defaultProps = defaultProps;

export default Audience;