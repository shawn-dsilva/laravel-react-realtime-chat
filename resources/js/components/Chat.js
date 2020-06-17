
    import React, { Component } from 'react'

    class Chat extends Component {
      constructor () {
        super()
        this.state = {
          messages:[]

      }
    }
      componentDidMount () {
        Echo.private('chat').listen(".ChatMessageWasReceived", (event) => {
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

      render () {


        return (
          <div className='container py-4'>
            <h1>Dummy Div</h1>
            <ul>
              {this.messageList()}
            </ul>
          </div>
        )
      }
    }

    export default Chat