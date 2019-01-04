import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Col} from 'reactstrap';
import './homepage.css';

class signup extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      firstName : '',
      lastName : '',
      email : '',
      passwordHash : '',
      userType : ''
    };
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      });
    };
  }
  
  
  redirectToTarget = () => {
    this.context.router.history.push('/studentPage');
  }
  
  render() {
    return (
      <div className="SignUp">
      
      <div id='loginForm'>
           <Form>
                <FormGroup row>
                  <Label for="firstName" sm={2}>First Name</Label>
                  <Col sm={10}>
                  <Input type="text" name="firstName" id="firstN" onChange={this.handleChange} />
                  </Col>
                </FormGroup>
                 <FormGroup row>
                 <Label for="lastName" sm={2}>Last Name</Label>
                  <Col sm={10}>
                  <Input type="text" name="lastName" id="lastN" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                  <Input type="email" name="email" id="exampleEmail" placeholder="name@csie.ase.ro" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                  <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                 <FormGroup row>
                  <Label for="retypePassword" sm={2}>Retype Password</Label>
                  <Col sm={10}>
                  <Input type="password" name="retypePassword" id="retypePassword" placeholder="retype password" onChange={this.handleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup tag="fieldset" row>
                  <legend className="col-form-label col-sm-10">Student or Teacher?</legend>
                  <Col sm={10}>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radioStudent" onChange={this.handleChange}/>
                        Student
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radioProf" onChange={this.handleChange}/>
                        Teacher
                      </Label>
                    </FormGroup>
                    </Col>
                  </FormGroup>
                 <input type="button" value="REGISTER" onClick={() => {
                  if (this.state.password === this.state.retypePassword)
                {
                var sha256 = require('js-sha256').sha256;
                 this.props.onAdd({
                    firstName : this.state.firstName,
                    lastName : this.state.lastName,
                    email : this.state.email,
                    passwordHash : sha256(this.state.password)});
                    
                    if (this.state.radioStudent.check === true)
                      this.props.onAdd({userType : 'Student'});
                      else
                      this.props.onAdd({userType : 'Professor'});
                      
                      this.redirectToTarget();
          }}} />
              </Form>
        </div>
              
      </div>
    );
  }
}

export default signup;