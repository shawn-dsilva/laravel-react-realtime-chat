import React from 'react'
import {
  Col,
  Row
} from 'reactstrap';
import Moment from 'react-moment';
import 'moment-timezone';

function ChatMessageList(props) {

  const messages = props.messages;
  const users = props.users;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="my-3" style={{textAlign:"center"}} key={index} ><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            if(value.user.name !== props.currUser.name) {
              return <div className="msg-container">
                 <img  src={'storage/'+users.find(user => user.id === value.user.id).avatar}></img>
                 <Col className="chatNotUserMsg" key={index}>
                 <span>
                {value.user.name }  | &nbsp; 
                <Moment date={value.user.created_at} format="dddd, MMMM Do YYYY [at] h:mm A"/>
                </span>
                <br></br> {value.message}</Col>
                </div>
            } else {
              
              return <div className="user-msg-container">
              <Col className="chatUserMsg" key={index}>
                <span>
                {value.user.name }  | &nbsp; 
                <Moment date={value.user.created_at} format="dddd, MMMM Do YYYY [at] h:mm A"/>
                </span>
                 <br></br> {value.message}</Col>
             <img  src={'storage/'+users.find(user => user.id === value.user.id).avatar}></img>

             </div>
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