import React, {Component} from 'react';
import './App.css';
import {Redirect} from 'react-router';
import Popup from "reactjs-popup";
import SignUp from './signup.js';
import $ from 'jquery';
import localStorage from 'localStorage';
import sha256 from 'sha256';
import {Label, FormGroup, Input} from 'reactstrap';

const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};


class signup extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        var endpoint_API = "http://quyzygy.us/";

        $(window).on('load', function () {
            $("#loginButton").on('click', function () {
                let hash = sha256($("#passwordBox").val());
                var radioValue = $("input[name='userTypeBox']:checked").val();

                $.ajax({
                    url: endpoint_API + "register",
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ "id": "0", "firstName": $("#firstNameBox").val(), "lastName": $("#lastNameBox").val(),
                        "email": $("#emailBox").val(), "passwordHash": hash, "userType": radioValue  }),
                    processData: false,
                    crossDomain: true,
                    success: function (response) {
                        console.log(response);
                        updateLocalStorage(response);
                        localStorageDemo();

                        if (radioValue === 'Student') {
                            window.location.replace('/studentPage');
                        }
                        if (radioValue === 'Professor') {
                            window.location.replace('/profPage');
                        }
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

        return (
            <div className="SignUp">

                <div id='loginForm'>
                    <form>
                        <div className='block'>
                            <label htmlFor="firstName" >First Name</label>
                            <input type="text" name="firstNameBox" id="firstN" />
                        </div>
                        <div className='block'>
                            <label htmlFor="lastName" >Last Name</label>
                            <input type="text" name="lastNameBox" id="lastN"/>
                        </div>
                        <div className='block'>
                            <label htmlFor="exampleEmail" >Email</label>
                            <input type="email" name="emailBox" id="exampleEmail" placeholder="name@csie.ase.ro"/>
                        </div>
                        <div className='block'>
                            <label htmlFor="examplePassword" >Password</label>
                            <input type="password" name="passwordBox" id="examplePassword" placeholder="password"/>
                        </div>
                        <div className='block'>
                            <label htmlFor="retypePassword" >Retype Password</label>
                            <input type="password" name="retypePasswordBox" id="retypePassword" placeholder="retype password"/>
                        </div>

                        <FormGroup tag="fieldset" row>
                            <legend className="col-form-label sm-10">Student or Teacher?</legend>

                            <FormGroup check>
                                <Label check>
                                    <input type="radio" name="userTypeBox" value="Student"/>
                                    Student
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <input type="radio" name="userTypeBox" value="Professor"/>
                                    Professor
                                </Label>
                            </FormGroup>
                        </FormGroup>

                        <input className='btnClk logBtn' type="button" value="REGISTER" id="loginButton"/>
                    </form>
                </div>

            </div>

        )
    }
}

export default signup;