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
                  <InputGroupAddon addonType="append"><Button onClick={this.sendMessageWrapper}>Send </Button></InputGroupAddon>
                </InputGroup>
                </Row>
        )
    }
}

export default ChatInputBox
