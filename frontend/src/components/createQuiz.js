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
            $("#qText00").val(localStorage.getItem('email'));
            $("#qt0").val(localStorage.getItem('email'));
            refreshMyQuestions();
            $("#save").on('click', function () {
                $.ajax({
                    url: endpoint_API + "createQuiz?sk=" + localStorage.getItem('sk'),
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ Author:localStorage.getItem('email'), CourseName: $("#qText01").val(), QuizName: $("#qText02").val(),Duration:(parseInt($("#qText03").val()) * 60),Questions: $("#qText05").val(),Public: ($("#qText06").checked)?1:0, Geofencing:($("#qText07").checked)?1:0}),
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
        function refreshMyQuestions(){
            $.get(endpoint_API + "myQuestions?sk=" + localStorage.getItem('sk'), function(data){
                $('#qstt tbody').empty();
                 for (let i = 0; i < data.length; i++){
                     let ht = "<tr>"
                     ht += "<td>";
                     ht += data[i].id;
                     ht += "</td>";
                     ht += "<td>";
                     ht += data[i].Text;
                     ht += "</td>";
                     ht += "<td>";
                     ht += data[i].Answers;
                     ht += "</td>";
                     ht += "<td>";
                     ht += data[i].Type;
                     ht += "</td>";
                     ht += "<td>";
                     ht += data[i].CorrectAnswer;
                     ht += "</td>";
                     ht += "<td>";
                     ht += data[i].Points;
                     ht += "</td>";
                     ht += "</tr>";
                     $("#qstt").append(ht);
                 }
             });
             $("#qt2").on('change', function(){
                 console.log($("#qt2").val());
                if ($("#qt2").val() === "SingleAnswer"){
                    $('#qt03').html("<fieldset> <label>Option 1:</label> <input type='radio' name='opt' id='a11'/> <input type='text' id='a12'/> </br> <label>Option 2:</label> <input type='radio' name='opt' id='a21'/> <input type='text' id='a22'/> </br> <label>Option 3:</label> <input type='radio' name='opt' id='a31'/> <input type='text' id='a32'/> </br> <label>Option 4:</label> <input type='radio' name='opt' id='a41'/> <input type='text' id='a42'/> </fieldset>");
                }
                else{
                    $("#qt03").html("<label>Answer:</label><input type='text' id='qt000'/>");
                }
             });
             $("#saveQue").on('click', function(){
                let t = $("#qt2").val();
                let ca;
                let opt = [];
                if (t == "OpenAnswer"){
                    ca = $("#qt000").val();
                }
                else{
                    for (let i = 0; i < 4; i++){
                        opt.push($("#a"+ (i + 1) + "2").val());
                        if(document.getElementById('a' + (i + 1) + "1").checked){
                            ca = $("#a"+ (i + 1) + "2").val();
                        }
                    }
                }
                $.ajax({
                    url: endpoint_API + "createQuestion?sk=" + localStorage.getItem('sk'),
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({ Author:localStorage.getItem('email'), Text: $("#qt1").val(), Type: $("#qt2").val(), Answers:JSON.stringify(opt), CorrectAnswer:ca, Points:parseInt($("#qt045").val())}),
                    crossDomain: true,
                    success: function (response) {
                        console.warn(response);
                        refreshMyQuestions();
                    },
                    error: function (xhr, status) {
                        alert("error");
                    }
                });
             });
        }
    }

    
    render() {

        if (window.location.href.indexOf('reload')===-1) {
            window.location.replace(window.location.href+'?reload');
        }
        return (

            <div id='quizForm'>
                <form>
                    <h2>Create a quiz</h2>
                    <div className='block'>
                        <label htmlFor="qText00" >Author</label>
                        <input type="text" id="qText00" disabled/>
                    </div>
                    <div className='block'>
                        <label htmlFor="qText" >Course name</label>
                        <input type="text" id="qText01"/>
                    </div>
                    <div className='block'>
                        <label htmlFor="qText" >Quiz name</label>
                        <input type="text" id="qText02"/>
                    </div>
                    <div className='block'>
                        <label htmlFor="Type" >Duration (minutes)</label>
                        <input type="text" id="qText03"/>
                    </div>
                    <div className='block'>
                        <label htmlFor="CorrA" >Questions</label>
                        <input type="text" id="qText05"/>
                    </div>
                    <div className='block'>
                        <input type="checkbox" id='qText06'/>
                        <label htmlFor='qText06'>Public</label>
                    </div>
                    <div className='block'>
                        <input type="checkbox" id='qText07'/>
                        <label htmlFor='qText07'>Geofencing</label>
                    </div>
                    <div className='block'>
                    </div>
                    <input className='btnClk saveBtn' type="button" value="save" id="save"/>
                </form>
                
                <form>
                <h3>My questions:</h3>
            <table id="qstt">
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Question
                    </th>
                    <th>
                        Answers
                    </th>
                    <th>
                        Type
                    </th>
                    <th>
                        Correct answer
                    </th>
                    <th>
                        Points
                    </th>
                </tr>
            </table>
                </form>
               <center>
               <h3>Create question</h3>
                <form>
                <div className='block'>
                        <label htmlFor="qText" >Author</label>
                        <input type="text" id="qt0" disabled/>
                </div>
                <div className='block'>
                        <label htmlFor="qText" >Text</label>
                        <input type="text" id="qt1"/>
                </div>
                <div className='block'>
                    <label>Type:</label>
                    <select id="qt2">
                        <option>
                            SingleAnswer
                        </option>
                        <option>
                            OpenAnswer
                        </option>
                    </select>
                </div>
                <div className='block' id='qt03'>
                       
                </div>
                <div className='block'>
                       <label>Points</label>
                       <input type='text' id='qt045'></input>
                </div>
                <input className='btnClk saveBtn' type="button" value="save" id="saveQue"/>
                </form>
               </center>

            </div>

        )
    }



}

export default CreateQuiz;