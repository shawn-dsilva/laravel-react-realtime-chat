
    import React, { Component } from 'react'
    import {
      Button,
      InputGroup,
      InputGroupAddon,
      Input,
      Container,
      Row,
      Col
    } from 'reactstrap';
import { connect }from 'react-redux';
import PropTypes from "prop-types";
import {  getDmUsers, getChannels, getMessages, dmSelectAction, channelSelect, makeRequest, addNotification, acceptFriendRequest, getUsersList, getNotifications, addUserToDmList, getAllNotifications, markAsRead } from '../actions/chatActions';
import { echoInit, sendMessage } from './utils/echoHelpers';
import ChatMessageList from './ChatMessageList';
import ChatDmUsersList from './ChatDmUserList';
import AllUsersList from './AllUsersList';

import ChatChannelsList from './ChatChannelsList';
import ChatRoomUsersList from './ChatRoomUsersList';
import CreateChannelModal from './CreateChannelModal';
import '../../css/custom.css';
import NotificationDropdown from './NotificationDropdown';
import NavbarMain from './NavbarMain';

    class Chat extends Component {

        state = {
          messages:[],
          message:"",
          users: [],
          allUsers: [],
          currUser:"",
          selectedChannel:""

      }

      static propTypes = {
        // isAuth: PropTypes.func.isRequired,
        getDmUsers: PropTypes.func.isRequired,
        getChannels: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired,
        dmSelectAction: PropTypes.func.isRequired,
        makeRequest: PropTypes.func.isRequired,
        getNotifications: PropTypes.func.isRequired,
        addUserToDmList: PropTypes.func.isRequired,
        getAllNotifications: PropTypes.func.isRequired,
        acceptFriendRequest: PropTypes.func.isRequired,
        channelSelect: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
        unreadNotifs: PropTypes.number.isRequired,
        messages: PropTypes.array.isRequired,
        notifications: PropTypes.array.isRequired,
        allNotifications: PropTypes.array.isRequired,
        usersInRoom: PropTypes.array.isRequired,
        dmUsers: PropTypes.array.isRequired,
        message: PropTypes.object.isRequired,
        currUser: PropTypes.object.isRequired,
        selectedChannel: PropTypes.object.isRequired,
        usersList: PropTypes.array.isRequired,
        markAsRead: PropTypes.func.isRequired
,
      };


      constructor(props) {
        super(props);
        this.myToken = localStorage.token;
        window.token = localStorage.LRC_Token;
        this.fakeGeneralChannel = { "id": 5, "type": "channel"};
        this.dmSelect = this.dmSelect.bind(this);

    }

      componentDidMount () {


          // this.props.isAuth();
          // console.log(this.props.location.state.token);

          echoInit(this.myToken);

          this.props.getDmUsers();
          this.props.getUsersList();
          this.props.getChannels();
          this.props.getNotifications();
          this.eventChannel();
          this.channelSelect(this.fakeGeneralChannel);
          this.notifChannel();


      }

      dmSelect(id){
        this.props.dmSelectAction(id)
      }

      sendRequest = (id) =>{
        this.props.makeRequest(id)
      }

      acceptRequest = (id) =>{
        this.props.acceptFriendRequest(id)
      }

      channelSelect = (selectedChannel, event) => {
        if(event !== undefined) {
          event.stopPropagation();
        }
        this.props.channelSelect(selectedChannel);
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

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };

      // Calls action to register user
      sendMessageWrapper = (e) => {
        e.stopPropagation();
        console.log(this.state.message);
        sendMessage(this.state.message, this.props.selectedChannel.id, this.props.selectedChannel.type)
        this.setState({ message:'' });

      }

      render () {
        return (
          <Container fluid="true" >
               <Row> <Col><NavbarMain notifications={this.props.notifications} allNotifications={this.props.allNotifications} acceptRequest={this.acceptRequest} unreadNotifs={this.props.unreadNotifs} username={this.props.currUser.name} getAllNotifications={this.props.getAllNotifications}/></Col></Row>
               <Row className="fullHeight">
   
            <Col xs="2" className="sidenav">
              <h3>Channels</h3>
               <Col> <Button color="link" onClick={this.channelSelect.bind(this, this.fakeGeneralChannel)} id="5" key="5"><b> General</b></Button>
               <ChatChannelsList channels={this.props.channels} currUser={this.props.currUser} channelSelect={this.channelSelect} />

               <CreateChannelModal buttonLabel={"+ Create New Channel"}/>
          <br></br>
          </Col>
                <h3>Direct Message</h3>
                <ChatDmUsersList dmUsers={this.props.dmUsers} currUser={this.props.currUser} dmSelect={this.dmSelect} />
                <AllUsersList dmUsers={this.props.usersList} currUser={this.props.currUser} sendRequest={this.sendRequest} />

          </Col>
              <Col xs="7" className="chatMainContainer">
              <h1>Chat Homepage</h1>
                {/* <Button onClick={this.onLogout}>Logout</Button> */}
                <div className="text-right">
                {/* <NotificationDropdown notifications={this.props.notifications} acceptRequest={this.acceptRequest} unreadNotifs={this.props.unreadNotifs}/> */}
                </div>
                    <ChatMessageList messages={this.props.messages} currUser={this.props.currUser}/>
                    <Row className="chatInput">
              <InputGroup  >
                <Input onChange={this.onChange} id="message" value={this.state.message}name="message" />
                  <InputGroupAddon addonType="append"><Button onClick={this.sendMessageWrapper}>Send </Button></InputGroupAddon>
                </InputGroup>
                </Row>
              </Col>
            <ChatRoomUsersList usersInRoom={this.props.usersInRoom}/>
            </Row>
          </Container>
        )
      }
    }

    const mapStateToProps = (state) => ({ //Maps state to redux store as props

      authState: state.auth,
      messages:state.chat.messages,
      message:state.chat.message,
      usersInRoom: state.chat.usersInRoom,
      dmUsers: state.chat.dmUsers,
      channels: state.chat.channels,
      currUser:state.auth.currUser,
      selectedChannel:state.chat.selectedChannel,
      notifications:state.chat.notifications,
      unreadNotifs: state.chat.unreadNotifs,
      usersList: state.chat.usersList,
      allNotifications: state.chat.allNotifications
    });
    export default connect(mapStateToProps, {getDmUsers, getChannels, getMessages,dmSelectAction, channelSelect, makeRequest, addNotification, acceptFriendRequest, getUsersList, getNotifications, addUserToDmList, getAllNotifications, markAsRead})(Chat);