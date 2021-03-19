import React from "react";
import { Col } from "reactstrap";

export const ChatRoomUsersList = props => {
    const onlineUsers = props.usersInRoom;
    const allUsers = props.selectedChannel.users;
    const allUsersLen = allUsers.length;

    console.log("ALL USERS OUTPUT BELOW");
    console.log(allUsers);
    const userInRoomList = onlineUsers.map((value, index) => {
        return (
            <div key={index}>
                <span className="online"></span>
                <b className="online-text">{value.name}</b>
            </div>
        );
    });

    function processOfflineUsersArray(allUsers, onlineUsers) {

        for(var i = 0, len = onlineUsers.length; i < len; i++) {
            for( var j = 0, len2 = allUsers.length; j < len2; j++) {
                if (allUsers[j].id === onlineUsers[i].id) {
                     allUsers.splice(j, 1);
                     len2=allUsers.length;
                }
            }
        }

        return allUsers;

        console.log(a);
        console.log(b);
      }

    let offlineUsers = processOfflineUsersArray( allUsers, onlineUsers)
    console.log("VARR OFFLINE USERS OUTPUT BELOW");
    console.log(offlineUsers);

     offlineUsers = offlineUsers.map((value, index) => {
        return (
            <div key={index}>
                <span className="offline"></span>
                <b className="offline-text" >{value.name}</b>
            </div>
        );
    });
   

    return (
        <Col xs="1" className="usersInRoom">
            <h3>Members List</h3>
            <br></br>
            <h5>Active ( {onlineUsers.length} )</h5>
            {userInRoomList}
            <h5>Offline ( {offlineUsers.length} )</h5>
            {offlineUsers}
        </Col>
    );
};

export default ChatRoomUsersList;
