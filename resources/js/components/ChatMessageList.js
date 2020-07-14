import React from 'react'
import {
  Col
} from 'reactstrap';

function ChatMessageList(props) {

  const messages = props.messages;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="my-3" key={index} sm="6" md={{size: 8, offset: 3}}><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            return <Col key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</Col>
          }
        });

  return (
    <div>
      {messagelist}
    </div>
  )
}

export default ChatMessageList;