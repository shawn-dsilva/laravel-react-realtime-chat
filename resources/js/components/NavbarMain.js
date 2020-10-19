import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import NotificationDropdown from './NotificationDropdown';
import { connect }from 'react-redux';
import PropTypes from "prop-types";
import { echoInit } from './utils/echoHelpers';

import { makeRequest, addNotification, acceptFriendRequest, getNotifications, addUserToDmList, getAllNotifications, markAsRead } from '../actions/chatActions';

class NavbarMain extends Component { 

  static propTypes = {

    makeRequest: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    addUserToDmList: PropTypes.func.isRequired,
    getAllNotifications: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
    unreadNotifs: PropTypes.number.isRequired,
    notifications: PropTypes.array.isRequired,
    allNotifications: PropTypes.array.isRequired,
    currUser: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired
  ,
  };

constructor(props) {
  super(props);
  this.state = {
    isOpen: false
  }

  this.myToken = localStorage.token;
  window.token = localStorage.LRC_Token;
}

componentDidMount () {


  // this.props.isAuth();
  // console.log(this.props.location.state.token);

  echoInit(this.myToken);
  this.props.getNotifications();
  this.eventChannel();
  this.notifChannel();

}

sendRequest = (id) =>{
  this.props.makeRequest(id)
}

acceptRequest = (id) =>{
  this.props.acceptFriendRequest(id)
}

notifChannel = () => {
  console.log("INSIDE NOTIF CHANNEL FUNCTION");
  let userId = this.props.currUser.id;
  console.log(userId);
  window.Echo.private(`App.User.${userId}`)
  .notification((notification) => {
    console.log("NOTIFICATION BELOW");
    console.log(notification);
    this.props.addNotification(notification);
  });
}

eventChannel = () => {
  window.Echo.join(`event.acceptRequest.${this.props.currUser.id}`).listen(
    "AcceptRequest",
    event => {
        console.log("ACCEPT REQUEST EVENT OUTPUT BELOW");
        console.log(event);
        this.props.addUserToDmList(event);
    }
);
}

onLogout = () => {

      const headers = {
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+this.myToken
        }
      };

      axios.get("/api/auth/logout", headers)
        .then((res) =>{
          if(res.status === 200) {
            window.Echo.disconnect();
            localStorage.removeItem("LRC_Token");
            // this.setState({
            //   redirect: true
            // })
            this.props.history.push("/login");
           }
        })
        .catch((err) => {
        });
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  })
}
render() {
  return (
    <div>
      <Navbar color="light" light expand="md" className="navCustom">
        <NavbarBrand href="/">Laravel React Chat</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <div className="ml-auto">
            <NotificationDropdown markAsRead={this.props.markAsRead}  notifications={this.props.notifications}
             allNotifications={this.props.allNotifications} acceptRequest={this.props.acceptFriendRequest}
              unreadNotifs={this.props.unreadNotifs} getAllNotifications={this.props.getAllNotifications} />
            </div>
          </Nav>
          <NavbarBrand color="dark">{this.props.username}</NavbarBrand>
        </Collapse>
      </Navbar>
    </div>
  );
}
  


}

const mapStateToProps = (state) => ({ //Maps state to redux store as props


  currUser:state.auth.currUser,
  notifications:state.chat.notifications,
  unreadNotifs: state.chat.unreadNotifs,
  allNotifications: state.chat.allNotifications
});

export default connect(mapStateToProps, { makeRequest, addNotification, acceptFriendRequest, getNotifications, addUserToDmList, getAllNotifications, markAsRead})(NavbarMain);