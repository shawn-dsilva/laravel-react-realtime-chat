import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Landing from './Landing';
import Chat from './Chat';

import { connect } from "react-redux";
import LoadingSpinner from './LoadingSpinner';
import ProtectedRoute from './router/ProtectedRoute';
import ProtectedRouteIfAuth from './router/ProtectedRouteIfAuth';

export class Main extends Component {
  render() {
    console.log(this.props.isAuthenticated);
    if(this.props.isAuthenticated === true || this.props.isAuthenticated === false) {
    return (
      <Switch>
        <ProtectedRoute isAuthenticated={this.props.isAuthenticated} exact path="/chat" component={Chat} />
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} exact path="/" component={Home} />
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} exact path="/login" component={Login} />
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} exact path="/register" component={Register} />

      </Switch>
    )
    } else {
      return <LoadingSpinner/>

    }
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth.user
});

export default connect(mapStateToProps)(Main);
