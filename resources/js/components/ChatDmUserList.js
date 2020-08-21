

import React from "react";
import { Col, Button } from "reactstrap";

export const ChatDmUsersList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { dmSelect } = props;
    const userList = users.map((value, index) => {
        return (
            <Col key={index}>
                <Button color="link"
                    onClick={() => dmSelect(value.id)}
                    id={value.id}>
                    <b>{value.name}</b>
                </Button>
                <br></br>
            </Col>
        );
    });


    return (
      <div>
        {userList}
      </div>
    )
};

export default ChatDmUsersList;
