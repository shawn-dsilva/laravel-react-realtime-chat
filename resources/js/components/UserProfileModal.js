import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const UserProfileModal = (props) => {
  const {
    className,
    user
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div onClick={toggle} id="userProfile" className="userDetails" > {
                  user.avatar ? 
                  <img src={"storage/"+user.avatar} className="dmAvatar"></img> : 
                  <img src="/assets/images/defaultuser.png" className="dmAvatar"></img>
                }
                <span>{user.name}</span>
        </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Your User Profile</ModalHeader>
        <ModalBody className="profileModal" >
        <img src={"storage/"+user.avatar} className="dmAvatar"></img>
        <span>{user.name}</span>
        <h2>Bio</h2>
        <p>{ user.desc ? user.desc : "There seems to be nothing here"}</p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserProfileModal;