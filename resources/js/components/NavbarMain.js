import React, {Component} from 'react';
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

class NavbarMain extends Component { 

constructor(props) {
  super(props);
  this.state = {
    isOpen: false
  }

}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  })
}
render() {
  return (
    <div>
      <Navbar color="light" light expand="md" className="navCustom">
        <NavbarBrand href="/">Laravel React Chat</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="container-fluid" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <div className="ml-auto">
            <NotificationDropdown markAsRead={this.props.markAsRead}  notifications={this.props.notifications} allNotifications={this.props.allNotifications} acceptRequest={this.props.acceptRequest} unreadNotifs={this.props.unreadNotifs} getAllNotifications={this.props.getAllNotifications} />
            </div>
          </Nav>
          <NavbarBrand color="dark">{this.props.username}</NavbarBrand>
        </Collapse>
      </Navbar>
    </div>
  );
}
  


}

export default NavbarMain;