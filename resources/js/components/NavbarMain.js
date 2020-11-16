import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText, 
  Row,
  Col
} from 'reactstrap';
import NotificationDropdown from './NotificationDropdown';
import AllUsersList from './AllUsersList';
import AllChannelsList from './AllChannelsList';

import { connect }from 'react-redux';
import PropTypes from "prop-types";
import { echoInit } from './utils/echoHelpers';

import { makeRequest, acceptRequest,  getNotifications, 
  getAllNotifications, markAsRead, joinChannelRequest } from '../actions/chatActions';

class NavbarMain extends Component { 

  static propTypes = {

    makeRequest: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    getAllNotifications: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    unreadNotifs: PropTypes.number.isRequired,
    notifications: PropTypes.array.isRequired,
    allNotifications: PropTypes.array.isRequired,
    currUser: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired,
    usersList: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
    joinChannelRequest: PropTypes.func.isRequired,
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
}

sendRequest = (id) =>{
  this.props.makeRequest(id)
}

joinChannelRequestWrapper = (id, type) => {
  this.props.joinChannelRequest(id, type)
}

acceptRequest = (id) =>{
  this.props.acceptRequest(id)
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
    <Row> <Col>
      <Navbar color="light" light expand="md" className="navCustom">
        <NavbarBrand href="/">Laravel React Chat</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
            <AllUsersList
                            dmUsers={this.props.usersList}
                            currUser={this.props.currUser}
                            sendRequest={this.sendRequest}
                        />            </NavItem>
            <NavItem className="pl-3">
            <AllChannelsList
                            channels={this.props.allChannels}
                            currUser={this.props.currUser}
                            joinChannelRequest={this.joinChannelRequestWrapper}
                        /> 
            </NavItem>
            <div className="ml-auto">
            <NotificationDropdown markAsRead={this.props.markAsRead}  notifications={this.props.notifications}
             allNotifications={this.props.allNotifications} acceptRequest={this.props.acceptRequest}
              unreadNotifs={this.props.unreadNotifs} getAllNotifications={this.props.getAllNotifications} />
            </div>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <NavbarBrand>
              {this.props.currUser.name}
              </NavbarBrand>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.onLogout}>
                Logout
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        </Collapse>
      </Navbar>
      </Col>
      </Row>
  );
}
  


}

const mapStateToProps = (state) => ({ //Maps state to redux store as props


  currUser:state.auth.currUser,
  notifications:state.chat.notifications,
  unreadNotifs: state.chat.unreadNotifs,
  allNotifications: state.chat.allNotifications,
  usersList: state.chat.usersList,
  channels: state.chat.channels,
  allChannels: state.chat.allChannels,
});

export default connect(mapStateToProps, { makeRequest,  acceptRequest, getNotifications,  getAllNotifications, markAsRead, joinChannelRequest})(NavbarMain);