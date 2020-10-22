import React, {useState} from "react";
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

export const AllChannelsList = (props) => {
    const channels = props.channels;
    // console.log(typeof(channels));
  const { sendRequest } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  console.log(channels);
    const channelList = channels.map((value, index) => {
        return (
            <Col key={index}>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Button color="link" id={value.id}>
                                <b>{value.name}</b>
                            </Button>
                        </CardTitle>
                        <CardText>
                            {value.desc}
                        </CardText>
                        <Button
                            color="success"
                            onClick={() => sendRequest(value.id)}
                            id={value.id}
                        >
                            <b>Request to Join</b>
                        </Button>{" "}
                    </CardBody>
                </Card>

                <br></br>
            </Col>
        );
    });


    return (
       <div>
          <Button color="danger" onClick={toggle}>All Channels List</Button>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>All Channels List</ModalHeader>
            <ModalBody>
        {channelList}
        </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={toggle}>Close Window</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
};

export default AllChannelsList;
