

import React from "react";
import { Col, Button } from "reactstrap";

export const ChatDmUsersList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { dmSelect } = props;
  console.log("FROM CHATDMUSERSLIST ");
  console.log(users);
    const userList = users.map((value, index) => {
        return (
            <Col className="dmuser" key={index}>
                <Button color="link"
                    onClick={() => dmSelect(value.id, value.users[0].name)}
                    id={value.users[0].id}>
                    <b>{value.users[0].name}</b>
                    <div className={ value.users[0].is_online ? "online" : "offline"}></div>
                </Button>
                <br></br>
            </Col>
        );
    });


    return (
      <div className="sidepane">
      <h3>Direct Message</h3>
      <Col>{userList}</Col>
        
      </div>
    )
};

export default ChatDmUsersList;
