
import './userregistration-form.scss'
import logo from "../assets/logo3.png"
import React, { Component } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { Box, Button, Card,  } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartService from '../services/CartService';

class Headers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carts: [],

        };
    }

    fetchData() {
        CartService.getCartByUserId(localStorage.getItem('id'))
            .then((responce) => {
                console.log("cart ok");
                console.log(responce)
                this.setState({ carts: responce.data.data })
            })
    }

    componentDidMount() {
        this.fetchData();
    }

    getName() {
        let nm = localStorage.getItem('name');
        console.log("User Name : ", localStorage.getItem('name'))
        return nm;
    }


    onClick() {
        localStorage.clear()  
     }

    render() {
        return (
            <div>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src={logo} alt="logo" width="100px" />

                        <div>
                            <Link to="/home" style={{ textDecoration: 'none' }}>
                                <span class="addressBook-text">Book</span>
                                <br />
                                <span class="addressBook-text addressBook-book">Store</span>
                            </Link>
                        </div>
                        <div>

                            <Link to="/cart" style={{ textDecoration: 'none' }}>
                                <ShoppingCartIcon size="large" style={{
                                    color: "blue",
                                    position: "absolute", bottom: 630, right: "18%",
                                    transform: "translateX(50%)",

                                }} />
                                <span style={{
                                    color: "blue", fontSize: "18px",
                                    position: "absolute", bottom: 648, right: "18%",
                                    transform: "translateX(50%)"
                                }}>{this.state.carts.length}</span>
                            </Link>
                        </div>


                        <div >
                            <PopupState variant="dialog" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Box
                                            m={1}
                                            //margin
                                            display="flex"
                                            justifyContent="flex-end"
                                        >

                                            <Button color='primary' variant="contained" style={{
                                                position: "absolute", bottom: 630, right: "10%",
                                                transform: "translateX(50%)",
                                            }}  {...bindTrigger(popupState)}>
                                                 {localStorage.getItem('id') === null ? 'welcome' : this.getName()}
                                            </Button></Box>
                                        <Menu {...bindMenu(popupState)}>
                                            <Link to="/userregistration" style={{ textDecoration: 'none' }} >
                                                <MenuItem onClick={popupState.close}>{localStorage.getItem('id') === null ? 'New Registration' : 'Edit Profile'}</MenuItem>
                                            </Link>

                                            <Link to="/orderCancel" style={{ textDecoration: 'none' }} >
                                                <MenuItem onClick={popupState.close}>{localStorage.getItem('id') === null ? 'Order' : 'My Order'}</MenuItem>
                                            </Link>

                                            <Link to="/" style={{ textDecoration: 'none' }} >
                                                <MenuItem onClick={this.onClick }>{localStorage.getItem('id') === null ?  'Login' : 'Logout'}</MenuItem>
                                            </Link>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        </div>
                    </div>

                </header>
            </div>
        )
    }
}

export default Headers;