import React from 'react';
import axios from 'axios';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';

class SearchEmail extends React.Component {

    state = {
        email : ''
    };

    handleChange=e=>{
      this.setState({
        email: e.target.value
    })
    
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        let email = {
            email: this.state.email
        };
        if (!validator.isEmail(email.email)){
            toast("Not valid email");
            return;
        }
        
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/searchuser',
            data: email,
            })
        .then((res) => {
            toast(res.data.message);
        })
    }

    render() {
        return (
        <div>
            <h1>Search Email</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" onChange={this.handleChange}/>
                <button type="submit">Search</button>
            </form>
            <ToastContainer autoClose={800}/>
        </div>
        
        );
	}
}

export default SearchEmail;