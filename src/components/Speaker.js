import React from 'react';

class Speaker extends React.Component {
    render() {
		return (<h1>Speaker : {this.props.status}</h1>);
	}
}

export default Speaker;