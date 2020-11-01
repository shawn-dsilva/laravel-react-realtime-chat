import React from 'react'
import {
  Col,
  Row
} from 'reactstrap';

function ChatMessageList(props) {

  const messages = props.messages;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="my-3" style={{textAlign:"center"}} key={index} ><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            if(value.user.name !== props.currUser.name) {
              return <Col className="chatNotUserMsg" key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</Col>
            } else {
              return <Col className="chatUserMsg" key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</Col>
            }
          }
        });

  return (
    <Row className="chatDisplay">
    {messagelist}
    </Row>
  )
}

export default ChatMessageList;