import React, {useState} from "react";
import { Button,Alert,  Modal, ModalHeader, ModalBody, ModalFooter, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

export const AllChannelsList = (props) => {
    let channels = props.channels;
    // channels = channels.map( channel => props.currUser.id != channel.owner_id );
    // console.log(typeof(channels));
  const { joinChannelRequest } = props;

  const [modal, setModal] = useState(false);

  const toggle = (e) => {
      e.stopPropagation();
      setModal(!modal);
      props.getAllChannelsList();
  }


  console.log(channels);
  
    const channelList = channels.map((value, index) => {
        return (
            <Col className="ChannelsListItem" key={index}>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5 id={value.id}>
                            {value.name}
                            </h5>
                        </CardTitle>
                        <b>Owner: </b> {value.owner}
                        <CardSubtitle><b>Type: </b>{value.type} channel</CardSubtitle>
                        <CardText>
                            <b>Channel Description: </b>{value.desc}
                        </CardText>
                        <CardSubtitle style={{marginTop:'auto'}}><b>Visible : </b>{value.visible ? "Yes": "No"}</CardSubtitle>

                        <Button
                            color="success"
                            onClick={() => joinChannelRequest(value.id, value.type)}
                            id={value.id}
                        >
                            {value.type === 'private' ? <b> + Request to Join</b> : <b> + Join Now </b> }
                        </Button>
                    </CardBody>
                </Card>

                <br></br>
            </Col>
        );
    });


    return (
        <div style={{ marginLeft: "auto" }}>
            <Button id="allChannels" className="createChannel" onClick={toggle}>
                <i class="far fa-compass"></i>
            </Button>
            <Modal className="ChannelsListModal" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Discover Channels</ModalHeader>
                <ModalBody className="ChannelsListDesc">
                    <p>
                        This modal lists all the channels created by users on
                        this site, some of which are public and need approval of the owner to join, 
                        while others are public and can be joined immediately
                    </p>
                </ModalBody>
                <ModalBody className="ChannelsList">{channelList}</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>
                        Close Window
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AllChannelsList;
