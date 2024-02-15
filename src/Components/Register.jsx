import React from 'react'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import home1 from './Photos/r3.png'
import regbackground from './Photos/regbackground.jpg'
import Header from './Header'
import { Link, json } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [pagename, setPagename] = useState("");
    const [errorList, setError] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [conpassword, setConpassword] = useState("");
    const [phonenumber, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [stateprovince, setStateprovince] = useState("");
    const [streetaddress, setStreetaddress] = useState("");
    const [profilepicture, setProfilePicture] = useState("");
    const [Passwordconerror, setPasswordconerror] = useState("");
    const [Regesterbutstate, setRegbutstate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPagename('Registration')
        if (localStorage.getItem('access_token')) {
            navigate("/");
        }
    }, [])

    async function RegisterUser() {
        //  const user = {firstname,lastname,username,email,phone,password,conpassword,city,stateprovince,streetaddress,profilepicture}
        try {

            // if (conpassword === '') {
            //     setPasswordconerror("Please confirm your password.");
            //     return;
            // }

            // if (password !== conpassword) {
            //     setError("Passwords do not match.");
            //     return;
            // }


            const formdata = new FormData();
            formdata.append('firstname', firstname);
            formdata.append('lastname', lastname);
            formdata.append('username', username);
            formdata.append('email', email);
            formdata.append('country', country);
            formdata.append('phonenumber', phonenumber);
            formdata.append('password', password);
            formdata.append('password_confirmation', conpassword);//send for the conformation purpose only
            formdata.append('city', city);
            formdata.append('stateprovince', stateprovince);
            formdata.append('streetaddress', streetaddress);
            formdata.append('profilepicture', profilepicture);
            console.warn(formdata);

            setRegbutstate(true)

            const response = await axios.post('http://localhost:8000/api/Register', formdata)

            if (response.data.status === 200) {
                console.error('result', JSON.stringify(response.data.result));
                localStorage.setItem("access_token", JSON.stringify(response.data.token));//store the result to the local storge of the browser using key "user-info"  JSON.stringfy(item) used when we javascript object or value  serializes it into a JSON-formatted string.
                handleSubsequentRequests()
            }

            else {
                const errorList = response.data.validate_err;
                setError(errorList);
                setRegbutstate(false)
            }
        }
        catch (error) {
            console.error(error)
            setRegbutstate(false)
        }

    }

    async function handleSubsequentRequests() {

        const token = JSON.parse(localStorage.getItem('access_token'));
    
        await axios.get('http://localhost:8000/api/getUserData',{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(response => {
            localStorage.setItem("user-info", JSON.stringify(response.data.userlogin));
            navigate("/");
          })
          .catch(error => {
            console.error('Subsequent request error')
            setRegbutstate(false);
          });
      };

    return (
        <div>
            <>
                <Helmet>
                    <title>{pagename}</title>
                </Helmet>
                <Header />
                <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
                    <div class="relative flex flex-col m-10 md:mt-20 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                        {/* -- left side -- */}

                        <div className="flex flex-col justify-start p-8 md:p-10 ">
                            <span className="mb-3 text-4xl font-bold font-sans text-black ">Create New Account</span>
                            <div className=" container  grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={firstname}
                                            name="firstname"
                                            id="firstname"
                                            placeholder='Enter Your First Name'
                                            onChange={(e) => {
                                                setFirstname(e.target.value)
                                            }}
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.firstname ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.firstname && (
                                            <div className="text-red-600">{errorList.firstname}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={lastname}
                                            name="lastname"
                                            id="lastname"
                                            placeholder='Enter User Name'
                                            onChange={(e) => {
                                                setLastname(e.target.value)
                                            }}

                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.lastname ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.lastname && (
                                            <div className="text-red-600">{errorList.lastname}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        User name
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={username}
                                            name="username"
                                            label="password"
                                            onChange={(e) => {
                                                setUsername(e.target.value)
                                            }}
                                            placeholder='Enter User Name'
                                            autoComplete="user-name"
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.username ? 'border-red-500' : 'border-gray-300'}`}
                                            required
                                        /><br></br>
                                        {errorList.username && (
                                            <div className="text-red-600">{errorList.username}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    {/* <span class="after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-slate-700">
                                        Email
                                    </span> */}
                                    <div className="">
                                        <input
                                            type="email"
                                            value={email}
                                            name="email"
                                            id="email"
                                            placeholder='Enter Your Email'
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.email ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.email && (
                                            <div className="text-red-600">{errorList.email}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="city" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        Phone
                                    </label>
                                    <div className="">
                                        <input
                                            type="number"
                                            value={phonenumber}
                                            name="phonenumber"
                                            id="phonenumber"
                                            placeholder='Enter Your Phone  Number'
                                            onChange={(e) => {
                                                setPhone(e.target.value)
                                            }}
                                            autoComplete="address-level2"
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.phonenumber ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.phonenumber && (
                                            <div className="text-red-600">{errorList.phonenumber}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="">
                                        <select
                                            onChange={(e) => {
                                                setCountry(e.target.value)
                                            }}
                                            id="country"
                                            value={country}
                                            name="country"
                                            autoComplete="country-name"
                                            className= {`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 ${errorList.country ? 'border-red-500' : 'border-gray-300'}`}
                                            >
                                            <option value=''>Select Country</option>
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Tanzania">Tanzania</option>
                                        </select>
                                        {errorList.country && (
                                            <div className="text-red-600">{errorList.country}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={city}
                                            name="city"
                                            id="city"
                                            placeholder='Enter City'
                                            onChange={(e) => {
                                                setCity(e.target.value)
                                            }}
                                            autoComplete="address-level2"
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.city ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={stateprovince}
                                            name="stateprovince"
                                            id="region"
                                            placeholder='Enter State/Province'
                                            onChange={(e) => {
                                                setStateprovince(e.target.value)
                                            }}
                                            autoComplete="address-level1"
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.stateprovince ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.stateprovince && (
                                            <div className="text-red-600">{errorList.stateprovince}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street Address
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            value={streetaddress}
                                            name="streetaddress"
                                            id="streetaddress"
                                            autoComplete="streetaddress"
                                            placeholder='Enter Street Address'
                                            onChange={(e) => setStreetaddress(e.target.value)}
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.streetaddress ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.streetaddress && (
                                            <div className="text-red-600">{errorList.streetaddress}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="">
                                        <input
                                            value={password}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder='Enter Your Password'
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                            className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${errorList.password ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errorList.password && (
                                            <div className="text-red-600">{errorList.password}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                    <div className="">
                                        <input
                                            type="password"
                                            value={conpassword}
                                            name="conpassword"
                                            id="conpassword"
                                            placeholder='Confirm Password'
                                            onChange={(e) => {
                                                setConpassword(e.target.value)
                                            }}
                                            className={`w-full p-2 border rounded-md placeholder:font-light placeholder:text-gray-400 placeholder:font-normal ${Passwordconerror ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {Passwordconerror && (
                                            <div className="text-red-600">{Passwordconerror}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='sm:col-span-3'>
                                    <div className="flex md:flex-row mt-5 items-center space-x-2">
                                        <div className="shrink-0">
                                            <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
                                        </div>
                                        <label className="">
                                            <span class="pl-1">Profile Picture</span>
                                            <input type="file"
                                                name="profilepicture"
                                                className="block w-full 
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
                                                    setProfilePicture(e.target.files[0])
                                                }}
                                            />

                                        </label>
                                    </div>
                                </div>

                            </div>


                            {/* <button
                                onClick={RegisterUser} className="w-full mt-5 bg-black text-white  font-semibold border border-black hover:bg-white hover:text-black hover:border hover:border-gray-300  active:bg-gray-100 text-md p-2 rounded-lg mb-2 ">
                                Register
                            </button> */}
                            <button
                                className={`w-full bg-black text-white font-semibold border border-black ${Regesterbutstate ? 'opacity-50 cursor-not-allowed' : 'transition duration-500 transform easy-in-out hover:scale-105 hover:bg-white hover:text-black hover:border hover:border-gray-300 active:bg-gray-100'
                                    } text-md p-2 rounded-lg mb-6`}
                                id="signup"
                                onClick={RegisterUser}
                                disabled={Regesterbutstate}
                            >
                                {Regesterbutstate ? 'Registering...' : 'Register'}
                            </button>

                            <div className="text-center text-gray-500 ">
                                Have already account?
                                <Link to="/Login" className="font-bold text-black cursor-pointer hover:underline">Login</Link>
                            </div>
                        </div>
                        {/* right side */}
                        <div className="relative">
                            <img
                                src={home1}
                                alt="img"
                                className="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
                            />
                            {/* -- text on image  -- */}
                            <div
                                class="absolute hidden bottom-[580px] right-[70px] p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                                <span className="text-white text-xl"
                                >Renting Made Simple<br />Find Your Home Sweet Home.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Register
