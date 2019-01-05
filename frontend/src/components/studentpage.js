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
    Form, FormGroup, Label, Input
} from 'reactstrap';
import { Redirect } from 'react-router';


class studentpage extends Component {
    
      constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            toQuiz: false,
            toGrades: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
  render() {
      
      if (this.state.toQuiz === true) {
      return <Redirect to='/StudentQuiz' />
    }
     if (this.state.toGrades === true) {
      return <Redirect to='/StudentQuiz' />
    }
      
      
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
                <Form>
                <FormGroup>
                  <Label for="code" sm={10}>Enter code</Label>
                  <Input type="text" name="code" id="codeQ" onChange={this.handleChange} />
                
                <input className='btnClk' type="button" value="ENTER QUIZ" onClick={() => {
                      this.setState({ toQuiz: true});
          }} />
            </FormGroup>
             </Form>
                </div>
                <div>
               <input className='btnClk' type="button" value="SEE GRADES" onClick={() => {
 
                       this.setState({ toGrades: true});
          }} />
                </div>
                </div>
     
      </div>
    );
  }
}

export default studentpage;
