import React, { Component } from "react";
import { connect } from "react-redux";
// import { isAuth } from "../../actions/authActions";
// import HomePage from '../HomePage';
// import Profile from '../Profile';
// import ListPage from '../ListPage';
// import SingleList from '../SingleList';
import { withRouter, Switch} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteIfAuth from './ProtectedRouteIfAuth';
import LoadingSpinner from '../LoadingSpinner';
import PropTypes from 'prop-types';

// import Error404 from '../Error404';
import Chat from "../Chat";



export class MainRouter extends Component {
  // authChecker = () => {
  //   isAuth().then(() => {
  //     // if(this.props.isAuthenticated === true ) {
  //     //   const isAuthenticated = true;
  //     //   return isAuthenticated;
  //     //   }
  //     return this.props.isAuthenticated
  //   });
  // };

  // static propTypes = {
  //   isAuthenticated: PropTypes.bool.isRequired,

  // }

  render() {
    console.log(this.props.auth.isAuthenticated);
    console.log(this.props.isAuthenticated);

    if(this.props.isAuthenticated === true || this.props.isAuthenticated === false) {
    return (
      <Switch>
        {/* <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/profile"
          component={Profile}
        /> */}
        <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/chat"
          component={Chat}
        />
        {/* <ProtectedRoute
          isAuthenticated={this.props.isAuthenticated}
          exact
          path="/listpage/:listId"
          component={SingleList}
        /> */}
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} exact path="/(|login|register)/" component={Chat} />
        <ProtectedRouteIfAuth isAuthenticated={this.props.isAuthenticated} exact path="/" component={Chat} />

        {/* <Route component={Error404}/> */}
      </Switch>
    );
    } else {
      return <LoadingSpinner/>
    }
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(withRouter(MainRouter));
