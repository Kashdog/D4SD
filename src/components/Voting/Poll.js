import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Header from '../parts/Header';
import Audience from './Audience';
import Speaker from './Speaker';
import Board from './Board';
import Error404 from './Error404';
import { StaticRouter, Router, Route, Switch } from 'react-router-dom'
const NotFoundRoute = Router.NotFoundRoute;

axios.defaults.withCredentials = true;

const propTypes = {
  params: PropTypes.object.isRequired,
};

const contextTypes = {
  router: PropTypes.object,
};

const defaultProps = {
};

class Poll extends React.Component {
  state = { messages: [] }
    

  constructor(){
      super();
      this.state = {
        status: 'disconnected',
        title: '',
        member: {},
        audience: []
      }
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    let script = document.createElement("script");
        script.src = "https://code.jquery.com/jquery-1.9.1.min.js";
        document.head.appendChild(script);
        

  }

  emit = (eventName, payload) => {
      this.socket.emit(eventName, payload);
  }
  connect = () => {

    let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null ;

    if (member){
        this.emit('join', member);
    }

    this.setState({ status: 'connected'});
  }

  disconnect = () => {
    this.setState({ status: 'disconnected'});
  }

  welcome = (serverState) => {
    this.setState({ title: serverState.title });
  }

  joined = (member) => {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member: member});
  }

  updateAudience = (newAudience) => {
    this.setState({ audience: newAudience });
  }
  
  render() {
    return (
        <div>
            
            
            <Switch>
                <Route path='/' render={(props) => 
                    <Audience {...props} {...this.state} status={this.state.status} emit={this.emit}/>} 
                />
                <Route path='/speaker' render={(props) => 
                    <Speaker {...props} {...this.state} status={this.state.status} emit={this.emit}/>} 
                />
                <Route path='/board' render={(props) => 
                    <Board {...props} {...this.state} status={this.state.status} emit={this.emit}/>} 
                />
                <NotFoundRoute handler={Error404} />
            </Switch>
        </div>
    );
  }
}


Poll.propTypes = propTypes;
Poll.contextTypes = contextTypes;
Poll.defaultProps = defaultProps;

export default Poll;