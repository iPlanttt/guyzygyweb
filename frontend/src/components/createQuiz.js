import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import localStorage from 'localStorage';


const contentStyle = {
    maxWidth: "600px",
    width: "90%"
};


class CreateQuiz extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        let endpoint_API = "http://quyzygy.us/";
        var json = ["1","2","3"]

        $(window).on('load', function () {
            $("#save").on('click', function () {

                console.log("sdfsdfds");

                $.ajax({
                    url: endpoint_API + "createQuiz?sk=" + localStorage.getItem('sk'),
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ Author:localStorage.getItem('email'), Text: $("#qText").val(), Type: $("#Type").val(),Answers:json,Points: $("#Points").val(),CorrectAnswer: $("#CorrA").val()}),
                    crossDomain: true,
                    success: function (response) {
                        console.log(response)

                    },
                    error: function (xhr, status) {
                        alert("error");
                    }
                });
            });
        });

    }

    render() {

        if (window.location.href.indexOf('reload')===-1) {
            window.location.replace(window.location.href+'?reload');
        }
        return (

            <div id='loginForm'>
                <form>
                    <h2>create a question</h2>
                    <div className='block'>
                        <label htmlFor="qText" >Question content</label>
                        <input type="text" id="qText"/>
                    </div>
                    <div className='block'>
                        <label htmlFor="Type" >Type</label>
                        <input type="text" id="Type"/>
                    </div>
                    <div className='block'>
                        <label htmlFor="Points" >Type</label>
                        <input type="text" id="Points"/>
                    </div>
                    <div className='block'>
                        <label htmlFor="CorrA" >Type</label>
                        <input type="text" id="CorrA"/>
                    </div>

                    <input className='btnClk saveBtn' type="button" value="save" id="save"/>
                </form>
            </div>



        )
    }



}

export default CreateQuiz;