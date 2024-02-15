import React, { useContext } from 'react';
import Header from './Header'
import Footer from './Footer'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import roomview3 from './Photos/roomview3.jpg'
import { DateContext } from './DateContext';
import { AiFillThunderbolt, AiOutlineArrowLeft } from 'react-icons/ai'
import { FaAirFreshener, FaClock, FaDog, FaFan, FaGlassCheers, FaIdCard, FaParking, FaStar, FaWifi } from 'react-icons/fa'
import { GiCigarette, GiHeatHaze, GiPartyFlags, GiPartyPopper } from 'react-icons/gi'
import axios from 'axios'
const Paymentpage = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCVC] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [rooms, setRooms] = useState([]);
    const [propertyof, setPropertyof] = useState([]);
    const [pricepernight, setPricepernight] = useState([]);
    const [location, setLocation] = useState([]);
    const [star, setStar] = useState(0);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    // const { checkInDate, checkOutDate } = useContext(DateContext);
    const [checkInDate2, setCheckInDate] = useState('');
    const [checkOutDate2, setCheckOutDate] = useState('');
    const starTexts = ['', 'One', 'Two', 'Three', 'Four', 'Five'];

    useEffect(() => {
        setCheckInDate(localStorage.getItem('checkInDate'))
        setCheckOutDate(localStorage.getItem('checkOutDate'))

        fetchRoomDetails();
      }, []);

    async function fetchRoomDetails() {
        const token = JSON.parse(localStorage.getItem('access_token'));
     
        await axios.post(`http://localhost:8000/api/Payment/${id}`, { }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                setRooms(response.data.room)
                setPropertyof(response.data.propertyof)
                setLocation(response.data.location)
                setPricepernight(response.data.pricepernight)
                setStar(response.data.star)
            })
            .catch(error => {
                console.error('Catch request error')
            })
            .finally(() => {
                setLoading(false)
            });
    }

    const handleExpiryDateChange = (event) => {
        const input = event.target.value;
        setExpiryDate(input);
    };

    const handleCVCChange = (event) => {
        const input = event.target.value.slice(0, 4); // Limit to 4 characters
        setCVC(input);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const handleCardNumberChange = (event) => {
        const input = event.target.value.replace(/\D/g, ''); // Remove non-digit characters

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            // Check if backspace key is pressed
            const limitedInput = input.substring(0, 19); // Limit to 12 digits + 3 spaces
            setCardNumber(limitedInput);
        } else {
            const formattedInput = input.replace(/(\d{4})/g, '$1 '); // Add space after every 4 digits
            const limitedInput = formattedInput.substring(0, 19); // Limit to 12 digits + 3 spaces
            setCardNumber(limitedInput);
        }
    };
    return (
        <>
            <Helmet>
                <title>Payment Page</title>
            </Helmet>
            <Header />
            <div className='md:ml-5 ml:3 mx-auto grid grid-cols-1 lg:grid-cols-5 select-none gap-7 mt-5 home overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200'>
                <div className='mt-20 md:col-span-3 col-span-5 mx-3'>
                    <div className='shadow-md px-3 pb-9'>
                        <a href='/Listing' className='font-bold '><AiOutlineArrowLeft className=' text-3xl ' /></a>
                        <p className="font-semibold font-sans text-3xl  leading-normal">{propertyof.property_of}</p>
                        <p className='text-xl font-semibold text-gray-700 mt-2'>Step 1: Amenities</p>

                        <p className='text-md text-gray-500 mt-3'>Property amenities</p>
                        <div className="flex justify-between">
                            <div className='sm:flex flex-cols sm:space-x-10 space-y-2'>
                                <div className="flex items-center space-x-2">
                                    <FaWifi />
                                    <p className='text-sm text-gray-400'>Free</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaParking />
                                    <p className='text-sm text-gray-400'>Free</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaIdCard />
                                    <p className='text-sm text-gray-400'>Key card access</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaAirFreshener />
                                    <p className='text-sm text-gray-400'>Air conditioner</p>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <p className='text-md font-semibold text-gray-700 mt-3'>Breakfast included</p>
                        <div className='sm:pr-20 pr-10'>
                            <label for="bedOptions" className="block mb-1 mt-5  text-sm text-gray-500 font-normal">Choose bed options</label>
                            <select id="bedOptions" className="rounded-3xl border border-gray-300 py-2 px-2 w-full">
                                <option value=" ">Select bed type</option>
                                <option value="option1">Single king size beds</option>
                                <option value="option2">Separate king size beds</option>
                                <option value="option2">Separate king size and queen size beds</option>
                                <option value="option3">Separate beds</option>
                            </select>
                        </div>
                        <hr className="bg-gray-400  mx-auto mt-7" />
                        <p className='text-xl font-semibold text-gray-700 mt-5'>Step 2: Personal Details</p>
                        <div className="sm:pr-20  pr-10 mt-5">
                            <label htmlFor="city" className=" text-sm font-medium leading-6 text-gray-500">
                                First Name
                            </label>
                            <div className="">
                                <input
                                    type="text"
                                    // value={city}
                                    name="firstname"
                                    id="firstname"
                                    placeholder='Enter First Name'
                                    // onChange={(e) => {
                                    //     setCity(e.target.value)
                                    // }}
                                    autoComplete="address-level2"
                                    className={`w-full p-2 border border-gray-300  shadow-sm rounded-3xl  placeholder:text-gray-400 placeholder:font-normal mr-3`}
                                />
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <div className="sm:pr-20  pr-10 mt-2">
                            <label htmlFor="city" className=" text-sm font-medium leading-6 text-gray-500">
                                Last Name
                            </label>
                            <div className="">
                                <input
                                    type="text"
                                    // value={city}
                                    name="lastname"
                                    id="lastname"
                                    placeholder='Enter Last Name'
                                    // onChange={(e) => {
                                    //     setCity(e.target.value)
                                    // }}
                                    autoComplete="address-level2"
                                    className={`w-full p-2 border border-gray-300  shadow-sm rounded-3xl placeholder:font-light placeholder:text-gray-400 placeholder:font-normal mr-3`}
                                />
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <div className="sm:pr-20  pr-10 mt-2">
                            <label htmlFor="email" className=" text-sm font-medium leading-6 text-gray-500">
                                Email Address
                            </label>
                            <div className="">
                                <input
                                    type="email"
                                    // value={city}
                                    name="email"
                                    id="email"
                                    placeholder='Enter Email Address'
                                    // onChange={(e) => {
                                    //     setCity(e.target.value)
                                    // }}
                                    autoComplete="address-level2"
                                    className={`w-full p-2 border border-gray-300  shadow-sm rounded-3xl placeholder:font-light placeholder:text-gray-400 placeholder:font-normal mr-3`}
                                />
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <div className="sm:pr-20  pr-10 mt-2">
                            <label htmlFor="email" className=" text-sm font-medium leading-6 text-gray-500">
                                Phone Number
                            </label>
                            <div className="">
                                <input
                                    type="number"
                                    // value={city}
                                    name="phone"
                                    id="phone"
                                    placeholder='Enter Phone Number'
                                    // onChange={(e) => {
                                    //     setCity(e.target.value)
                                    // }}
                                    autoComplete="address-level2"
                                    className={`w-full p-2 border border-gray-300  shadow-sm rounded-3xl placeholder:font-light placeholder:text-gray-400 placeholder:font-normal mr-3`}
                                />
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <hr className="bg-gray-400  mx-auto mt-7" />
                        <p className='text-xl font-semibold text-gray-700 mt-5'>Step 3: Payment Details</p>
                        <div className="sm:pr-20  pr-10 mt-5">
                            <label htmlFor="city" className=" text-sm font-medium leading-6 text-gray-500">
                                Name of Card
                            </label>
                            <div className="">
                                <input
                                    type="text"
                                    // value={city}
                                    name="cardname"
                                    id="cardname"
                                    placeholder='Enter Card Name'
                                    // onChange={(e) => {
                                    //     setCity(e.target.value)
                                    // }}
                                    autoComplete="address-level2"
                                    className={`w-full p-2 border border-gray-300  shadow-sm rounded-3xl placeholder:font-light placeholder:text-gray-400 placeholder:font-normal mr-3`}
                                />
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>

                        <div className="sm:pr-20 pr-10 mt-5">
                            <label htmlFor="cardnumber" className="text-sm font-medium leading-6 text-gray-500">
                                Card Number
                            </label>
                            <div className="">
                                <input
                                    type="text"
                                    name="cardnumber"
                                    id="cardnumber"
                                    placeholder="Enter Card Number"
                                    autoComplete="address-level2"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                    className="w-full p-2 border border-gray-300 shadow-sm rounded-3xl placeholder:font-light placeholder:text-gray-400 placeholder:font-normal mr-3"
                                />
                            </div>
                        </div>
                        <div className='lg:flex'>
                            <div className="sm:pr-20 pr-10 mt-5 lg:w-1/2">
                                <label htmlFor="expiryDate" className="text-sm font-medium leading-6 text-gray-500">
                                    Expiry Date (MM/YYYY)
                                </label>
                                <div className="">
                                    <input
                                        type="month"
                                        name="expiryDate"
                                        id="expiryDate"
                                        placeholder="MM/YYYY"
                                        autoComplete="off"
                                        value={expiryDate}
                                        onChange={handleExpiryDateChange}
                                        className="w-full p-2 border border-gray-300 shadow-sm rounded-3xl  placeholder:text-gray-400 placeholder:font-normal mr-3"
                                    />
                                </div>
                            </div>

                            <div className="sm:pr-20 pr-10 mt-5 lg:w-1/2">
                                <label htmlFor="cvc" className="text-sm font-medium leading-6 text-gray-500">
                                    CVC
                                </label>
                                <div className="">
                                    <input
                                        type="number"
                                        name="cvc"
                                        id="cvc"
                                        placeholder="Enter CVC"
                                        autoComplete="off"
                                        value={cvc}
                                        onChange={handleCVCChange}
                                        className="w-full p-2 border border-gray-300 shadow-sm rounded-3xl  placeholder:text-gray-400 placeholder:font-normal mr-3"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="bg-gray-400  mx-auto mt-7" />
                        <p className='text-xl font-semibold text-gray-700 mt-5'>House Rules</p>
                        <div className="flex  space-x-20   py-2 ">
                            <div className="flex space-x-1">
                                <FaClock />
                                <div className="flex-cols">
                                    <p className='text-sm text-gray-500'>Check-in time</p>
                                    <p className='text-sm text-gray-500'>From 3 PM</p>
                                </div>
                            </div>
                            <div className="flex space-x-1">
                                <FaClock />
                                <div className=" flex-cols">
                                    <p className='text-sm text-gray-500'>Check-in time</p>
                                    <p className='text-sm text-gray-500'>Until 11 AM</p>
                                </div>
                            </div>

                        </div>
                        <p className='text-md font-medium text-gray-500 mt-5'>Important</p>
                        <div className="sm:flex sm:space-x-5  py-2 ">
                            <div className="flex space-x-1">
                                <FaDog />
                                <p className='text-sm text-gray-500'>No pet allowed</p>
                            </div>
                            <div className="flex space-x-1">
                                <GiCigarette size={20} color="black" />
                                <p className='text-sm text-gray-500'>No Smocking</p>
                            </div>
                            <div className="flex space-x-1">
                                <FaGlassCheers />
                                {/* <GiPartyPopper/> */}
                                <p className='text-sm text-gray-500'>No partying</p>
                            </div>
                        </div>
                    </div>
                </div>
                {

                    loading ? (

                        <div className="md:mt-20 flex items-start justify-center" role="status">
                            <div className="flex flex-row space-x-2 items-end">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <p className="text-2xl text-center font-semibold text-gray-700">Loading...</p>
                            </div>
                        </div>) :

                        <div className='lg:mt-20 md:col-span-2 col-span-5 md:mr-5 ml:3'>
                            <div className="mx-3">
                                <div className='shadow-md border border-gray-200 rounded-xl p-3'>
                                    <img
                                        // src={roomview3}
                                        src={`http://localhost:8000/images/${rooms.image}`}
                                        className="col-span-2 md:w-full rounded-2xl"
                                    />
                                    <div className="flex space-x-20 pt-2">
                                        <p className='text-2xl font-sans font-semibold'>Stars</p>

                                        <div className='flex items-center'>
                                            {[...Array(star)].map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <p className='text-sm text-gray-500'>{starTexts[star]} star hotel located {location.distance_center}Km from the center</p>
                                    <div className="flex justify-between ">
                                        <div>
                                            <div className="flex  items-center mt-5">
                                                <p className="text-md font-semibold w-24">Check-in</p>
                                                {/* <p className="text-md text-gray-500 lg:w-50 w:20">Saturday 16 December 2023</p> */}
                                                <p className="text-md text-gray-500 lg:w-50 w:20">{formatDate(checkInDate2)}</p>
                                            </div>

                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-md font-semibold w-24">Check-out</p>
                                                {/* <p className="text-md text-gray-500 w-50">Tuesday 19 December 2023</p> */}
                                                <p className="text-md text-gray-500 lg:w-50 w:20">{formatDate(checkOutDate2)}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <hr className="bg-gray-400  mx-auto mt-4" />
                                    <div className="flex justify-between ">
                                        <div className=''>
                                            <p className='text-md font-semibold w-40 pt-2'>Room type</p>
                                            <div className="flex justify-between space-between items-center mt-1">
                                                <p className="text-md text-gray-500 w-40">Price per night</p>
                                                <p className="text-md text-gray-500 w-20">{pricepernight}ETB</p>
                                            </div>
                                            <div className="flex justify-between  items-center">
                                                <p className="text-md text-gray-500 w-40">Number of night</p>
                                                <p className="text-md text-gray-500 w-20">1200ETB</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-5">
                                                <p className="text-md text-gray-500 w-40">City tax</p>
                                                <p className="text-md text-gray-500 w-20">1200ETB</p>
                                            </div>
                                            <div className="flex justify-between items-center text-start">
                                                <p className="text-md text-gray-500 w-40">Service fee</p>
                                                <p className="flex text-md text-gray-500 w-20">12ETB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="bg-gray-400  mx-auto mt-4" />
                                    <div className='flex justify-between mt-2'>
                                        <div className="flex justify-between items-center">
                                            <p className="text-lg font-semibold text-gray-800 w-40">TOTAL</p>
                                            <p className="text-md text-gray-500 w-20">1200ETB</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex justify-center ">
                                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 text-white rounded-2xl py-1 mt-6 ml-3 w-full  mr-3">
                                    Book now
                                </button>
                            </div>

                        </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default Paymentpage
