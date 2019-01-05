import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router';
import Popup from "reactjs-popup";
import SignUp from './signup.js'


const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};


class login extends Component {
  
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
      <div className="LogIn">
      
      <div id='loginForm'>
           <form>
                <div className='block'>
                  <label for="exampleEmail" >Email</label>
                  <input type="email" name="email" id="exampleEmail" placeholder="name@csie.ase.ro" onChange={this.handleChange}/>
                </div>
                <div className='block'>
                  <label for="examplePassword" >Password</label>
                  <input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handleChange}/>
           </div>
                 <input className='btnClk logBtn' id='signBtn' type="button" value="Log in!" onClick={() => {
                 
                 
                  /**********************************/
                    
                    if (this.state.radioStudent.check === true)
                      this.props.onAdd({userType : 'Student'});
                      else
                      this.props.onAdd({userType : 'Professor'});
                      
                      this.redirectToTarget();
          }} />
                        </form>
          <p>Don't have an account?</p>
 
           <Popup
    trigger={<button className="btnClk logBtn"> Register! </button>}
    modal
    contentStyle={contentStyle}
  >
    <SignUp />

  </Popup>
  
        </div>
              
      </div>
    );
  }
}

export default login;