
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
import {  getDmUsers, getChannels, getMessages, dmSelectAction, channelSelect, getUsersList} from '../actions/chatActions';
import { echoInit} from './utils/echoHelpers';
import ChatMessageList from './ChatMessageList';
import ChatDmUsersList from './ChatDmUserList';
import AllUsersList from './AllUsersList';
import ChannelDescDropdown from './ChannelDescDropdown';
import ChatChannelsList from './ChatChannelsList';
import ChatRoomUsersList from './ChatRoomUsersList';
import '../../css/custom.css';
import NavbarMain from './NavbarMain';
import ChatInputBox from './ChatInputBox';
import InviteUsersModal from './InviteUsersModal';

    class Chat extends Component {

        state = {
          messages:[],
          users: [],
          allUsers: [],
          currUser:"",
          selectedChannel:""

      }

      static propTypes = {
        getDmUsers: PropTypes.func.isRequired,
        getChannels: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired,
        dmSelectAction: PropTypes.func.isRequired,
        channelSelect: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        usersInRoom: PropTypes.array.isRequired,
        dmUsers: PropTypes.array.isRequired,
        message: PropTypes.object.isRequired,
        currUser: PropTypes.object.isRequired,
        selectedChannel: PropTypes.object.isRequired,
        usersList: PropTypes.array.isRequired,
      };


      constructor(props) {
        super(props);
        this.myToken = localStorage.token;
        window.token = localStorage.LRC_Token;
        this.fakeGeneralChannel = 5;
        this.dmSelect = this.dmSelect.bind(this);

    }

      componentDidMount () {


          // this.props.isAuth();
          // console.log(this.props.location.state.token);

          echoInit(this.myToken);

          this.props.getDmUsers();
          this.props.getUsersList();
          this.props.getChannels();
          this.channelSelect(this.fakeGeneralChannel, 'General', 'A public channel where all users can chat');


      }

      dmSelect(id, name){
        this.props.dmSelectAction(id, name)
      }


      channelSelect = (selectedChannel, channelName, desc,  owner_id, owner, event) => {
        if(event !== undefined) {
          event.stopPropagation();
        }
        this.props.channelSelect(selectedChannel, channelName, desc, owner_id, owner);
      }

      

      render () {
        return (
            <Container fluid="true">
                <NavbarMain />
                <Row className="fullHeight">
                    <Col xs="2" className="sidenav">
                        <ChatChannelsList
                            channels={this.props.channels}
                            currUser={this.props.currUser}
                            channelSelect={this.channelSelect}
                        />

                        <ChatDmUsersList
                            dmUsers={this.props.dmUsers}
                            currUser={this.props.currUser}
                            dmSelect={this.dmSelect}
                        />
                    </Col>
                    <Col xs="7" className="chatMainContainer">
        <div className="channelName">{this.props.selectedChannel.type ==  'channel' ? 
        <span style={{fontWeight:"900", textTransform: 'uppercase', fontSize:"1.8rem", color:"orange"}}> Channel # </span> : 
        <span style={{fontWeight:"900", textTransform: 'uppercase', fontSize:"1.8rem", color:"blue"}}>User @ </span> }
          {this.props.selectedChannel.name}
          <ChannelDescDropdown desc={this.props.selectedChannel.desc}/>
          { this.props.currUser.id == this.props.selectedChannel.owner_id ? <InviteUsersModal buttonLabel={'+ Invite Users'}  dmUsers={this.props.dmUsers} currUser={this.props.currUser} /> : null}
          
          </div>

                        <ChatMessageList
                            messages={this.props.messages}
                            currUser={this.props.currUser}
                        />
                        <ChatInputBox
                            selectedChannel={this.props.selectedChannel}
                        />
                    </Col>
                    <ChatRoomUsersList usersInRoom={this.props.usersInRoom} />
                </Row>
            </Container>
        );
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
      usersList: state.chat.usersList,
    });
    export default connect(mapStateToProps, {getDmUsers, getChannels, getMessages,dmSelectAction, channelSelect,  getUsersList})(Chat);