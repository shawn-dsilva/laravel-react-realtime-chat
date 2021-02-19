import React, { Component } from 'react';
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { CreateChannel } from '../actions/chatActions';

class ImageUploadModal extends Component {

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


  toggle = () => {
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
      <div>
        <Button color="body" className="p-0" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><legend>Upload A Profile Picture</legend></ModalHeader>
          <ModalBody>
          <Alert color="info">
          You can upload your own profile picture here.
        </Alert>
        <Form id="upload-image" onSubmit={this.onSubmit}>
        
      </Form>
   
          </ModalBody>
          <ModalFooter>
            <Button form="upload-image" color="primary" >Confirm</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}


export default connect( null, {CreateChannel})(ImageUploadModal);