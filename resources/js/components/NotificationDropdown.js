import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const NotificationDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { notifications } = props;

  const notificationsList = notifications.map((value, index) => {
    return (
        <DropdownItem key={index}>
          {value.desc}
            <br></br>
        </DropdownItem>
    );
});

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
       Notifications 
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem divider />
          {notificationsList}

        
        <DropdownItem divider />
        <DropdownItem>Show All Notifications</DropdownItem>

      </DropdownMenu>
    </Dropdown>
  );
}

export default NotificationDropdown;