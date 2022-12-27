import React, { Component } from "react";
import "./home.scss";
import { withRouter } from "react-router-dom";
import BookService from "../services/BookService";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, FormControl, Select } from "@mui/material";
import Swal from 'sweetalert2'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Headers from "./headers";
import CartService from "../services/CartService"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookStore: [],
            search: "",
        };

    }

    fetchData() {
        BookService.findAll().then((response) => {
            console.log(response.data);
            this.setState({ bookStore: response.data.data });


        });
    }

    sortLower = () => {
        console.log("Sort Lower")
        BookService.sortLower().then((response) => {
            this.setState({ bookStore: response.data.data })
        }).catch((err) => {
            console.log(err);
        })

    }

    sortHigher = () => {
        console.log("Sort Lower")
        BookService.sortHigher().then((response) => {
            this.setState({ bookStore: response.data.data })
        }).catch((err) => {
            console.log(err);
        })

    }

    componentDidMount() {
        this.fetchData();
    }

    addCard(bookId) {
        let cardData = {
            userId: localStorage.getItem("id"),
            bookId: bookId,
            quantity: 1
        }
        CartService.addCardData(cardData).then((data) => {
            console.log(data);
            console.log("Book id :", data.data.data.book.bookId)

            Swal.fire({
                icon: 'success',
                title: 'Book Added to Cart.!',
                showConfirmButton: false,
                timer: 1500,
            })
            window.location.reload();

        }).catch((err) => {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please Login for Continue..!',
                showConfirmButton: true
            });
        })
        // window.location.reload();

    }

    handleSearch = (event) => {
        event.preventDefault();
        let search = event.target.value
        console.log(search)
        BookService.searchBook(search).then((response) => {
            this.setState({ bookStore: response.data.data })
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {
        return (
            <div>
                <div>
                    <Headers />
                    <div className="main-content">

                        <div className="header-content employee-header">

                            <div className="emp-detail-text">
                                Book Store Details
                                <div className="emp-count">{this.state.bookStore.length}</div>
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div style={{
                                margin: "auto",
                                padding: "15px",
                                maxWidth: "600px",
                                alignContent: "center"
                            }}

                            >
                                <TextField type="search" placeholder="Search Book"
                                    onChange={this.handleSearch}
                                />
                            </div>

                            <div >
                                <InputLabel id="sort_by" style={{
                                    position: "absolute", bottom: 585, left: "82%", color: "blue",
                                }}>Sort By Price :</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Sort by"
                                    style={{
                                        position: "absolute", bottom: 530, left: "82%", color: "blue", paddingRight: "45px"
                                    }}>
                                    <MenuItem value="low_to_high" id="low_to_high" onClick={this.sortLower}>Low to High</MenuItem>
                                    <MenuItem value="high_to_low" id="high_to_low" onClick={this.sortHigher}>High to Low</MenuItem>
                                </Select>
                            </div>

                        </div>
                        <div className="book">
                            <Box sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignContent: "stretch",
                                gap: "60px",
                                marginLeft: "80px",
                                marginTop: "-30px",

                            }}>
                                {this.state.bookStore && this.state.bookStore.map((bookStore) => (
                                    <p key={bookStore.id}>

                                        <Card sx={{
                                            height: "95%",
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
                                                        height="250px"
                                                        weight="100px"
                                                        src={bookStore.bookImg}

                                                    />
                                                    <CardContent>
                                                        <h2>{bookStore.bookName}</h2>
                                                        <h3>By {bookStore.authorName}</h3>
                                                        <h3>Rs. {bookStore.price}</h3>

                                                        {bookStore.quantity === 0 ? <Button variant="contained" color='primary' disabled="true" >OUT OF STOCK</Button> :
                                                            <Button variant="contained" color='primary' onClick={() => this.addCard(bookStore.bookId)} >ADD TO CART</Button>}

                                                    </CardContent>
                                                </CardActionArea>
                                            </FormControl>
                                        </Card>
                                    </p>
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