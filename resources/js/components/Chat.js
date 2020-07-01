
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
    import Echo from 'laravel-echo'
import connect from 'react-redux/lib/connect/connect';

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
        getList: PropTypes.func.isRequired,
        getSingleList: PropTypes.func.isRequired,
        deleteOneList: PropTypes.func.isRequired,
        authState: PropTypes.object.isRequired,
        messages: PropTypes.array.isRequired,
        users: PropTypes.array.isRequired,
        allUsers: PropTypes.array.isRequired,
        message: PropTypes.object.isRequired,
        currUser: PropTypes.object.isRequired,
        selectedChannel: PropTypes.object.isRequired
,
      };


      constructor(props) {
        super(props);
        this.myToken = localStorage.getItem("LRC_Token");
        this.fakeGeneralChannel = { "id": 5, "type": "channel"};
    }

      componentDidMount () {



          axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.myToken;

          axios.get("/api/auth/user")
          .then((res) =>{
            // if(res.status === 201) {
              console.log(res.data);
              this.setState({
                currUser:  res.data
              });

            // }
          })
          .catch((err) => {

          });


          window.Pusher = require('pusher-js');


          window.Echo = new Echo({
              broadcaster: 'pusher',
              key: process.env.MIX_PUSHER_APP_KEY,
              wsHost: window.location.hostname,
              wsPort: 6001,
              disableStats: true,
              forceTLS: false
          });

          window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + this.myToken
          window.Echo.options.auth = {
            headers: {
                Authorization: 'Bearer ' + this.myToken,
            },
          }

          window.Echo.join('chat');

            const headers = {
              headers: {
                "Authorization":"Bearer "+this.myToken
              }
            };

            axios.get("/api/allusers", headers)
              .then((res) =>{
                console.log(res.data);
                const users = res.data;
                this.setState({
                  allUsers: [...this.state.allUsers, ...users ]
                });
              })
              .catch((err) => {
              });

              this.channelSelect(this.fakeGeneralChannel);
      }

      messageList() {
        const messages = this.state.messages;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="my-3" key={index} sm="6" md={{size: 8, offset: 3}}><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            return <Col key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</Col>
          }
        });

        return messagelist;
      }


      userList() {
        const users = this.state.users;
        // console.log(typeof(users));

        const userList = users.map((value, index) => {
          console.log(value)
          return <li key={index}><b>{value.name }</b></li>
        });

        return userList;
      }

      allUserList() {
        console.log("CURRENT USER BELOW ");
        console.log(this.state.currUser);
        const users = this.state.allUsers.filter(u => u.id !== this.state.currUser.id);
        // console.log(typeof(users));

        const userList = users.map((value, index) => {
          return <Col key={index}> <Button onClick={this.dmSelect.bind(this, value.id)} id={value.id} ><b>{value.name }</b></Button>
          <br></br>
          </Col>
        });

        return userList;
      }

      dmSelect = (id, event ) => {
        event.stopPropagation();
        console.log(id);
        window.Echo.leave('chat.channel.5');
        const body = `{ "receiver": ${id} }`;

        const headers = {
          headers: {
            "Content-Type": "application/json"
          }
        };


        axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.myToken;

        console.log(body);
        axios
          .post("/api/directmessage", body, headers)
          .then((res) =>{
             console.log(res.data);
             this.setState({ selectedChannel: res.data});
             this.setState({ messages: []});
             this.getMessages();
             window.Echo.join(`chat.dm.${this.state.selectedChannel.id}`)
            .listen("MessageSent", (event) => {
                console.log(event);
                const message = {
                  user: event.user,
                  message: event.message.message
                }
                this.setState({
                  messages: [...this.state.messages, message ]
                });
           });
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map( error => {
              console.log(error.toString());
            });
          });
      }

      channelSelect = (selectedChannel, event) => {
        if(event !== undefined) {
          event.stopPropagation();
        }

        this.setState({ selectedChannel: selectedChannel}, () => {
          this.setState({ messages: []});
          this.getMessages();
          console.log("SELECTED CHANNEL IN channelSelect()");
          console.log(this.state.selectedChannel);
          window.Echo.join(`chat.channel.${this.state.selectedChannel.id}`)
          .here(users => {

            users.forEach( user => user.name += "FROM.HERE()");
            this.setState({
              users: users
            });
            })
            .joining(user => {
              this.setState({
                  users: [...this.state.users, user ]
                });

              // this.setState( function (state, props) {
              //   const isInState = state.users.some( (existingUser) => existingUser.id === user.id);

              //   if(isInState) {
              //     return state;
              //   } else {
              //     return [...this.state.users, user ]
              //   }
              // });

                const message = {
                  user: user,
                  message: "Joined",
                  status:true
                }
                if(this.state.selectedChannel.type === "channel")
                 {
                    this.setState({
                      messages: [...this.state.messages, message ]
                    });
                 }

            })
            .leaving(user => {
                this.setState({
                  users: [...this.state.users.filter(u => u.id !== user.id)]
                });
                const message = {
                  user: user,
                  message: "Left",
                  status:true
                }
                if(this.state.selectedChannel.type === "channel")
                {
                   this.setState({
                     messages: [...this.state.messages, message ]
                   });
                }


            })
            .listen("MessageSent", (event) => {
            console.log(event);
            const message = {
              user: event.user,
              message: event.message.message
            }
            this.setState({
              messages: [...this.state.messages, message ]
            });
          });
        });
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
      sendMessage = (e) => {
        e.preventDefault();

        const message = this.state.message;
        const channel_id = this.state.selectedChannel.id;
        console.log(this.state.selectedChannel.id);
        const body = JSON.stringify({ message, channel_id });

        const headers = {
          headers: {
            "Content-Type": "application/json"
          }
        };


        axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.myToken;

        console.log(body);
        axios
          .post("/api/messages", body, headers)
          .then((res) =>{
             console.log(res);
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map( error => {
              console.log(error.toString());
            });
          });

      };

      getMessages = () => {
        const headers = {
          headers: {
            "Authorization":"Bearer "+this.myToken
          }
        };

        console.log("CURRENTLY SELECTED CHANNEL BELOW");
        console.log(this.state.selectedChannel.id)

        axios.get(`/api/messages/${this.state.selectedChannel.id}`, headers)
          .then((res) =>{

            console.log("GET MESSAGES OUTPUT BELOW");
            console.log(res.data);
            const messages = res.data;
            this.setState({
              messages: [...this.state.messages, ...messages ]
            });
          })
          .catch((err) => {
          });
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
                  {this.allUserList()}
              </Col>
              <Col xs="6">
                <h1>Chat Homepage</h1>
                <Button onClick={this.onLogout}>Logout</Button>
                  {this.messageList()}
                <InputGroup>
                <Input onChange={this.onChange} id="message" name="message" />
                  <InputGroupAddon addonType="append"><Button onClick={this.sendMessage}>Send </Button></InputGroupAddon>
                </InputGroup>
              </Col>
              <Col xs="3">
                <h3>Users in this Room</h3>
                <ul>
                  {this.userList()}
                </ul>
              </Col>
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
      users: state.chat.users,
      allUsers: state.chat.allUsers,
      currUser:state.chat.currUser,
      selectedChannel:state.chat.selectedChannel

    });
    export default connect(mapStateToProps, { getList, getSingleList, createNewList, deleteOneList })(Chat);