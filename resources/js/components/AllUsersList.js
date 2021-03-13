import React, {useState} from "react";
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import { getAvatar } from './utils/echoHelpers';


export const AllUsersList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { sendRequest } = props;

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
      e.stopPropagation();
      setModal(!modal);
      props.getAllUsersList();
    };


  console.log(users);
    const userList = users.map((value, index) => {
        return (

            <Col key={index}>
                <Button color="link"
                    id={value.id}>
                    <img height="50" style={{borderRadius:'50%'}} src={'storage/'+getAvatar(value)}></img>
                    <b>{value.name}</b>
                </Button>
                <Button color="success"
                    onClick={() => sendRequest(value.id)}
                    id={value.id}>
                    <b>Add Friend</b>
                </Button>
                <br></br>
            </Col>
          
        );
    });


    return (
       <div style={{marginLeft:'auto'}}>
          <Button id="addFriend" className="createChannel" style={{marginRight:'0.5rem'}} onClick={toggle}>
              <i class="fas fa-user-plus"></i>
              </Button>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>All Users List</ModalHeader>
            <ModalBody>
        {userList}
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggle}>Close Window</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
};

export default AllUsersList;
