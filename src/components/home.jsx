import React, { Component, useState } from "react";
import "./home.scss";
import { withRouter, Link } from "react-router-dom";
import BookService from "../services/BookService";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Swal from 'sweetalert2'
import cardIm1 from "../assets/IndiaStory1.jpg"
// import cardImg2 from "../assets/WingsOfFire2.jpg"
// import cardImg3 from "../assets/letuseC3.jpg"
// import cardImg4 from "../assets/login1.jpg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { blue } from "@mui/material/colors";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookStore: [],
        };

    }

    // const[anchorEl, setAnchorEl] = useState();

    // const open = Boolean(anchorEl);

    // const handleClick(event) {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    fetchData() {
        BookService.findAll().then((response) => {
            console.log(response.data);
            this.setState({ bookStore: response.data.data });

            
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    // deleteAddressBook(perId) {
    //     console.log("Person id", perId);
    //     AddressBookService.deleteAddress(perId);
    //     return Swal.fire({
    //         title: 'Are you sure?',
    //         text: `${perId.name}You won't be able to revert this!`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           Swal.fire(
    //             'Deleted!',
    //             'Your data has been deleted.',
    //             'success'
    //           )
    //           window.location.reload();
    //         }
    //       })

    // }

    // updateAddressBook(perId) {
    //     console.log("Person id", perId)
    //     this.props.history.push(`AddressBookForm/${perId}`);
    // };



    render() {
        return (

            <div>

                <div>
                    <div className="main-content">
                        <div className="header-content employee-header">
                            <div className="emp-detail-text">
                                Book Store Details
                                <div className="emp-count">{this.state.bookStore.length}</div>
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <div>
                                <TextField
                                    id="filled-search"
                                    label="Book Serach"
                                    type="search"
                                    
                                    variant="filled"
                                />
                                
                            </div>


                            <div>
                                <ShoppingCartIcon size="large" style={{
                                    position: "absolute", color: "blue", bottom: 550, right: "20%",
                                    transform: "translateX(50%)"
                                }} />
                            </div>


                            <div >
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Box
                                                m={1}
                                                //margin
                                                display="flex"
                                                justifyContent="flex-end"

                                            >

                                                <Button variant="contained" style={{
                                                    position: "absolute", bottom: 550, right: "10%",
                                                    transform: "translateX(50%)"
                                                }}  {...bindTrigger(popupState)}>
                                                    UserDetails
                                                </Button></Box>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                                <MenuItem onClick={popupState.close}>My account</MenuItem>
                                                <Link to="/" style={{ textDecoration: 'none' }} >
                                                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                                                </Link>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </div>


                        </div>
                        <div className="book">
                            <Box sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignContent: "stretch",
                                bgcolor: 'background.paper',
                                gap: "80px",
                                marginLeft: "70px",
                                marginTop: "0px",
                            }}
                            >
                                {this.state.bookStore && this.state.bookStore.map((bookStore) => (
                                    <p key={bookStore.id}>

                                        <Card sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            border: "2px solid",
                                            borderColor: "blue",
                                            padding: "20px",

                                        }}
                                        >
                                            <FormControl>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="green iguana"
                                                        height="200"
                                                        weight="50"
                                                        image={cardIm1}

                                                    />
                                                    <CardContent>
                                                        <h2>{bookStore.bookName}</h2>
                                                        <h3>{bookStore.authorName}</h3>
                                                        <h3>Rs. {bookStore.price}</h3>
                                                        <Button variant="contained" color='primary' >ADD TO CART</Button>
                                                    </CardContent>
                                                </CardActionArea>

                                            </FormControl>
                                        </Card></p>
                                ))}
                            </Box>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default withRouter(Home);