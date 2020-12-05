import React from "react";
import { Col } from "reactstrap";

export const ChatRoomUsersList = props => {
    const onlineUsers = props.usersInRoom;
    const allUsers = props.selectedChannel.users;
    console.log("ALL USERS OUTPUT BELOW");
    console.log(allUsers);
    const userInRoomList = onlineUsers.map((value, index) => {
        return (
            <span key={index}>
                <b>{value.name}</b>
            </span>
        );
    });

    let offlineUsers = allUsers.forEach((user) => {
       var index =  onlineUsers.findIndex(value => value.id == user.id )
       allUsers.splice(index, 1);
    });

    console.log(offlineUsers);
    
     offlineUsers = offlineUsers.map((value, index) => {
        return (
            <span key={index}>
                <b>{value.name}</b>
            </span>
        );
    });
   

    return (
        <Col xs="1" className="usersInRoom">
            <h3>In This Room</h3>
            <h5>Active ( {onlineUsers.length} )</h5>
            <ul>{userInRoomList}</ul>
            <h5>Offline</h5>
            <ul>{offlineUsers}</ul>
        </Col>
    );
};

export default ChatRoomUsersList;
