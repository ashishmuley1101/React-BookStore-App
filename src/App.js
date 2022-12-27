import React from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import "./components/home.scss"
import UserRegistrationForm from "./components/userregistration-form"
import Login from "./components/login-form"
import ForgetPassword from './components/forgetPassword-form';
import Home from "./components/home"
import Cart from "./components/cart"
import Order from "./components/order";
import OrderCancel from "./components/orderCancel";

function App(){
  
  return (
    <div className="App">
      {/* <Headers/> */}
      <Router>
        <Switch>
          <Route exact path="/"><Login/></Route>
          <Route  path="/userregistration"><UserRegistrationForm/></Route>
          <Route  path="/home"><Home/></Route>
          <Route  path="/cart"><Cart/></Route>
          <Route path="/order"><Order/></Route>
          <Route path="/orderCancel"><OrderCancel/></Route>
          <Route  path="/forgetPassword"><ForgetPassword/></Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App