import React from 'react';
import $ from "jquery";
import localStorage from 'localStorage'

export default class Example extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name]: evt.target.value
            });
        };

    }

    componentWillMount() {
        let endpoint_API = "http://quyzygy.us/";

        $(window).on('load', function () {
            $.ajax({
                url: endpoint_API + "myQuizzes?sk=" + localStorage.getItem('sk'),
                type: "GET",
                crossDomain: true,
                success: function (response) {
                    $.each(response, function (key, value) {
                        $('tbody').append(`<tr>
                            <td class="Quiz name">${value.QuizName}</td>
                            <td class="Course name">${value.CourseName}</td>
                            <td class="Course name">${value.Duration}</td>
                            <td class="Questions">${value.Questions}</td>
                         </tr>`);
                    })
                },
                error: function (xhr, status) {
                    alert("error");
                }
            });

        });

    }


    render() {
        if (window.location.href.indexOf('reload')===-1) {
            window.location.replace(window.location.href+'?reload');
        }
        return (

            <div>
                <h2>My Quizes</h2>
                <table border="1">
                    <tbody>
                    <tr>
                        <th> Quiz name</th>
                        <th> Course Name</th>
                        <th> Duration</th>
                        <th> Questions</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        )

    }

}