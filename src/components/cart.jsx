import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, TextField } from "@mui/material";
import CartService from "../services/CartService";
import React, { Component, useState } from "react";
import "./home.scss";
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import Swal from 'sweetalert2'
import Stepper from '@mui/material/Stepper';
import Headers from "./headers";
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import OrderService from "../services/OrderService";
import { withRouter} from "react-router-dom";

class cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carts: [],
      quantity: '',
      activeStep: 0,
      address: '',
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

  onValueChange = (event) => {

    this.setState({
      address: event.target.value
    })
  }

  checkValues = () => {
    console.log(this.state)
  }

  handleNext = () => {

    if (this.state.activeStep < 3) {
      this.setState((prevState) => ({
        activeStep: prevState.activeStep + 1
      }))
    }
  };

  handleBack = () => {

    if (this.state.activeStep > 0) {
      this.setState((prevState) => ({
        activeStep: prevState.activeStep - 1
      }))
    }
  };

  removeCartById(cartId) {
    console.log("Cart id : ", cartId);
    var v1 = parseInt(cartId);
    CartService.deleteCartById(v1);
    return Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
        window.location.reload();
      }
    })
  }

  empty() {
    CartService.emptyCart();
    return Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Empty cart.!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Empty..!',
          'Your cart empty now.',
          'success'
        )
        window.location.reload();
      }
    })

  }

  updateQuantityByCartId = (cartId, bookId, newQuantity) => {
    console.log("Cart id :", cartId)
    console.log("book id :", bookId)
    console.log("quantity :", newQuantity)


    let cartData = {
      userId: localStorage.getItem("id"),
      bookId: bookId,
      quantity: newQuantity
    }
    CartService.updateCartById(cartId, cartData).then((data) => {
      console.log(data);
      console.log("Book id :", data.data.data.book.bookId)
    })

    window.location.reload();
  }

  onNameChange() {
    this.setState({
      quantity: this.state.quantity
    })
  }

  order = () => {

    let newAddress = {
      address: this.state.address
    }
    console.log(newAddress);
    var v1 = localStorage.getItem("id")
    console.log("userId", v1)

    OrderService.postOrder(v1, newAddress).then((response) => {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully..!',
        showConfirmButton: true
        
      })
      // alert("OrderPlaced Successfully")
      this.props.history.push("/order", { from: "Cart" });
      
    }).catch((err)=> {
      console.log("Error Incorrect Fields..!");
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No Book Added in Cart..!',
        showConfirmButton: true
      });
    })
  
  }

  render() {
    return (
      <div>
        <div>
          <Headers />

          <div className="main-content">
            <Container>
              <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                <Step>
                  <StepLabel>
                    Total Cart Item : {this.state.carts.length}</StepLabel>

                  <StepContent>
                    <div className="book">

                      <Box height="570px" sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignContent: "stretch",
                        gap: "30px",
                        marginLeft: "120px",
                        marginTop: "-45px",
                        justifyContent: "center"
                      }}
                      >
                        {this.state.carts && this.state.carts.map((carts) => (

                          <Card sx={{
                            height: "95%",
                            display: "flex",
                            flexDirection: "column",
                            border: "2px solid",
                            borderColor: "blue",
                            padding: "10px",

                          }}
                          >
                            <FormControl >

                              <CardActionArea >

                                <CardMedia
                                  component="img"
                                  alt="green iguana"
                                  height="250px"
                                  weight="100px"
                                  src={carts.book.bookImg}

                                />
                                <CardContent>
                                  <h2>{carts.book.bookName}</h2>
                                  <h3>By {carts.book.authorName}</h3>
                                  <h4>MRP Rs. {carts.book.price}</h4>
                                  <div> <h4>Quantity :

                                    <div >
                                      <button type="button"
                                        onClick={() => this.updateQuantityByCartId(carts.cartId, carts.book.bookId,
                                          carts.quantity - 1)}>-</button>
                                      <input type="number" padding="0px" min="1" max="10" size="small" placeholder={carts.quantity} />
                                      <button type="button"
                                        onClick={() => this.updateQuantityByCartId(carts.cartId, carts.book.bookId,
                                          carts.quantity + 1)}>+</button>
                                    </div>

                                  </h4></div>
                                  <h4>Total Rs. {carts.totalPrice}</h4>
                                  <div >
                                    <Button variant="outlined" color="primary"
                                      onClick={() => this.removeCartById(carts.cartId)}>Remove</Button>
                                  </div>
                                </CardContent>
                              </CardActionArea>

                            </FormControl>
                          </Card>
                        ))}

                        <div>
                          <CardActions style={{
                            position: "absolute", fontSize: "30px", color: "black", bottom: 10, right: "45%",
                            fontFamily: "-moz-initial", transform: "translateX(40%)"
                          }} >

                            <Stack display='flex' spacing={2} direction='row'>


                              <Button variant="contained" color="primary" size="small" sx={{ justifyContent: "center" }}
                                onClick={() => this.empty()}
                              >CART EMPTY
                              </Button>

                              <Button variant='contained' onClick={this.handleNext} sx={{ marginLeft: '35%' }}>Continue</Button>

                            </Stack>

                          </CardActions>
                        </div>
                      </Box>
                    </div></StepContent>
                </Step>
                <Step>
                  <StepLabel fontSize="10px"> Customer Details </StepLabel>
                  <StepContent>

                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '30ch', },
                      }}

                      display='flex'
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="left"
                    >
                      <form className='registerBox'>

                        <Box sx={{ mx: '14px' }}
                          width="500px"
                          display='flex'
                          flexDirection='row'
                        >
                          <TextField
                            required

                            rows={4}

                            placeholder="Enter Your Delivery Address..!"
                            name='address'
                            style={{
                              width: '100%', height: '40%',
                              fontSize: '15px'
                            }}
                            onChange={this.onValueChange}
                          />
                        </Box>&nbsp;

                        <Box sx={{ mx: '8px' }}
                          display='flex'
                          flexDirection='row'
                          justifyContent='right'
                        >
                          <Button variant='contained' onClick={this.handleBack}>Back</Button> &nbsp; &nbsp;
                            <Button variant='contained' onClick={this.order} >Place Order</Button>
                        </Box>
                      </form>
                    </Box>
                  </StepContent>
                </Step>

              </Stepper>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(cart);