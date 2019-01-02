import React, { Component } from 'react';
import logo from '../assets/logo2.png';
import './homepage.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';


class studentpage extends Component {
  render() {
    return (
      <div className="StudentPage" id='studentPage'>
     
     <Navbar id='navbar' dark expand="md" fixed="top" height='40px'>
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" height='30px'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Log out</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                
                <Button outline color="success" size="lg">ENTER QUIZ</Button>
                <Button outline color="info" size="lg">SEE GRADES</Button>
     
      </div>
    );
  }
}

export default studentpage;
