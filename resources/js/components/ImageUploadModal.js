import React, { Component } from 'react';
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { CreateChannel } from '../actions/chatActions';

class ImageUploadModal extends Component {

  state = {
    toggle:false,
    modal:false,
    selectedImage:null
  }

  // static propTypes = {
  //   CreateChannel: PropTypes.func.isRequired
  // }


  toggle = () => {
    this.setState({ modal : !this.state.modal});
  }


  onChange = (e) => {
    this.setState({ selectedImage: e.target.files[0] });
  };
  

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "profileImage",
      this.state.selectedImage,
      this.state.selectedImage.name
    );
  
    // Details of the uploaded file
    console.log("UPLOAD CHOSEN FILE DATA");
    console.log(this.state.selectedImage);
    console.log(formData);

  
  };

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
        <Label for="profileImage">Profile Picture</Label>
        <Input type="file" name="file" id="profileImage" onChange={this.onChange} />
        <FormText color="muted">
          Image format, max dimensions and max file size to be specified here.
        </FormText>
      </Form>
   
          </ModalBody>
          <ModalFooter>
            <Button form="upload-image" color="primary" >Upload Image</Button>
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
}


export default connect( null, {CreateChannel})(ImageUploadModal);