import axios from "axios";

class CartService {

  baseUrl = "http://localhost:9191";

  findAll() {
    return axios.get(`${this.baseUrl}/getAllCart`
      // ,{headers:{
      //     Authorization: `Bearer ${token}`
      //     // 'Accept': 'application/json',
      //     // 'Content-Type': 'application/json' 
      //  }}
    );
  }

  getCartByUserId(id) {
    return axios.get(`${this.baseUrl}/getCartByUserId/${id}`);
  };

  deleteCartById(id) {
    return axios.delete(`${this.baseUrl}/remove/${id}`);
  }
  emptyCart() {
    return axios.delete(`${this.baseUrl}/emptyCart`);
  }

  addCardData(cardData) {
    console.log("Cart Data : ",cardData);
   return axios.post(`${this.baseUrl}/createCart`,cardData);
 };


  updateCartById(id,data){
    return axios.put(`${this.baseUrl}/updateCartById/${id}`,data)
  }
}

export default new CartService();