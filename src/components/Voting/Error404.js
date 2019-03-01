import React from 'react';
import Router from 'react-router';
import {Link} from 'react-router-dom';

class Error404 extends React.Component{
    render() {
		return (
			<div id="not-found">
				<h1>Error</h1>
				<p>We cannot find the page that you have requested.
				   Were you looking for one of these: </p>

				<Link to="/">Join as Audience</Link>
				<Link to="/speaker">Start the presentation</Link>
				<Link to="/board">View the board</Link>
				
			</div>
		);
	}
}

export default Error404;