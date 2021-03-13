

import React, {useState} from "react";
import { Collapse, Col, Button, UncontrolledTooltip } from "reactstrap";
import AllUsersList from './AllUsersList';
export const ChatDmUsersList = (props) => {

  const users = props.dmUsers;
  const { dmSelect } = props;

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);


  console.log("FROM CHATDMUSERSLIST ");
  console.log(users);
    const userList = users.map((value, index) => {
        return (
            <div className="dmuser" key={index}>
                <Button color="link"
                    onClick={() => dmSelect(value.id, value.users[0].name, value.users[0].avatar)}
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
                <UncontrolledTooltip placement="bottom" target="addFriend">
                   Add Friend
                </UncontrolledTooltip>

                <UncontrolledTooltip placement="right" target="DmArrow">
                   Open or Close DM Section
                </UncontrolledTooltip>
      <Button color="white" className="sidepaneParentButton" onClick={toggle}>
      
            <h3>Direct Message <AllUsersList dmUsers={props.usersList} currUser={props.currUser} 
      sendRequest={props.sendRequest} getAllUsersList={props.getAllUsersList} /> { !isOpen ? <i  id="DmArrow" class="arrow fas fa-chevron-down"></i> : <i id="DmArrow" class="arrow fas fa-chevron-up"></i>}</h3>
            
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
