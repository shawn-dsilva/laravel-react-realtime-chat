
    import React, { Component } from 'react'
    import Button from 'reactstrap/lib/Button';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

    class Chat extends Component {
      constructor () {
        super()
        this.state = {
          messages:[],
          redirect: false

      }
    }
      componentDidMount () {
        Echo.join('chat').listen(".ChatMessageWasReceived", (event) => {
          console.log(event);
          const message = {
            user: event.user,
            message: event.chatMessage
          }
          this.setState({
            messages: [...this.state.messages, message ]
          });
        })
      }

      messageList() {
        const messages = this.state.messages;
        console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          console.log(value)
          return <li key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</li>
        });

        return messagelist;
      }

      onLogout = () => {

           let tokenValue = localStorage.getItem("LRC_Token");

            axios.defaults.headers.common["Authorization"] =
            "Bearer " + tokenValue;

            axios.get("/api/auth/logout")
              .then((res) =>{
                if(res.status === 200) {
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



      render () {

        return (
          <div className='container py-4'>
            <h1>Chat Homepage</h1>
            <ul>
              {this.messageList()}
            </ul>
            <Button onClick={this.onLogout}>Logout</Button>

          </div>
        )
      }
    }

    export default Chat