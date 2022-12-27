import { useState} from 'react'
import './userregistration-form.scss'
import cardImg from "../assets/image2.jpg"
import Swal from 'sweetalert2'
import Button from '@mui/material/Button'
import { Stack, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import UserService from "../services/UserService";

function UserRegistrationForm() {

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

    const onReset = () => {
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            dob: "",
            password: "",

        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let userObject = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            email: formValue.email,
            address: formValue.address,
            password: formValue.password,
            dob: formValue.dob

        };

        console.log("User Obj data", userObject);

        if (!userObject.firstName || !userObject.lastName || !userObject.email
            || !userObject.address || !userObject.password || !userObject.dob)
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
                .userRegistration(userObject).then(response => {
                    console.log(" Success Data ", response.data.data);
                    // console.log(response.data.data.message)
                    try {
                        if (response.data.data !== 'Email id already register with another user..!') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'Email id already register with another user..!',
                                showConfirmButton: true
                            });
                            
                        } else {
                            
                            Swal.fire({
                                icon: 'success',
                                title: 'Registration Successfully.!',
                                text: `Please Check Your Mailbox for Verification.`,
                                html: '<b>Please Check Your Mailbox for Verification.</b><br>' +
                                    '<b>Click on below Link for Login. </b><br><br>' +
                                    '<a href="//localhost:3000"> Login Page</a>',
                                showConfirmButton: false,
                            })
                            
                        }

                    } catch (err) {
                        console.log(" From catch block Error Incorrect Fields..!");
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Check all fields again.!',
                            showConfirmButton: true
                        });

                    }
                }).catch(error => {
                    console.log("Error Incorrect Fields..!");
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Check all fields again.!',
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
                                    position: "absolute", fontSize: "30px", color: "black", bottom: 100, right: "40%",
                                    fontFamily: "-moz-initial", transform: "translateX(40%)",
                                }}>USER REGISTRATION FORM
                                </div>
                            </div>

                            <div class="form-constrains">
                                <div class="row-content">
                                    <TextField type="text" name="firstName" variant='outlined'
                                        placeholder="Enter Your First Name" id="firstName" fullWidth label="First Name"
                                        value={formValue.firstName} required onChange={onnameChange}
                                        helperText="Enter Your First Name start with A-Z minimum 3 Alphabets." />&nbsp;
                                </div>

                                <div class="row-content">
                                    <TextField type="text" name="lastName" variant='outlined'
                                        placeholder="Enter Your Last Name" id="lastName" fullWidth label="Last Name" required
                                        value={formValue.lastName} onChange={onnameChange}
                                        helperText="Enter Your Last Name start with A-Z minimum 3 Alphabets." />&nbsp;
                                </div>

                                <div class="row-content">
                                    <TextField type="text" name="email" fullWidth className="input" variant='outlined'
                                        placeholder="Enter Your Email" id="email" label="Email" required
                                        helperText="Enter Your Email e.g example@mail.com."
                                        value={formValue.email} onChange={onnameChange} />

                                </div>&nbsp;

                                <div class="row-content">
                                    <TextField type="text" name="address" fullWidth className="input" variant='outlined'
                                        placeholder="Enter Your Address" id="address" label="Address" required
                                        value={formValue.address} onChange={onnameChange} />

                                </div>&nbsp;

                                <div class="row-content">
                                    <TextField type="password" name="password" fullWidth variant='outlined'
                                        placeholder="Enter Your Password" id="password" label="Password" required
                                        value={formValue.password} onChange={onnameChange}
                                        helperText="Enter Password  Min. 8 Characters contain 1 Spl. Char., 1 Cap. Alphabet and 1 Digit."
                                    />
                                </div>&nbsp;

                                <div class="row-content">
                                    <Stack component="form" noValidate spacing={4}>
                                        <TextField
                                            id="dob"
                                            name="dob"
                                            value={formValue.dob} onChange={onnameChange}
                                            label="Date of Birth"
                                            type="date"
                                            required
                                            // defaultValue=""
                                            sx={{ width: 250 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Stack>
                                </div>

                                {/* <div className="row-content">
                                    <div class="column-constrains">

                                        <label className="label text" htmlFor='dob' >DOB :&nbsp; </label>

                                        <div class="column-content" >
                                            <TextField type="text" name="day" fullWidth className="input" variant='outlined'
                                                id='dateOfBirth' label="Day" select value={formValue.day} required onChange={onnameChange}>

                                                <MenuItem value="">Day</MenuItem>
                                                <MenuItem value="01">01</MenuItem>
                                                <MenuItem value="02">02</MenuItem>
                                                <MenuItem value="03">03</MenuItem>
                                                <MenuItem value="04">04</MenuItem>
                                                <MenuItem value="05">05</MenuItem>
                                                <MenuItem value="06">06</MenuItem>
                                                <MenuItem value="07">07</MenuItem>
                                                <MenuItem value="08">08</MenuItem>
                                                <MenuItem value="09">09</MenuItem>
                                                <MenuItem value="10">10</MenuItem>
                                                <MenuItem value="11">11</MenuItem>
                                                <MenuItem value="12">12</MenuItem>
                                                <MenuItem value="13">13</MenuItem>
                                                <MenuItem value="14">14</MenuItem>
                                                <MenuItem value="15">15</MenuItem>
                                                <MenuItem value="16">16</MenuItem>
                                                <MenuItem value="17">17</MenuItem>
                                                <MenuItem value="18">18</MenuItem>
                                                <MenuItem value="19">19</MenuItem>
                                                <MenuItem value="20">20</MenuItem>
                                                <MenuItem value="21">21</MenuItem>
                                                <MenuItem value="22">22</MenuItem>
                                                <MenuItem value="23">23</MenuItem>
                                                <MenuItem value="24">24</MenuItem>
                                                <MenuItem value="25">25</MenuItem>
                                                <MenuItem value="26">26</MenuItem>
                                                <MenuItem value="27">27</MenuItem>
                                                <MenuItem value="28">28</MenuItem>
                                                <MenuItem value="29">29</MenuItem>
                                                <MenuItem value="30">30</MenuItem>
                                                <MenuItem value="31">31</MenuItem>
                                            </TextField>
                                        </div>&nbsp;


                                        <div class="column-content">

                                            <TextField type="text" name="month" fullWidth className="input" variant='outlined'
                                                id='dateOfBirth' label="Month" select value={formValue.month} required onChange={onnameChange}>

                                                <MenuItem value="" >Month</MenuItem>
                                                <MenuItem value="01">January</MenuItem>
                                                <MenuItem value="02">Febuary</MenuItem>
                                                <MenuItem value="03">March</MenuItem>
                                                <MenuItem value="04">April</MenuItem>
                                                <MenuItem value="05">May</MenuItem>
                                                <MenuItem value="06">June</MenuItem>
                                                <MenuItem value="07">July</MenuItem>
                                                <MenuItem value="08">August</MenuItem>
                                                <MenuItem value="09">September</MenuItem>
                                                <MenuItem value="10">October</MenuItem>
                                                <MenuItem value="11">November</MenuItem>
                                                <MenuItem value="12">December</MenuItem>
                                            </TextField>

                                        </div>
                                        &nbsp;

                                        <div class="column-content">

                                            <TextField name="year" fullWidth className="input" variant='outlined'
                                                label="Year" id='dateOfBirth' select value={formValue.year} required onChange={onnameChange} >

                                                <MenuItem value="">Year</MenuItem>
                                                <MenuItem value="2020">2020</MenuItem>
                                                <MenuItem value="2019">2019</MenuItem>
                                                <MenuItem value="2018">2018</MenuItem>
                                                <MenuItem value="2017">2017</MenuItem>
                                                <MenuItem value="2016">2016</MenuItem>
                                            </TextField>

                                        </div>
                                    </div>
                                </div> */}
                                <CardActions style={{ justifyContent: 'center' }} >

                                    <div class="buttons-contact">
                                        <Stack display='block' spacing={6} direction='row'>

                                            <Button variant="contained" color="primary" size="large"
                                                onClick={onSubmit} >{formValue.isUpdate ? 'Update' : 'Register'}</Button>

                                            <Button variant="contained" color="primary" size="large" onClick={onReset} >Reset</Button>

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


export default UserRegistrationForm;