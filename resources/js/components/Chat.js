
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

    class Chat extends Component {

        state = {
          messages:[],
          message:"",
          users: [],
          allUsers: [],
          currUser:"",
          token:"",
          selectedChannel:""

      }



      componentDidMount () {

        // if(localStorage.getItem("LRC_Token") !== null) {
          let tokenValueA = localStorage.getItem("LRC_Token");

          axios.defaults.headers.common["Authorization"] =
          "Bearer " + tokenValueA;

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

          let token = localStorage.getItem("LRC_Token");

          window.Pusher = require('pusher-js');


          window.Echo = new Echo({
              broadcaster: 'pusher',
              key: process.env.MIX_PUSHER_APP_KEY,
              wsHost: window.location.hostname,
              wsPort: 6001,
              disableStats: true,
              forceTLS: false
          });

          window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + token
          window.Echo.options.auth = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
          }

          window.Echo.join('chat')
          .here(users => {

            console.log(users);
            this.setState({
              users: [...this.state.users, ...users ]
            });

            let tokenValue = localStorage.getItem("LRC_Token");

            // axios.defaults.headers.common["Authorization"] =
            // "Bearer " + tokenValue;

            const headers = {
              headers: {
                "Authorization":"Bearer "+tokenValue
              }
            };

            axios.get("/api/messages", headers)
              .then((res) =>{
                console.log(res.data);
                const messages = res.data;
                this.setState({
                  messages: [...this.state.messages, ...messages ]
                });
              })
              .catch((err) => {
              });

            })
            .joining(user => {

              console.log("JOINING: "+user.name);
              this.setState({
                  users: [...this.state.users, user ]
                });

                const message = {
                  user: user,
                  message: "Joined",
                  status:true
                }
                this.setState({
                  messages: [...this.state.messages, message ]
                });


            })
            .leaving(user => {
              console.log("LEAVING: "+user.name);
                this.setState({
                  users: this.state.users.filter(u => u.id !== user.id)
                });

                const message = {
                  user: user,
                  message: "Left",
                  status:true
                }
                this.setState({
                  messages: [...this.state.messages, message ]
                });

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
          })
        // }
        let tokenValue = localStorage.getItem("LRC_Token");

            // axios.defaults.headers.common["Authorization"] =
            // "Bearer " + tokenValue;

            const headers = {
              headers: {
                "Authorization":"Bearer "+tokenValue
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
      }

      messageList() {
        const messages = this.state.messages;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="my-3" key={index} sm="6" md={{size: 8, offset: 3}}><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            return <Row>
              <Col key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</Col>
              </Row>
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
          console.log(value)
          return <Col> <Button onClick={this.dmSelect.bind(this, value.id)} id={value.id} key={index}><b>{value.name }</b></Button>
          <br></br>
          </Col>
        });

        return userList;
      }

      dmSelect = (id, event ) => {
        event.stopPropagation();
        console.log(id);

        const body = `{ "receiver": ${id} }`;

        const headers = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        let tokenValue = localStorage.getItem("LRC_Token");

        axios.defaults.headers.common["Authorization"] =
        "Bearer " + tokenValue;

        console.log(body);
        axios
          .post("/api/directmessage", body, headers)
          .then((res) =>{
             console.log(res.data);
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map( error => {
              console.log(error.toString());
            });
          });
      }

      onLogout = () => {

           let tokenValue = localStorage.getItem("LRC_Token");

            // axios.defaults.headers.common["Authorization"] =
            // "Bearer " + tokenValue;

            const headers = {
              headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+tokenValue
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

        const body = JSON.stringify({ message });

        const headers = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        let tokenValue = localStorage.getItem("LRC_Token");

        axios.defaults.headers.common["Authorization"] =
        "Bearer " + tokenValue;

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



      render () {

        return (
          <div>
          <Container fluid="true">
            <Row>
            <Col xs="3">
                <h3>Direct Message</h3>
                <ul>
                  {this.allUserList()}
                </ul>
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

    export default Chat