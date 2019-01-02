import React, { Component } from 'react';
import HomePage from './components/homepage.js'
import { Switch, Route } from 'react-router-dom'
import StudentPage from "./components/studentpage.js";


class App extends Component {
  render() {
    return (
      <div className="App">
     
     <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/roster' component={StudentPage}/>

    </Switch>
    
      </div>
    );
  }
}

export default App;

