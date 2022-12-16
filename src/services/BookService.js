import axios from "axios";
let token=localStorage.getItem('token')
 console.log(token)

let config = {"headers": {
                   "Authorization": "Bearer " + token, 
                   "content-type": "application/json"
                }
             }

             console.log(config)

             

class BookService {


    baseUrl = "http://localhost:9191";

//    addBook(data) {
//        console.log("User Data : ",data);
//       return axios.post(`${this.baseUrl}/insert`,data);
//     };

    findAll() {
        return axios.get(`${this.baseUrl}/getAllBook`
        // ,{headers:{
        //     Authorization: `Bearer ${token}`
        //     // 'Accept': 'application/json',
        //     // 'Content-Type': 'application/json' 
        //  }}
         );
      }

//     userLogin(data) {
//       console.log("User Data : ",data);
//      return axios.post(`${this.baseUrl}/login`,data);
//    };

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

export default new BookService();