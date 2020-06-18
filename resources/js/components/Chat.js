
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
          this.setState({
            messages: [...this.state.messages, event.chatMessage ]
          });
        })
      }

      messageList() {
        const messages = this.state.messages;
        console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          return <li key={index}>{value}</li>
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
            <h1>Dummy Div</h1>
            <ul>
              {this.messageList()}
            </ul>
            <Button onClick={this.onLogout}>Logout</Button>

          </div>
        )
      }
    }

    export default Chat