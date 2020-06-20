
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
          users: []
      }



      componentDidMount () {

        // if(localStorage.getItem("LRC_Token") !== null) {

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
              message: event.message
            }
            this.setState({
              messages: [...this.state.messages, message ]
            });
          })
        // }
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
                <h3>Users in this Room</h3>
                <ul>
                  {this.userList()}
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
            </Row>
          </Container>
          </div>
        )
      }
    }

    export default Chat