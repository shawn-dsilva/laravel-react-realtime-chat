import React from "react";
import { Col } from "reactstrap";

export const ChatRoomUsersList = props => {
    const users = props.usersInRoom;

    const userInRoomList = users.map((value, index) => {
        console.log(value);
        return (
            <li key={index}>
                <b>{value.name}</b>
            </li>
        );
    });

    return (
        <Col xs="1" className="usersInRoom">
            <h3>In This Room</h3>
            <h5>Active ( {users.length} )</h5>
            <ul>{userInRoomList}</ul>
            <h5>Offline</h5>
        </Col>
    );
};

export default ChatRoomUsersList;
