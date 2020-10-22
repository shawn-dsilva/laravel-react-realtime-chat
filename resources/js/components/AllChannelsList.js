import React, {useState} from "react";
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';

export const AllChannelsList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { sendRequest } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  console.log(users);
    const userList = users.map((value, index) => {
        return (

            <Col key={index}>
                <Button color="link"
                    id={value.id}>
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
       <div>
          <Button color="danger" onClick={toggle}>All Users List</Button>
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

export default AllChannelsList;
