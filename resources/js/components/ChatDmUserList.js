

import React, {useState} from "react";
import { Collapse, Col, Button } from "reactstrap";

export const ChatDmUsersList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { dmSelect } = props;

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);


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
      <Button color="white" className="sidepaneParentButton" onClick={toggle}>
            <h3>Direct Message { !isOpen ? <i style={{marginLeft:'auto'}} class="arrow fas fa-chevron-down"></i> : <i style={{marginLeft:'auto'}} class="arrow fas fa-chevron-up"></i>}</h3>
            
    </Button>
      <Collapse isOpen={isOpen} defaultOpen={true} style={{overflowY:'hidden' }}> 
            <div className="sidepaneDm">
            <div>{userList}</div>
            </div>
    </Collapse>
      </div>
    )
};

export default ChatDmUsersList;
