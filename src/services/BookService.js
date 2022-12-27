import axios from "axios";
// let token = localStorage.getItem('token')
// console.log(token)

// let config = {"headers": {
//                    "Authorization": "Bearer " + token, 
//                    "content-type": "application/json"
//                 }
//              }

//              console.log(config)

// axios.interceptors.request.use(
//     config)=config.headers.authorization




class BookService {


  baseUrl = "http://localhost:9191";

 

  findAll() {
    return axios.get(`${this.baseUrl}/getAllBook`
      // ,{headers:{
      //     Authorization: `Bearer ${token}`
      //     // 'Accept': 'application/json',
      //     // 'Content-Type': 'application/json' 
      //  }}
    );
  }

  searchBook(bookName) {
    console.log("Book name : ", bookName);
    return axios.get(`${this.baseUrl}/searchBookByName/${bookName}`);
  };

  sortLower() {
    return axios.get(`${this.baseUrl}/sortAsc`);
  };

  sortHigher() {
    return axios.get(`${this.baseUrl}/sortDesc`);
  };

}

export default new BookService();