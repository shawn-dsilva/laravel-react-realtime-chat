import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const NotificationDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
       Notifications 
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem divider />
        <DropdownItem>Notification</DropdownItem>
        <DropdownItem>Notification</DropdownItem>
        <DropdownItem>Notification</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Show All Notifications</DropdownItem>

      </DropdownMenu>
    </Dropdown>
  );
}

export default NotificationDropdown;