
import React, { useEffect, useRef, useState } from 'react';
import { FaBuilding, FaHome, FaHotel } from 'react-icons/fa';
import './Css/Grid.css'
import { BiHome } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { Checkbox } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import axios from 'axios';
import { ChevronRight } from '@material-ui/icons';
import { Prev } from 'react-bootstrap/esm/PageItem';

const Finishsetup = ({ idclick, onClose }) => {
    const popupRef = useRef();
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [phone, setPhone] = useState(null)
    const [country, setCountry] = useState([])
    const [city, setCity] = useState([]);
    const [stateprovince, setStateprovince] = useState(null);
    const [streetaddress, setStreetaddress] = useState(null);
    const [profilepicture, setProfilepicture] = useState(null)
    const [password, setPassword] = useState(null)
    const [conpassword, setConpassword] = useState(null)
    const [username, setUsername] = useState(null)
    const [usernamestate, setUsernamestate] = useState(true)
    const [selectedcountry, setSelectedcountry] = useState(null);
    const [selectedcity, setSelectedcity] = useState(null);
    const [Nextbuttonstate, setNextbuttonstate] = useState(false);
    const [passwordlerror, setPassworderror] = useState(false);
    const [confirmationerror, setConfirmationerror] = useState(null);
    const [error, setError] = useState(null);
    const [errorList, setErrorlist] = useState([]);
    // const [responsestatus, setResponsestatus] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        Address()
    }, [])

    async function Address() {
        const token = JSON.parse(localStorage.getItem('access_token'));
        const userinfo = JSON.parse(localStorage.getItem('user-info'));
        const userid = userinfo.id;
        const item = { userid }
        await axios.post('http://localhost:8000/api/Userinfo', item, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCountry(response.data.country);
                setCity(response.data.destination);
                setUsername(response.data.username);
                setUsernamestate(false);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });
    }

    async function handelSubmit() {
        if (
            !username ||
            !firstname ||
            !lastname ||
            !selectedcountry ||
            !selectedcity ||
            !phone ||
            !profilepicture ||
            !password ||
            !conpassword
        ) {
            setNextbuttonstate(true)
            setError('Please fill all input fields before proceeding')
        }
        else if (password !== conpassword) {
            setNextbuttonstate(true)
            setConfirmationerror('Passwords do not match up')
        }

        else {
            try {
                const token = JSON.parse(localStorage.getItem('access_token'));
                const userinfo = JSON.parse(localStorage.getItem('user-info'));
                const userid = userinfo.id;
                // const item = { userid }
                const formdata = new FormData();
                formdata.append('userid', userid)
                formdata.append('firstname', firstname);
                formdata.append('lastname', lastname);
                formdata.append('username', username)
                formdata.append('country', selectedcountry);
                formdata.append('phonenumber', phone);
                formdata.append('password', password);
                formdata.append('password_confirmation', conpassword);//send for the conformation purpose only
                formdata.append('city', selectedcity);
                // formdata.append('stateprovince', stateprovince);
                // formdata.append('streetaddress', streetaddress);
                formdata.append('profilepicture', profilepicture);
                console.warn(formdata);

                setNextbuttonstate(true)

                const response = await axios.post('http://localhost:8000/api/FinishRegister', formdata, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.data.status === 200) {
                    console.log('result', JSON.stringify(response.data.userinfo));
                    localStorage.setItem('user-info', JSON.stringify(response.data.userinfo));//store the result to the local storge of the browser using key "user-info"  JSON.stringfy(item) used when we javascript object or value  serializes it into a JSON-formatted string.
                    setNextbuttonstate(true)
                    navigate(`/Paymentpage/${idclick}`);
                }

                else {
                    const errorList = response.data.validate_err;
                    setErrorlist(errorList);
                    setNextbuttonstate(false)
                }
            }
            catch (error) {
                console.error(error)
                setNextbuttonstate(false)
                setError('Catch Error')
            }

        }
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handelConfirmPassword = (e) => {
        setConpassword(e.target.value)
        if (password !== e.target.value) {
            setConfirmationerror('Passwords do not match up');
            setNextbuttonstate(true);
        }
        else {
            setConfirmationerror(null);
            setNextbuttonstate(false);
        }
    }

    const handelPassword = (e) => {
        const paw = e.target.value
        setPassword(paw)
        setConfirmationerror(null);
        setNextbuttonstate(false)
        setError(null)
        if (paw.length < 8) {
            setNextbuttonstate(true);
            setPassworderror('At least 8 characters')
        } else {
            setNextbuttonstate(false);
            setPassworderror(null)
        }
    }

    return (
        <div className="text-black fixed inset-0 select-none z-50 flex items-baseline justify-center md:backdrop-filter sm:backdrop-blur-sm">
            <form
                ref={popupRef}
                className="bg-white md:w-290 w-900 p-6 z-50 rounded-2xl shadow transform transition-transform duration-300 translate-y-0 slide-in-bottom max-h-[600px] overflow-y-scroll">
                <div className="flex justify-between first-letter:">
                    <h2 className="text-2xl text-black font-bold">Let us finish your set up first</h2>
                    <button onClick={onClose} className="text-white bg-red-500 w-6 h-8 rounded-lg font-normal flex items-center justify-center shadow-md hover:shadow-xl hover:font-medium hover:bg-red-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="my-4">
                    <h3 className="font-semibold ">User Name</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='w-full'>
                            <p className='text-sm pb-1'>Current username</p>
                            <input type="text"
                                value={username}
                                placeholder='Enter user name'
                                required
                                disabled={usernamestate}
                                className="border border-gray-300 w-full shadow-sm rounded-3xl px-2 py-2"
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                    setNextbuttonstate(false)
                                    setError(null)
                                }
                                } />
                            {errorList.username && (
                                <div className="text-red-600">{errorList.username}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold ">Full Name</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='md:w-1/2'>
                            <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500">First Name</p>
                            <input type="text" placeholder='Enter first name' className="border border-gray-300 shadow-sm w-full rounded-3xl px-2 py-2"
                                onChange={(e) => {
                                    setFirstname(e.target.value)
                                    setNextbuttonstate(false)
                                    setError(null)
                                }
                                } required />
                            {errorList.firstname && (
                                <div className="text-red-600">{errorList.firstname}</div>
                            )}
                        </div>
                        <div className='md:w-1/2'>
                            <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500 ">Last Name</p>
                            <input type="text" placeholder="Enter last name" className="border border-gray-300 shadow-sm w-full rounded-3xl px-2 py-2"
                                onChange={(e) => {
                                    setLastname(e.target.value)
                                    setNextbuttonstate(false)
                                    setError(null)
                                }
                                } required />
                            {errorList.lastname && (
                                <div className="text-red-600">{errorList.lastname}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold">Phone</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='w-full flex'>
                            {/* <select
                                className="rounded-3xl border border-gray-300 py-1 px-2 "
                                onChange={(e) => {
                                    // Handle the selected phone code value here
                                    console.log(e.target.value);
                                }}
                            >
                                <option value="+1">+251</option>
                                <option value="+91">+1</option>
                                <option value="+44">+44</option>
                               
                            </select> */}
                            <div className="flex-1">
                                <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500 ">Phone number</p>
                                <input
                                    type="number"
                                    placeholder='Enter phone number'
                                    required
                                    className="border border-gray-300 shadow-sm rounded-3xl px-2 py-2 w-full"
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                        setNextbuttonstate(false)
                                        setError(null)
                                    }}
                                />
                                {errorList.phonenumber && (
                                    <div className="text-red-600">{errorList.phonenumber}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold ">Address</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='md:w-1/2'>
                            <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500 ">Country</p>
                            <select id="destination" className="rounded-3xl border shadow-sm border-gray-300 py-2 px-2 w-full "
                                value={selectedcountry}
                                onChange={(e) => {
                                    setSelectedcountry(e.target.value)
                                    setNextbuttonstate(false)
                                    setError(null)
                                }}>
                                {
                                    selectedcountry ? <>  </> : <option>Select Country</option>
                                }
                                {country.map(country => (
                                    <option key={country.id} value={country.country}>{country.country}</option>
                                ))}
                            </select>
                            {errorList.country && (
                                <div className="text-red-600">{errorList.country}</div>
                            )}
                        </div>
                        <div className='md:w-1/2'>
                            <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500 ">City</p>
                            <select id="destination" className="rounded-3xl border border-gray-300 shadow-sm py-2 px-2 w-full "
                                value={selectedcity}
                                onChange={(e) => {
                                    setSelectedcity(e.target.value)
                                    setNextbuttonstate(false)
                                    setError(null)
                                }}>
                                {
                                    selectedcity ? <>  </> : <option>Select Country</option>
                                }
                                {city.map(cityname => (
                                    <option key={cityname.id} value={cityname.city}>{cityname.city}</option>
                                ))}
                            </select>
                            {errorList.city && (
                                <div className="text-red-600">{errorList.city}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold ">Password</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='md:w-1/2'>
                            <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500 ">Password</p>
                            <input
                                type="password"
                                placeholder='Enter Password'
                                required
                                className="border border-gray-300 shadow-sm rounded-3xl px-2 py-2 w-full"
                                onChange={handelPassword}
                            />
                            {passwordlerror && (
                                <div className=" text-red-600">{passwordlerror}</div>
                            )}
                            {errorList.password && (
                                <div className="text-red-600">{errorList.password}</div>
                            )}
                        </div>
                        <div className='md:w-1/2'>
                            <p className="text-sm pb-1 after:content-['*'] after:ml-0.5 after:text-red-500 ">Confirm Password</p>
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                required
                                className="border border-gray-300 shadow-sm rounded-3xl px-2 py-2 w-full"
                                onChange={handelConfirmPassword}
                            />
                            {confirmationerror && (
                                <div className=" text-red-600">{confirmationerror}</div>
                            )}

                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    <div className="flex md:flex-row items-center space-x-2">
                        <div className="shrink-0">
                            <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
                        </div>
                        <label className="">
                            <span class="pl-1">Profile Picture</span>
                            <input type="file"
                                name="profilepicture"
                                className="block w-full shadow-sm
                                                text-sm text-slate-500 
                                                file:mr-4
                                                file:py-2 
                                                file:px-4 
                                                file:rounded-full 
                                                file:border-0 
                                                file:text-sm 
                                                file:font-semibold 
                                                file:bg-blue-50 
                                                file:text-blue-500 
                                                hover:file:bg-blue-100"
                                onChange={(e) => {
                                    setProfilepicture(e.target.files[0])
                                    setNextbuttonstate(false)
                                    setError(null)
                                }}
                            />
                        </label>
                    </div>
                </div>

                {error && <div className="mb-2 error-message text-center text-red-500">{error}</div>}

                <div className="flex justify-between mt-6">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-3xl mr-2 focus:outline-none focus:ring focus:ring-red-300">Clear</button>
                    <button
                        type="submit"
                        className={`bg-blue-400  p-1 text-white rounded-3xl py-2 px-5 ${Nextbuttonstate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300'} `}
                        onClick={handelSubmit}
                        disabled={Nextbuttonstate}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Finishsetup
