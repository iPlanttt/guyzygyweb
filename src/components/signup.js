import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import './homepage.css';

class signup extends Component {
  render() {
    return (
      <div className="SignUp">
      
      <div id='loginForm'>
           <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>Email</Label>
                  <Col sm={10}>
                  <Input type="email" name="email" id="exampleEmail" placeholder="name@csie.ase.ro" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}>Password</Label>
                  <Col sm={10}>
                  <Input type="password" name="password" id="examplePassword" placeholder="password" />
                  </Col>
                </FormGroup>
                 <FormGroup row>
                  <Label for="retypePassword" sm={2}>Retype Password</Label>
                  <Col sm={10}>
                  <Input type="password" name="retypePassword" id="retypePassword" placeholder="retype password" />
                  </Col>
                </FormGroup>
                <FormGroup tag="fieldset" row>
                  <legend className="col-form-label col-sm-10">Student or Teacher?</legend>
                  <Col sm={10}>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" />{' '}
                        Student
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" />{' '}
                        Teacher
                      </Label>
                    </FormGroup>
                    </Col>
                  </FormGroup>
                <Button>Submit</Button>
              </Form>
        </div>
              
      </div>
    );
  }
}

export default signup;