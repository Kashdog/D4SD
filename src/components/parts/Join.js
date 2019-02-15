import React from 'react';
import ReactDOM from 'react-dom';

class Join extends React.Component {
    join = () => {
        //let memberName = ReactDOM.findDOMNode(this.refs.name).value;
        let memberName = "Welcome D4SD Voter!";
        this.props.emit('join', { name: memberName });
    }
    render() {
        return (
            <form action="javascript:void(0)" onSubmit={this.join}>
                <button className="btn btn-primary">Vote Now</button>
            </form>
        )
    }
}

export default Join;