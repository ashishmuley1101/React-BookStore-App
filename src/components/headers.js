import { Component } from "react";
import './userregistration-form.scss'
import logo from "../assets/logo3.png"


class Headers extends Component{
    render(){
        return(
            <div>
            <header class="header-content header">
                <div class="logo-content">
                    <img src={logo} alt="logo" width="100px" />
                    <div>
                        <span class="addressBook-text">Book</span>
                        <br />
                        <span class="addressBook-text addressBook-book">Store</span>
                    </div>
                </div>
            </header>
            </div>
        )
    }
}

export default Headers;