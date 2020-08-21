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
            <h3>Users in this Room</h3>
            <ul>{userInRoomList}</ul>
        </Col>
    );
};

export default ChatRoomUsersList;
