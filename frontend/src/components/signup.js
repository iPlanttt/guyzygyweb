import React, { Component } from 'react';
import {Label, FormGroup, Input} from 'reactstrap';
import './App.css';
import { Redirect } from 'react-router';

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
  
  render() {
    
     if (this.state.userType === 'Student') {
      return <Redirect to='/studentPage' />
    }
     if (this.state.userType === 'Professor') {
      return <Redirect to='/profPage' />
    }
    
    return (
      <div className="SignUp">
      
      <div id='loginForm'>
           <form>
                <div className='block'>
                  <label for="firstName" >First Name</label>
                  <input type="text" name="firstName" id="firstN" onChange={this.handleChange} />
                  </div>
                  <div className='block'>
                 <label for="lastName" >Last Name</label>
                  <input type="text" name="lastName" id="lastN" onChange={this.handleChange}/>
                  </div>
                  <div className='block'>
                  <label for="exampleEmail" >Email</label>
                  <input type="email" name="email" id="exampleEmail" placeholder="name@csie.ase.ro" onChange={this.handleChange}/>
                  </div>
                  <div className='block'>
                  <label for="examplePassword" >Password</label>
                  <input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handleChange}/>
                  </div>
                  <div className='block'>
                  <label for="retypePassword" >Retype Password</label>
                  <input type="password" name="retypePassword" id="retypePassword" placeholder="retype password" onChange={this.handleChange}/>
                </div>
                
                <FormGroup tag="fieldset" row>
                  <legend className="col-form-label sm-10">Student or Teacher?</legend>
                 
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
                    </FormGroup>
                  
                 <input className='btnClk logBtn' type="button" value="REGISTER" onClick={() => {
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
          
    <button className='btnClk logBtn' onClick={() => {
              console.log("modal closed ");
              
              /********************/
              
            }}>
            Cancel
          </button>
          
              </form>
        </div>
              
      </div>
    );
  }
}

export default signup;