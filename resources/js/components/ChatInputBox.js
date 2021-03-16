import { lowerCase } from 'lodash';
import React, { Component } from 'react'
import {
    Button,
    Row,
    Input,
    InputGroup,
    InputGroupAddon
  } from 'reactstrap';
import { sendMessage } from './utils/echoHelpers';

  
export class ChatInputBox extends Component {

    state = {
        message:""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        setTimeout( () => {
          window.Echo.join(`chat.channel.${this.props.selectedChannel.id}`)
          .whisper("typing", {
            name: this.props.currUser
          });
        }, 300)

      };

      // Calls action to register user
      sendMessageWrapper = (e) => {
        e.stopPropagation();
        console.log(this.state.message);
        sendMessage(this.state.message, this.props.selectedChannel.id, this.props.selectedChannel.type)
        this.setState({ message:'' });

      }

    render() {
        return (
           <Row className="chatInput">
              <InputGroup  >
                <Input onChange={this.onChange} id="message" value={this.state.message}name="message" />
                  <InputGroupAddon addonType="append"><Button color="primary"  onClick={this.sendMessageWrapper} style={{fontSize:'1.3rem', textTransform:'lowercase'}}> <i class="far fa-paper-plane"></i> send </Button></InputGroupAddon>
                </InputGroup> 
                </Row>
        )
    }
}

export default ChatInputBox
