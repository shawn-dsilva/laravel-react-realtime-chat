

import React from "react";
import { UncontrolledCollapse, Col, Button } from "reactstrap";

export const ChatDmUsersList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { dmSelect } = props;
  console.log("FROM CHATDMUSERSLIST ");
  console.log(users);
    const userList = users.map((value, index) => {
        return (
            <div className="dmuser" key={index}>
                <Button color="link"
                    onClick={() => dmSelect(value.id, value.users[0].name)}
                    id={value.users[0].id}>
                    <img  className="dmAvatar" src={'/storage/'+value.users[0].avatar}/>
                    <b>{value.users[0].name}</b>
                    <div className={ value.users[0].is_online ? "online" : "offline"}></div>
                </Button>
                <br></br>
            </div>
        );
    });


    return (
        <div className="sidepaneParentDm">
      <Button color="white" id="dmtoggler" style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <h3>Direct Message</h3>
    </Button>
      <UncontrolledCollapse toggler="#dmtoggler" style={{overflowY:'hidden' }}> 
            <div className="sidepaneDm">
            <div>{userList}</div>
            </div>
    </UncontrolledCollapse>
      </div>
    )
};

export default ChatDmUsersList;
