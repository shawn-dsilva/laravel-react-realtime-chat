import React, { useState } from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Collapse,
    Row
  } from 'reactstrap';

const HomeNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div className="NavContainer">
        <Navbar color="transparent" light expand="md" className="mx-4" >
          <NavbarBrand href="/"> 
            <Row className="LogoNav">
                    <h2><span style={{color:'#F05340' }}>Laravel</span> 
                    <span style={{color:'#61DBFB'}}> React</span> Chat 
                    <i class="far fa-comments" style={{fontSize:'2.5rem'}}></i></h2>
                    <span style={{fontWeight:'500'}}>Made by <a href="https://www.shawndsilva.com">Shawn D'silva</a></span>
            </Row>
        </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="#motivation">Motivation</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#techstack">Tech Stack</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#features">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#startchatting">Start Chatting</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  
  export default HomeNav;