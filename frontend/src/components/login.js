import React, {Component} from 'react';
import './App.css';
import {Redirect} from 'react-router';
import Popup from "reactjs-popup";
import SignUp from './signup.js';
import $ from 'jquery';
import localStorage from 'localStorage';
import sha256 from 'sha256';

const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};


class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwordHash: '',
            userType: ''
        };
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            });
        };

    }

    componentWillMount() {

        var endpoint_API = "http://quyzygy.us/";

        $(window).on('load', function () {
            $("#loginButton").on('click', function () {
                let hash = sha256($("#passwordBox").val());
                $.ajax({
                    url: endpoint_API + "login?email=" + $("#emailBox").val() + "&passwordHash=" + hash,
                    type: "POST",
                    crossDomain: true,
                    success: function (response) {
                        console.log(response);
                        updateLocalStorage(response);
                        localStorageDemo();
                    },
                    error: function (xhr, status) {
                        alert("error");
                    }
                });
            });
            localStorageDemo();
        });

        function updateLocalStorage(loginData) {
            localStorage.setItem('sk', loginData["secretKey"]);
            localStorage.setItem('userType', loginData['userType']);
        }

        function getLocalStorage() {
            var x = {};
            x['sk'] = localStorage.getItem('sk');
            x['userType'] = localStorage.getItem('userType');

            return x;
        }

        function localStorageDemo() {
            $("#localStorageDemo").html(JSON.stringify(getLocalStorage()));
        }
    }

    render() {


        if (this.state.userType === 'Student') {
            return <Redirect to='/studentPage'/>
        }
        if (this.state.userType === 'Professor') {
            return <Redirect to='/profPage'/>
        }

        return (
            <div className="LogIn">
                <div id='loginForm'>

                    <form>
                        <div className='block'>
                            <label htmlFor="exampleEmail">Email</label>
                            <input id="emailBox" type="text" value="blue.carrot@vegetables.com"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className='block'>
                            <label for="examplePassword" >Password</label>
                            <input id="passwordBox" type="password" value="12345678" onChange={this.handleChange}/>
                        </div>
                            <input className='btnClk logBtn' id='loginButton' type="button" value="Login"
                                   onClick={() => {
                                       this.setState({
                                           userType: localStorage.getItem('userType')
                                       });
                                   }
                                   }/>

                    </form>

                    <p>Don't have an account?</p>

                    <Popup
                        trigger={<button className="btnClk logBtn"> Register! </button>}
                        modal
                        contentStyle={contentStyle}>
                        <SignUp/>

                    </Popup>
                </div>
            </div>

        )
    }
}

export default login;