

import React from "react";
import { Col, Button } from "reactstrap";

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
                    onClick={() => channelSelect(value.id)}
                    id={value.id}>
                    <b>{value.name}</b>
                </Button>
                <br></br>
            </Col>
        );
    });


    return (
      <div>
        {channelList}
      </div>
    )
};

export default ChatChannelsList;
