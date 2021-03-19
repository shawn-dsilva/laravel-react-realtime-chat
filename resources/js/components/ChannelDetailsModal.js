/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';

const ChannelDetailsModal = (props) => {
  const [modalOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!modalOpen);

  return (
    <div style={{marginLeft:"auto"}}>
      <Button className="channelDescButton" onClick={toggle} type="button">
      <i className="fa fa-info-circle" aria-hidden="true"></i>
      </Button>
      <Modal placement="bottom" isOpen={modalOpen} toggle={toggle} className="channelDetailsModal">
        <ModalHeader  toggle={toggle} >Channel Details</ModalHeader>
        <ModalBody style={{fontSize:"1rem"}}>
          <h3>Channel Name</h3>
            <span>{props.channel.name}</span>
          <h3>Channel Description</h3>
            <p>{props.channel.desc}</p>
          <h3>Owner</h3>
          { props.channel.id === 1 ? 
            <p>  <img class="dmAvatar" src={"assets/images/SYSTEM.jpg"}/> <b>SYSTEM</b> </p> : 
            <p> <img class="dmAvatar" src={"storage/"+props.channel.owner_avatar}/><b>{props.channel.owner}</b></p> }
            
          </ModalBody>
      </Modal>
    </div>
  );
}

export default ChannelDetailsModal;