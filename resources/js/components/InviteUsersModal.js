import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Col, UncontrolledTooltip} from 'reactstrap';

const InviteUsersModal = (props) => {
  const {
    buttonLabel,
    className,
    dmUsers,
    currUser,
    selectedChannel,
    inviteToChannel,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const users = dmUsers;

  const userList = users.map((value, index) => {
    return (

        <Col key={index}>
            <Button color="link"
                id={value.users[0].id}>
              <b>{value.users[0].name}</b>
            </Button>
            <Button color="success"
                onClick={() => inviteToChannel(value.users[0].id, selectedChannel.id)}
                id={value.users[0].id}>
                <b>Invite User</b>
            </Button>
            <br></br>
            <br></br>

        </Col>
      
    );
});


  return (
    <div>
       <UncontrolledTooltip placement="top" target="invite">
                    Invite Users 
        </UncontrolledTooltip>
      <Button color="transparent" id="invite" className="channelDescButton" onClick={toggle}>
      <i class="fas fa-user-plus"></i></Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Invite Users to your Channel</ModalHeader>

        <ModalBody>
          Select Users you wish to invite to your channel
          <h5>Friends</h5>
          {userList}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Send Invites</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InviteUsersModal;