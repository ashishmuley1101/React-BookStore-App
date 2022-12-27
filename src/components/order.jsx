import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import orderImg from '../assets/orderSucc.png'
import OrderService from '../services/OrderService';

class Order extends Component {
    constructor(props){
        super(props);

        this.state={
            orders : [],
        }
    }

    fetchData(){
        OrderService.getOrdersByUserId(localStorage.getItem("id")).then(( response )=>{
            console.log(response.data.data);
            
            this.setState({
                orders: response.data.data
                           
            })             
        })    
    }

    componentDidMount(){        
        this.fetchData();
    }

    render() {
        return (
            <div>
                <Container>
                
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                sx={{ width:'100%', marginTop:'10px' }}> 
                    <img width='700px'  src={orderImg} alt="arrow"></img>
                    <Typography variant='h4' sx={{marginTop:'2px'}}>
                        Order Placed Successfully
                    </Typography>
                    
                    <center>
                    <Typography variant='h6' sx={{marginTop:'10px'}}>
                     Your order is confirmed <br/>
                    the order id is {this.state.orders.length}&nbsp;
                      save the order id for further communication.
                    </Typography>
                    </center>
    
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'  sx={{marginTop:'30px'}}>
                        Continue Shopping
                    </Button>
                    </Link>
                    
                </Box>
                </Container>
            </div>
        );
    }
}

export default withRouter(Order);
