import axios from "axios";


class UserService {
    baseUrl = "http://localhost:9191";

    userRegistration(data) {
       console.log("User Data : ",data);
      return axios.post(`${this.baseUrl}/register`,data);
    };

    userLogin(data) {
      console.log("User Data : ",data);
     return axios.post(`${this.baseUrl}/login`,data);
   };

    // findAll() {
    //   return axios.get(`${this.baseUrl}/getAll`);
    // }

    // deleteAddress(id) {
    //   return axios.delete(`${this.baseUrl}/delete/${id}`);
    // };

    // findPersonById(id) {
    //   return axios.get(`${this.baseUrl}/getById/${id}`);
    // };

    // updateAddressBook(id,data){
    //   return axios.put(`${this.baseUrl}/update/${id}`,data)
    // }
}

export default new UserService();