import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NotificationDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const { notifications, acceptRequest } = props;

  const notificationsList = notifications.map((value, index) => {
    return (
        <DropdownItem key={index} onClick={toggleModal} >
          <b>{value.sender_name}</b> {value.desc}
          <AcceptModal sender_name={value.sender_name} desc={value.desc} toggleModal={toggleModal} modal={modal}/>
            <br></br>
        </DropdownItem>
    );
});

function AcceptModal({sender_name, desc, toggleModal, modal}) {
  return (
    <div>

       <Modal isOpen={modal} toggle={toggleModal} >
         <ModalHeader toggle={toggleModal}>Accept Request</ModalHeader>
         <ModalBody>
         <span>Do you want to accept <b>{sender_name}</b>'s friend request and add them to your Direct Message list?</span>
     </ModalBody>
         <ModalFooter>
           <Button color="danger" onClick={toggleModal}>Close Window</Button>
           <Button color="success" onClick={() => acceptRequest(value.invite_id)}>Accept</Button>

         </ModalFooter>
       </Modal>
     </div>
 )
}

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
       Notifications 
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem divider />
          {notificationsList}

        
        <DropdownItem divider />
        <DropdownItem className="text-primary text-center">Show All Notifications</DropdownItem>

      </DropdownMenu>
    </Dropdown>
  );
}

export default NotificationDropdown;