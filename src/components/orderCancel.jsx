import React, { Component } from "react";
import "./home.scss";
import { withRouter } from "react-router-dom";
import OrderService from "../services/OrderService";
import { Button } from "@mui/material";
import Headers from "./headers";

class OrderCancel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderCancel: [],
            cancel: '',
        };
    }

    fetchData() {
        OrderService.getOrdersByUserId(localStorage.getItem("id")).then((response) => {
            console.log(response.data.data);

            this.setState({
                orderCancel: response.data.data

            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    handelCancel = (event) => {
        this.setState({
            cancel: event.target.value
        })
    }

    cancelOrder = (id) => {
        console.log("order id :", id)

        OrderService.cancelOrderByOrderId(id).then((data) => {
            console.log(data);
            console.log("Order id :", data.data.data.book.bookId)
        })
        window.location.reload();
    }

    render() {
        return (
            <div>

                <div>
                    <Headers />
                    <div className="main-content">

                        <div className="table-main">
                            <table id="table-display" className="table">
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>Order Status</th>
                                        <th>Order Date</th>
                                        <th>Order Quantity</th>
                                        <th>Total Price</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.orderCancel && this.state.orderCancel.map((orderCancel, i) => (
                                        <tr key={orderCancel.id}>

                                            <td>{i + 1}</td>
                                            <td>{orderCancel.cancel === false ? 'Ready to be Delivered' : 'Order Cancelled'}</td>
                                            <td>{orderCancel.orderDate}</td>
                                            <td>{orderCancel.quantity}</td>
                                            <td>{orderCancel.totalPrice}</td>
                                            <td>{orderCancel.cancel === false ?
                                                <Button type="sumit" variant="contained" size="small" color="info" onChange={this.handelCancel}
                                                    onClick={() => this.cancelOrder(orderCancel.orderId)}>Cancel</Button> :
                                                <Button type="sumit" disabled="true" variant="contained" size="small" color="info" >Cancel</Button>
                                            }</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default withRouter(OrderCancel);