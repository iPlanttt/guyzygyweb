import React, { Component } from 'react';
import logo from '../assets/logo2.png';
import './App.css';
import './StudentQuiz'
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
import {Link} from "react-router-dom";


class studentpage extends Component {
    
      constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
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
                
                <div className='mainSection'>
                <div>
                <li><Link to='/StudentQuiz'>ENTER QUIZ</Link></li>

                </div>
                <div>
                <Button outline color="info" size="lg">SEE GRADES</Button>
                </div>
                </div>
     
      </div>
    );
  }
}

export default studentpage;
