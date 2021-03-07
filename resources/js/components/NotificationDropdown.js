import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,  Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import { markAsRead } from '../actions/chatActions';

const NotificationDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [modal, setModal] = useState(false);
  const [modalAN, setANModal] = useState(false);
  const [value, setValue] = useState([]);


  const toggleModal = () => setModal(!modal);
  const toggleModalAN = () => setANModal(!modalAN);

  const { notifications, allNotifications, acceptRequest, getAllNotifications, unreadNotifs, markAsRead } = props;

  const notificationsList = notifications.map((value, index) => {
    return (
        <DropdownItem className={value.read_at ? "read": "unread"} key={index} onClick={() => acceptModalWrapper(value)} >
          <b>{value.data.sender_name}</b> {value.data.desc}
            <br></br>
        </DropdownItem>
    );
});


const allNotificationsList = allNotifications.map((value, index) => {
  return (
      <DropdownItem key={index} onClick={() => acceptModalWrapper(value)} >
          <b>{value.data.sender_name}</b> {value.data.desc}
          <br></br>
      </DropdownItem>
  );
})

function acceptRequestWrapper(invite_id, type) {
  acceptRequest(invite_id, type);
  toggleModal();
}

function getAllNotificationsWrapper() {
  getAllNotifications();
  toggleModalAN();
}

function acceptModalWrapper(value) {
  markAsRead(value.id);
  setValue(value.data);
  toggleModal();
}

function AcceptModal({sender_name, desc, toggleModal, modal, invite_id, recv_channel,request_type }) {

  let msg = '';
  switch(request_type) {
    case 'FRND':
      msg = <span>Do you want to accept <b>{sender_name}</b>'s friend request and add them to your Direct Message list?</span>
      break;
    case 'JOIN':
      msg = <span>Do you want to accept <b>{sender_name}</b>'s join request and add them to your channel {recv_channel} ?</span>;
      break;
      case 'INVT':
      msg = <span>Do you want to accept <b>{sender_name}</b>'s invite and join their channel {recv_channel} ?</span>;
      break;
    default:
        null;
  }
  return (
    <div>

       <Modal isOpen={modal} toggle={toggleModal} >
         <ModalHeader toggle={toggleModal}>Accept Request</ModalHeader>
         <ModalBody>
         {recv_channel}
          <span><b>{sender_name}</b> {desc}</span>
          <br></br>
          <br></br>
          {msg}
     </ModalBody>
         <ModalFooter>
         <Button color="success" onClick={() => acceptRequestWrapper(invite_id, request_type)}>Accept</Button>

           <Button color="danger" onClick={toggleModal}>Close Window</Button>

         </ModalFooter>
       </Modal>
     </div>
 )
}

function AllNotificationsModal({modalAN, toggleModalAN}) {

  return (
    <div>

       <Modal isOpen={modalAN} toggle={toggleModalAN} >
         <ModalHeader toggle={toggleModalAN}>All Notifications</ModalHeader>
         <ModalBody>
            {allNotificationsList}
     </ModalBody>
         <ModalFooter>

           <Button color="danger" onClick={toggleModalAN}>Close Window</Button>

         </ModalFooter>
       </Modal>
     </div>
 )
}

  return (
    <Dropdown   isOpen={dropdownOpen} toggle={toggle}>
      <Row className="notificationsBell">
      <DropdownToggle id="notifications" className="notifButton" color="secondary" size="lg" outline >
      <i class="far fa-bell"></i>
        </DropdownToggle>
        <Badge color="primary"> {unreadNotifs}</Badge>
</Row>
      <DropdownMenu>
        <DropdownItem divider />
          {notificationsList}

        
        <DropdownItem divider />
        <DropdownItem className="text-primary text-center"  onClick={getAllNotificationsWrapper}>Show All Notifications</DropdownItem>
  <AllNotificationsModal modalAN={modalAN} toggleModalAN={toggleModalAN}/>
  <AcceptModal sender_name={value.sender_name} desc={value.desc} toggleModal={toggleModal} modal={modal} invite_id={value.invite_id} recv_channel={value.recv_channel} request_type={value.request_type}/> 

      </DropdownMenu>
    </Dropdown>
  );
}

export default NotificationDropdown;