import React, { Component } from 'react';
import HomePage from './components/homepage.js'
import { Route } from 'react-router-dom'
import StudentPage from "./components/studentpage.js";
import StudentQuiz from "./components/StudentQuiz.js";
import ProfPage from './components/profpage.js'

class App extends Component {
  render() {
    return (
      <div className="App">
     
      <Route exact path='/' component={HomePage}/>
      <Route path='/studentPage' component={StudentPage}/>
      <Route path='/StudentQuiz' component={StudentQuiz}/>
      <Route path='/profPage' component={ProfPage}/>


      </div>
    );
  }
}

export default App;

