import React, { Component } from 'react';
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { CreateChannel } from '../actions/chatActions';

class CreateChannelModal extends Component {

  state = {
    toggle:false,
    modal:false,
    channelName:"",
    description:"",
    type:"",
    visible:true,
  }

  static propTypes = {
    CreateChannel: PropTypes.func.isRequired
  }


  toggle = (e) => {
    e.stopPropagation();
    this.setState({ modal : !this.state.modal});
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = () => {
    this.setState({ visible : !this.state.visible});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { channelName, description, type, visible } = this.state;
    console.log("in form submit function");
    const channelData =  { channelName, description, type, visible };
    this.props.CreateChannel(channelData);
  }

  render() {
    return (
      <div style={{marginLeft:'auto'}}>
        <Button className="createChannel" onClick={this.toggle}><i class="fas fa-plus"></i></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><legend>Create A New Channel</legend></ModalHeader>
          <ModalBody>
          <Alert color="info">
          You can create a new channel using this modal, you will be the owner of the channel
          and can invite or remove members, set visibility/privacy settings etc.
        </Alert>
        <Form id="create-channel" onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="channelName">Channel Name</Label>
          <Input type="channelName" name="channelName" id="channelName" 
          placeholder="Enter a Name for your channel Here"
          onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description" id="description" 
          placeholder="Describe your channel here "
          onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="channelPicture">Channel Logo</Label>
          <Input type="file" name="picture" id="channelPicture" />
          <FormText color="muted">
            Upload a logo or avatar for your channel to make it easily recognizable, maximum resolution 512x512, PNG, JPG supported
          </FormText>
        </FormGroup>
        <FormGroup tag="fieldset">
            <Label>Access Permissions</Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="type"  value="public" onChange={this.onChange} />{' '}
              Anyone can join your channel, and can be invited to join your channel.(<span className="danger">PUBLIC</span>)
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="type" value="private" onChange={this.onChange} />{' '}
              Your channel can only be joined by others by your invitation.(<span className="success">PRIVATE</span>)
            </Label>
          </FormGroup>
        </FormGroup>
        <Label>Search Visibility</Label>

        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="visible" onChange={this.onCheck} />{' '}
            Make Channel Private
          </Label>
          <FormText color="muted">
            Check this box to make your channel not visible in searches and undiscoverable in the public channels list.
            <br></br>
            Leave unchecked for public visibility
          </FormText>
        </FormGroup>
      </Form>
   
          </ModalBody>
          <ModalFooter>
            <Button form="create-channel" color="primary" >Create Channel</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}


export default connect( null, {CreateChannel})(CreateChannelModal);