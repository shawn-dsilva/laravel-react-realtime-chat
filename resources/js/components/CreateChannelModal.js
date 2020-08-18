import React, { useState } from 'react';
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const CreateChannelModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}><legend>Create A New Channel</legend></ModalHeader>
        <ModalBody>
        <Alert color="info">
        You can create a new channel using this modal, you will be the owner of the channel
        and can invite or remove members, set visibility/privacy settings etc.
      </Alert>
      <Form>
      <FormGroup>
        <Label for="channelName">Channel Name</Label>
        <Input type="channelName" name="channelName" id="channelName" placeholder="Enter a Name for your channel Here" />
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" placeholder="Describe your channel here "/>
      </FormGroup>
      <FormGroup>
        <Label for="channelPicture">Channel Logo</Label>
        <Input type="file" name="picture" id="channelPicture" />
        <FormText color="muted">
          Upload a logo or avatar for your channel to make it easily recognizable, maximum resolution 512x512, PNG, JPG supported
        </FormText>
      </FormGroup>
      <FormGroup tag="fieldset">
          <Label>Privacy/Visibility</Label>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="public" />{' '}
            Anyone can join your channel, and can be invited to join your channel.
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="private" />{' '}
            Your channel can only be joined by others by your invitation.
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
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
          <Button color="primary" onClick={toggle}>Create Channel</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateChannelModal;