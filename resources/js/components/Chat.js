
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
import { isAuth, getDmUsers, getMessages, dmSelectAction, channelSelect } from '../actions/chatActions';
import { echoInit, sendMessage } from './utils/echoHelpers';
import ChatMessageList from './ChatMessageList';
import ChatDmUsersList from './ChatDmUserList';
import ChatRoomUsersList from './ChatRoomUsersList';


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
        isAuth: PropTypes.func.isRequired,
        getDmUsers: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired,
        dmSelectAction: PropTypes.func.isRequired,
        channelSelect: PropTypes.func.isRequired,

        messages: PropTypes.array.isRequired,
        usersInRoom: PropTypes.array.isRequired,
        dmUsers: PropTypes.array.isRequired,
        message: PropTypes.object.isRequired,
        currUser: PropTypes.object.isRequired,
        selectedChannel: PropTypes.object.isRequired
,
      };


      constructor(props) {
        super(props);
        this.myToken = localStorage.LRC_Token;
        window.token = localStorage.LRC_Token;
        this.fakeGeneralChannel = { "id": 5, "type": "channel"};
        this.dmSelect = this.dmSelect.bind(this);

    }

      componentDidMount () {


          this.props.isAuth();

          echoInit(this.myToken);

          this.props.getDmUsers();

          this.channelSelect(this.fakeGeneralChannel);



      }

      dmSelect(id){
        this.props.dmSelectAction(id)
      }

      channelSelect = (selectedChannel, event) => {
        if(event !== undefined) {
          event.stopPropagation();
        }
        this.props.channelSelect(selectedChannel);
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
        sendMessage(this.state.message, this.props.selectedChannel.id)
        this.setState({ message:'' });

      }

      render () {
        return (
          <div>
          <Container fluid="true">
             <Row>
            <Col xs="3">
              <h3>Channels</h3>
               <Col> <Button onClick={this.channelSelect.bind(this, this.fakeGeneralChannel)} id="5" key="5"><b> General</b></Button>
          <br></br>
          </Col>
                <h3>Direct Message</h3>
                <ChatDmUsersList dmUsers={this.props.dmUsers} currUser={this.props.currUser} dmSelect={this.dmSelect} />
          </Col>
              <Col xs="6">
                <h1>Chat Homepage</h1>
                <Button onClick={this.onLogout}>Logout</Button>
                    <ChatMessageList messages={this.props.messages}/>
                  <InputGroup>
                <Input onChange={this.onChange} id="message" value={this.state.message}name="message" />
                  <InputGroupAddon addonType="append"><Button onClick={this.sendMessageWrapper}>Send </Button></InputGroupAddon>
                </InputGroup>
              </Col>
            <ChatRoomUsersList usersInRoom={this.props.usersInRoom}/>
            </Row>
          </Container>
          </div>
        )
      }
    }

    const mapStateToProps = (state) => ({ //Maps state to redux store as props

      authState: state.auth,
      messages:state.chat.messages,
      message:state.chat.message,
      usersInRoom: state.chat.usersInRoom,
      dmUsers: state.chat.dmUsers,
      currUser:state.chat.currUser,
      selectedChannel:state.chat.selectedChannel

    });
    export default connect(mapStateToProps, {isAuth, getDmUsers, getMessages,dmSelectAction, channelSelect})(Chat);