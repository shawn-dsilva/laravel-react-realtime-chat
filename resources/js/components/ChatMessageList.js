import React, { useEffect, useRef }  from 'react'
import {
  Col,
  Row
} from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import { getAvatar } from './utils/echoHelpers';

function ChatMessageList(props) {

  // Equivalent of a Div ID in React, remains even across re-renders
  const bottomRef = useRef(null);

  //  function to scroll to dummy div places at the bottom of message list
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const messages = props.messages;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="systemMsg" style={{textAlign:"center"}} key={index} ><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            if(value.user.name !== props.currUser.name) {
              return <div className="msg-container">
                 <img  src={'storage/'+getAvatar(value.user)}></img>
                 
                 <Col className="chatNotUserMsg" key={index}>
                 <span>
                {value.user.name }  | &nbsp; 
                <Moment date={value.created_at} format="dddd, MMMM Do YYYY [at] h:mm A"/>
                </span>
                <br></br> {value.message}</Col>
                </div>
            } else {
              
              return <div className="user-msg-container">
              <Col className="chatUserMsg" key={index}>
                <span>
                {value.user.name }  | &nbsp; 
                <Moment date={value.created_at} format="dddd, MMMM Do YYYY [at] h:mm A"/>
                </span>
                 <br></br> {value.message}</Col>
                 <img  src={'storage/'+getAvatar(value.user)}></img>

             </div>
            }
          }
        });

        // Runs on every re-render
        useEffect(() => {
          scrollToBottom();
        }, [messagelist]);

  return (
    <Row className="chatDisplay">
    {messagelist}
    <div ref={bottomRef} />
    </Row>
  )
}

export default ChatMessageList;