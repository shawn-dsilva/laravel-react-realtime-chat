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
  Col,
  UncontrolledTooltip,
} from 'reactstrap';
import NotificationDropdown from './NotificationDropdown';
import AllUsersList from './AllUsersList';
import AllChannelsList from './AllChannelsList';
import ImageUploadModal from './ImageUploadModal';
import { connect }from 'react-redux';
import PropTypes from "prop-types";
import { echoInit } from './utils/echoHelpers';

import { acceptRequest,  getNotifications, 
  getAllNotifications, markAsRead, j } from '../actions/chatActions';
import {logout} from '../actions/authActions';

class UserControlPanel extends Component { 

  static propTypes = {
    getNotifications: PropTypes.func.isRequired,
    getAllNotifications: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
    unreadNotifs: PropTypes.number.isRequired,
    notifications: PropTypes.array.isRequired,
    allNotifications: PropTypes.array.isRequired,
    currUser: PropTypes.object.isRequired,
    markAsRead: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    usersList: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
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


acceptRequest = (id) =>{
  this.props.acceptRequest(id)
}



onLogout = () => {

  this.props.logout();
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  })
}
render() {
  return (
    <Row className="userControlPanel">
           <Row className="userContainer">
           <UncontrolledTooltip placement="top" target="userProfile">
                    User Profile
                </UncontrolledTooltip>
             <div id="userProfile" className="userDetails">
           {
                  this.props.currUser.avatar ? 
                  <img src={"storage/"+this.props.currUser.avatar} className="dmAvatar"></img> : 
                  <img src="/assets/images/defaultuser.png" className="dmAvatar"></img>
                }
              <span>{this.props.currUser.name}</span>
              </div>
            <UncontrolledDropdown inNavbar >
            <div className="userOptions" id="userOptions">
              <DropdownToggle nav >
                <i class="fas fa-cog"></i>
                <UncontrolledTooltip placement="bottom" target="userOptions">
                    Options
                </UncontrolledTooltip>
              </DropdownToggle>
              </div>

              <DropdownMenu left>
                <DropdownItem>
                  <ImageUploadModal
                  currUser={this.props.currUser}
                            buttonLabel={"Change Avatar"}
                        /> 
                </DropdownItem>
                <DropdownItem onClick={this.onLogout}>
                <i class="fas fa-sign-out-alt"></i>  &nbsp;
                Logout
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
            </Row>

            <Row  className="notifContainer">
              <NotificationDropdown  markAsRead={this.props.markAsRead}  notifications={this.props.notifications}
             allNotifications={this.props.allNotifications} acceptRequest={this.props.acceptRequest}
              unreadNotifs={this.props.unreadNotifs} getAllNotifications={this.props.getAllNotifications}
              />
              </Row>
              <UncontrolledTooltip placement="bottom" target="notifications">
                    Notifications
                </UncontrolledTooltip>
            
          {/* </Nav>

        </Collapse>
      </Navbar> */}
      
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

export default connect(mapStateToProps, {   acceptRequest, getNotifications,  getAllNotifications, markAsRead,  logout})(UserControlPanel);