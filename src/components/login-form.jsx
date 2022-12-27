import { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import './userregistration-form.scss'
import cardImg from "../assets/login1.jpg"
import Swal from 'sweetalert2'
import Button from '@mui/material/Button'
import { Stack, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import UserService from "../services/UserService";


function Login() {

    const [formValue, setForm] = useState({

        email: "",
        password: "",

    });

    // const params = useParams();
    // useEffect(() => {
    //     if (params.perId) {
    //         getAddressBookId(params.perId)
    //         console.log("Person Id : ", params.perId)

    //     }
    // }, []);
    // const getAddressBookId = (id) => {
    //     console.log(id)
    //     AddressBookService.findPersonById(id).then((response) => {
    //         let obj = response.data.data;
    //         console.log(obj);
    //         setData(obj)
    //     })

    // };

    // const setData = (obj) => {
    //     let array = obj.dateOfBirth;
    //     console.log("array ",array[0])
    //     console.log(obj.dateOfBirth);
    //     console.log(obj)
    //     setForm({
    //         ...formValue,
    //         ...obj,
    //         id: obj.id,
    //         name: obj.name,
    //         address: obj.address,
    //         city: obj.city,
    //         state: obj.state,
    //         zipCode:obj.zipCode,
    //         email: obj.email,
    //         phoneNumber: obj.phoneNumber,
    //         isUpdate: true,
    //         day: array[8] + array[9],
    //         month: array[5] + array[0],
    //         year: array[0] + array[1] + array[2] +array[3],

    //     });
    // };

    const onReset = () => {
        setForm({
            email: "",
            password: "",
        });
    };

    const history = useHistory()

    const onSubmit = (event) => {
        event.preventDefault();

        let loginObject = {
            email: formValue.email,
            password: formValue.password,
        };

        console.log("loginObject Obj data", loginObject);

        if (!loginObject.email || !loginObject.password)
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });

        //     if (formValue.isUpdate) {
        //         AddressBookService.updateAddressBook(params.perId, addressBookObject)
        //             .then(response => {
        //                 console.log(" Success Data ", response.data.data);

        //                 return Swal.fire({
        //                     icon: 'success',
        //                     title: 'Added!',
        //                     text: `${addressBookObject.name}'s data has been Updated.`,
        //                     showConfirmButton: false,
        //                     timer: 2500,
        //                     //   ti:window.location.reload()
        //                 })
        //             }).catch(err => {
        //                 console.log("Error Incorrect Fields..!");
        //                 return Swal.fire({
        //                     icon: 'error',
        //                     title: 'Error!',
        //                     text: 'Check all fields again.!',
        //                     showConfirmButton: true
        //                 });
        //             })
        //     }
        else {
            UserService
                .userLogin(loginObject).then(response => {

                    try {
                        console.log(" Success Data ", response.data.data);
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('name', response.data.data.firstName)
                        localStorage.setItem('id', response.data.data.userId)
                        console.log("Get token : ", localStorage.getItem('token'))
                        console.log("First Name : ", localStorage.getItem('name'))
                        console.log("User id : ", localStorage.getItem('id'))

                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successfully.!',
                            text: `'Welcome to Book Store.`,
                            showConfirmButton: false,
                            timer: 1500,

                        })
                        history.push("/home")
                    } catch (err) {
                        console.log("Error Incorrect Fields..!");
                        return Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Incorrect Email or Passwaord..!',
                            showConfirmButton: true
                        })
                    }
                }).catch(error => {
                    console.log("Error Incorrect Fields..!");
                    return Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Incorrect Email or Passwaord..!',
                        showConfirmButton: true
                    });

                })

        }

    }

    const onnameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }


    return (
        <div>
            <div class="form-content">
                <form class="form" >
                    <Card >
                        <div>
                            <div style={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    weight="690"
                                    title="Person Address Form"
                                    image={cardImg}
                                />

                                <div style={{
                                    position: "absolute", fontSize: "32px", color: "white", bottom: 70, right: "7%",
                                    fontFamily: "-moz-initial", transform: "translateX(10%)",
                                }}>USER LOGIN FORM
                                </div>

                            </div>&nbsp;

                            <div class="form-constrains">

                                <div class="row-content">
                                    <TextField type="text" name="email" fullWidth className="input" variant='outlined'
                                        placeholder="Enter Your Email" id="email" label="Email" required
                                        value={formValue.email} onChange={onnameChange}
                                    />
                                </div>&nbsp;

                                <div class="row-content">
                                    <TextField type="password" name="password" fullWidth variant='outlined'
                                        placeholder="Enter Your Password" id="password" label="Password" required
                                        value={formValue.password} onChange={onnameChange}
                                    />
                                </div>&nbsp;

                                <div class="row-content">

                                    <Button variant="contained" color="secondary" fullWidth size='large'
                                        onClick={onSubmit}>LOGIN
                                    </Button>


                                </div>&nbsp;

                                <CardActions style={{ justifyContent: 'center' }} >

                                    <Stack display='block' spacing={8} direction='row'>

                                        <Link to="/forgetPassword" style={{ textDecoration: 'none' }}>
                                            <Button variant="outlined" color="secondary" size="large" sx={{ justifyContent: "center" }}
                                            >Forget Password ?
                                            </Button>
                                        </Link>

                                        <Link to="/userregistration" style={{ textDecoration: 'none' }}>
                                            <Button variant="outlined" color="secondary" size="large"
                                            >NEW REGISTRATION
                                            </Button>
                                        </Link>

                                    </Stack>

                                </CardActions>
                            </div>
                        </div>
                    </Card>
                </form>
            </div >
        </div >

    );
}


export default Login;