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
  NavbarText,
  ModalHeader
} from 'reactstrap';
import Myntra from './images/myntra.png'
import Secure from './images/secure.png'

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" style={{"boxShadow":" 0 4px 12px 0 rgba(0, 0, 0, 0.05)"}}>
        <NavbarBrand href="/"><img src={Myntra} height="50px" width="50px" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{"fontWeight":"100","color":"black"}}>
            <NavItem style={{"marginLeft":"400px"}}>
              <NavLink href="/cart" style={{"fontWeight":"700","color":"#14cda8","borderBottom":"3px solid #14cda8"}}>BAG</NavLink>
            </NavItem>
            <div style={{"fontWeight":"900","color":"black","marginTop":"4px"}}>- - - - - - - - </div>
            <NavItem>
              <NavLink href="/address" style={{"fontWeight":"700","color":"black"}}>ADDRESS</NavLink>
            </NavItem>
            <div style={{"fontWeight":"900","color":"black","marginTop":"4px"}}>- - - - - - - - </div>
            <NavItem>
              <NavLink href="/payment" style={{"fontWeight":"700","color":"black"}}>PAYMENT</NavLink>
            </NavItem>
          </Nav>
              <img src={Secure} height="30px" width="30px" />
          <NavbarText style={{"fontWeight":"700","color":"black","marginRight":"100px"}}>100% SECURE</NavbarText>

        </Collapse>
      </Navbar>
      <div style={{"borderBottom":"1px solid rgb(230, 225, 225)"}} />
    </div>
  );
}

export default Example;
