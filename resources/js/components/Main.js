import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Chat from './Chat';


export class Main extends Component {
  render() {
    return (
      <div>
      <Switch>
        <Route exact path ="/" component={Landing}/>
        <Route exact path ="/chat" component={Chat}/>
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/register" component={Register}/>
      </Switch>
      </div>
    )
  }
}

export default Main
