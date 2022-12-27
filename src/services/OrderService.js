import axios from "axios";

class OrderService {

  baseUrl = "http://localhost:9191";

  postOrder(id,data) {
    console.log("Order Data : ",data);
   return axios.post(`${this.baseUrl}/bookOrder/${id}`,data);
  };

 getOrdersByUserId(userId) {
    return axios.get(`${this.baseUrl}/getOrderByUserId/${userId}`);
  };

  findAll(){
    return axios.get(`${this.baseUrl}/getAllOrder`)
  };

  cancelOrderByOrderId(id) {
    return axios.delete(`${this.baseUrl}/cancelOrder/${id}`);
  };

}

export default new OrderService();