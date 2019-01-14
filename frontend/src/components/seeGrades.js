import React from 'react';
import $ from "jquery";
import localStorage from 'localStorage'
import { Table} from 'react-bootstrap';
import logo from "../assets/logo2.png";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';


export default class seeGrades extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (window.location.href.indexOf('reload') === -1) {
            window.location.replace(window.location.href + '?reload');
        }
        return (

            <div className='SeeGrades'>

                <Navbar id='navbar' dark expand="md" fixed="top" height='40px'>
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" height='30px'/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/studentPage">MyPage</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Log out</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>


                <div id='gradesTable'>
                    <h2>My Grades</h2>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th> Quiz name</th>
                            <th> Grade</th>
                            <th> Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }

    componentWillMount() {
        let endpoint_API = "http://quyzygy.us/";
        let QuizId;

        $(window).on('load', function () {

            $.ajax({
                url: endpoint_API + "myGrades?sk=" + localStorage.getItem('sk'),
                type: "GET",
                crossDomain: true,
                success: function (response) {
                    console.log(response);
                    $.each(response, function (key, value) {
                        QuizId = value.QuizID;
                        $('tbody').append(`<tr>
                             <td class="Quiz name">${value.QuizID}</td>
                            <td class="Grade">${value.Value}</td>
                            <td class="Date">${value.Date}</td>
                         </tr>`);
                    })
                },
                error: function (xhr, status) {
                    alert("error");
                }
            });
        });

    }

}