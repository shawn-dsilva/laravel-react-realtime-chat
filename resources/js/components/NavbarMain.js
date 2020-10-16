import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import NotificationDropdown from './NotificationDropdown';

const NavbarMain = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="navCustom">
        <NavbarBrand href="/">Laravel React Chat</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <div className="ml-auto">
            <NotificationDropdown notifications={props.notifications} allNotifications={props.allNotifications} acceptRequest={props.acceptRequest} unreadNotifs={props.unreadNotifs} getAllNotifications={props.getAllNotifications} />
            </div>
          </Nav>
          <NavbarBrand color="dark">{props.username}</NavbarBrand>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarMain;