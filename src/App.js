import React from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import "./components/home.scss"
import UserRegistrationForm from "./components/userregistration-form"
import Login from "./components/login-form"
import Headers from "./components/headers"
import ForgetPassword from './components/forgetPassword-form';
import Home from "./components/home"

function App(){
  
  return (
    <div className="App">
      <Headers/>
      <Router>
        <Switch>
        <Route exact path="/"><Login/></Route>
          <Route  path="/userregistration"><UserRegistrationForm/></Route>
          <Route  path="/home"><Home/></Route>
          <Route  path="/forgetPassword"><ForgetPassword/></Route>
          {/* <Route path="/AddressBookForm/:perId"><AddressBookForm/></Route> */}
        </Switch>
      </Router>
    </div>
  );
  }

export default App