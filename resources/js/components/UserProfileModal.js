import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const UserProfileModal = (props) => {
  const {
    className,
    currUser
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle} className="userDetails" > {
                  currUser.avatar ? 
                  <img src={"storage/"+currUser.avatar} className="dmAvatar"></img> : 
                  <img src="/assets/images/defaultuser.png" className="dmAvatar"></img>
                }</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Your User Profile</ModalHeader>
        <ModalBody>
            {currUser.name}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserProfileModal;