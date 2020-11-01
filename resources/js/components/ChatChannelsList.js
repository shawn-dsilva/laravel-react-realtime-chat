

import React from "react";
import { Col, Button } from "reactstrap";
import CreateChannelModal from './CreateChannelModal';


export const ChatChannelsList = (props) => {
    const channels = props.channels;
    // console.log(typeof(channels));
  const { channelSelect } = props;
  console.log("in channels list");
  console.log(channels);
    const channelList = channels.map((value, index) => {
        return (
            <Col key={index}>
                <Button color="link"
                    onClick={() => channelSelect(value.id, value.name)}
                    id={value.id}>
                    <b>{value.name}</b>
                </Button>
                <br></br>
            </Col>
        );
    });


    return (
      <div>
      <h3>Channels</h3>
       <Col> <Button color="link" onClick={() => channelSelect(5)} id="5" key="5"><b> General</b></Button>
        {channelList}
       <CreateChannelModal buttonLabel={"+ Create New Channel"}/>
  <br></br>
  </Col>
  </div>
    )
};

export default ChatChannelsList;
