import React, {useState} from "react";
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

export const AllChannelsList = (props) => {
    const channels = props.channels;
    // console.log(typeof(channels));
  const { joinChannelRequest } = props;

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
      e.stopPropagation();
      setModal(!modal);
  }


  console.log(channels);
    const channelList = channels.map((value, index) => {
        return (
            <Col  key={index}>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Button color="link" id={value.id}>
                                <b>{value.name}</b>
                            </Button>
                        </CardTitle>
                        <b>Owner: </b> {value.owner}
                        <CardSubtitle><b>Type: </b>{value.type} channel</CardSubtitle>
                        <CardText>
                            <b>Channel Description: </b>{value.desc}
                        </CardText>
                        <CardSubtitle><b>Visible : </b>{value.visible ? "Yes": "No"}</CardSubtitle>

                        <Button
                            color="success"
                            onClick={() => joinChannelRequest(value.id, value.type)}
                            id={value.id}
                        >
                            <b> + Request to Join</b>
                        </Button>
                    </CardBody>
                </Card>

                <br></br>
            </Col>
        );
    });


    return (
       <div style={{marginLeft:'auto'}}>
          <Button className="createChannel" onClick={toggle}><i class="far fa-compass"></i></Button>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>All Channels List</ModalHeader>
            <ModalBody>
                <p>
                    This modal lists all the channels created by users on this site, it would not be
                    present in a production app, and is present here only for debug purposes
                </p>
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
