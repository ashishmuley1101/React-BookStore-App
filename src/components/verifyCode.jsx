import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './userregistration-form.scss'
import cardImg from "../assets/login2.jpg"
// import Swal from 'sweetalert2'
import Button from '@mui/material/Button'
import { Stack, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
// import AddressBookService from "../services/AddressBookService";


function Verify() {

    const [formValue, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        dob: "",
        password: "",
        isUpdate: false,
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

    // const onReset = () => {
    //     setForm({
    //         name: "",
    //         address: "",
    //         city: "",
    //         state: "",
    //         zipCode: "",
    //         email: "",
    //         phoneNumber: "",
    //         dateOfBirth: "",
    //         day:"",
    //         month:"",
    //         year:"",

    //     });
    // };

    // const onSubmit = (event) => {
    //     event.preventDefault();

    //     let addressBookObject = {
    //         name: formValue.name,
    //         address: formValue.address,
    //         city: formValue.city,
    //         state: formValue.state,
    //         zipCode: formValue.zipCode,
    //         email: formValue.email,
    //         phoneNumber: formValue.phoneNumber,
    //         dateOfBirth: `${formValue.day} ${formValue.month} ${formValue.year}`

    //     };

    //     console.log("Address Obj data", addressBookObject);

    //     if (!addressBookObject.name || !addressBookObject.address || !addressBookObject.phoneNumber
    //         || !addressBookObject.city || !addressBookObject.state || !addressBookObject.zipCode ||
    //         !addressBookObject.email || !addressBookObject.dateOfBirth)
    //         return Swal.fire({
    //             icon: 'error',
    //             title: 'Error!',
    //             text: 'All fields are required.',
    //             showConfirmButton: true
    //         });

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
    //     else {
    //         AddressBookService
    //             .createAddressBook(addressBookObject).then(response => {
    //                 console.log(" Success Data ", response.data.data);

    //                 return Swal.fire({
    //                     icon: 'success',
    //                     title: 'Added!',
    //                     text: `${addressBookObject.name}'s data has been Added.`,
    //                     showConfirmButton: false,
    //                     timer: 2500,
    //                 })
    //             }).catch(error => {
    //                 console.log("Error Incorrect Fields..!");
    //                 return Swal.fire({
    //                     icon: 'error',
    //                     title: 'Error!',
    //                     text: 'Check all fields again.!',
    //                     showConfirmButton: true
    //                 });

    //             })
    //     }

    // }

    // const onnameChange = (event) => {
    //     setForm({ ...formValue, [event.target.name]: event.target.value });
    //     console.log('value for', event.target.name, event.target.value);
    // }


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
                                    position: "absolute", fontSize: "35px", color: "black", bottom: 90, right: "47%",
                                    fontFamily: "-moz-initial", transform: "translateX(10%)",
                                }}>USER LOGIN FORM
                                </div>

                                {/* <Link to='/home' style={{ textDecoration: 'none' }}>
                                    <CloseIcon style={{
                                        position: "absolute", color: "white", bottom: 5, right: "5%",
                                        transform: "translateX(50%)"}}/>                                                                  
                                </Link> */}
                            </div>&nbsp;

                            <div class="form-constrains">


                                <div class="row-content">
                                    <TextField type="text" name="email" fullWidth className="input" variant='outlined'
                                        placeholder="Enter Your Email" id="email" label="Email" required
                                    // helperText="Enter Your Email e.g example@mail.com."
                                    // value={formValue.email} required onChange={onnameChange} 
                                    />
                                    <error-output class="email-error"></error-output>&nbsp;
                                </div>


                                <div class="row-content">
                                    <TextField name="password" fullWidth variant='outlined'
                                        placeholder="Enter Your Password" id="password" label="Password" required
                                    // value={formValue.phoneNumber}  onChange={onnameChange}
                                    // helperText="Enter Your Phone Number start with 1-9 should be in 10 Digits." 
                                    />
                                    <error-output class="phoneNumber-error"></error-output>
                                </div>&nbsp;

                                <div class="row-content">
                                    <Box component="span" m={1} display="flex" justifyContent="space-between" alignItems="center">
                                        <Link to="/forgetPassword" style={{ textDecoration: 'none' }}>
                                            <Button variant="outlined" color="primary" size="large" sx={{ justifyContent: "center" }}
                                            // onClick={onReset} 
                                            >Forget Password ?</Button>
                                        </Link>
                                    </Box>
                                </div>



                                <CardActions style={{ justifyContent: 'center' }} >

                                    <div class="buttons-contact">
                                        <Stack display='block' spacing={8} direction='row'>
                                            <Button variant="contained" color="primary" size="large"
                                            // onClick={onSubmit}
                                            >{formValue.isUpdate ? 'Update' : 'LOGIN'}</Button>
                                            <Link to="/userregistration" style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" color="primary" size="large"
                                                // onClick={onReset}
                                                >NEW REGISTRATION</Button>
                                            </Link>
                                        </Stack>
                                    </div>
                                </CardActions>
                            </div>
                        </div>
                    </Card>
                </form>

            </div >

        </div >

    );
}


export default Verify;