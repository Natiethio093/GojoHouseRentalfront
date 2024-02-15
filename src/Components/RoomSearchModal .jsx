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

const RoomSearchModal = ({ onClose }) => {
    const popupRef = useRef();
    const [destinationError, setDestinationError] = useState(null);
    const [checkinError, setCheckinError] = useState(null);
    const [checkindate, setCheckindate] = useState(null)
    const [checkoutdate, setCheckoutdate] = useState(null)
    const [checkoutError, setCheckoutError] = useState('');
    const [error, setError] = useState(null);
    const [click, setClick] = useState("");
    const [minimumprice, setMinimumprice] = useState(' ')
    const [maximumprice, setMaximumprice] = useState(' ')
    const [numberofguests, setNumberofguests] = useState('')
    const [numberofrooms, setNumberofrooms] = useState(null)
    const [bedtype, setBedtype] = useState([])
    const [selectedbedtype, setSelectebedtype] = useState(null)
    const [searchbutstate, setSearchbutstate] = useState(false);
    const [otheramenities, setOtheramenities] = useState(null)
    const [Accotype, setAccotypes] = useState(null);
    const [destination, setDestination] = useState([]);
    const [selectedestination, setSelectedestination] = useState(null);
    const [maximumerror, setMaximumpricerror] = useState(null);
    const [minimumerror, setMinimumpricerror] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (popupRef.current && !popupRef.current.contains(event.target)) {
    //             onClose();
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [onClose]);

    useEffect(() => {
        // Fetch the available destinations from the database
        Destination();
    }, []);


    useEffect(() => {
        console.log(Accotype);
    }, [Accotype]);

    async function Destination() {
        try {
            const token = JSON.parse(localStorage.getItem('access_token'));
            await axios.post('http://localhost:8000/api/destinations', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setDestination(response.data.destination);
                    setBedtype(response.data.bedtype);
                })
                .catch(error => {
                    console.error('Error fetching destinations:', error);
                });
        }
        catch (error) {
            console.error('Error fetching destinations:', error);
        }
    }

    const handleDateChange = (date, whichdate) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (date < currentDate) {
            if (whichdate === 1) {
                setCheckinError('Date has already passed');
                setSearchbutstate(true);
                setCheckindate(date);
                setError(null)
            } else if (whichdate === 2) {
                setCheckoutError('Date has already passed');
                setSearchbutstate(true);
                setCheckoutdate(date);
                setError(null)
            }
        } else {
            if (whichdate === 1) {
                setCheckinError('');
                setCheckindate(date);
                setSearchbutstate(false);
                setError(null)

                if (checkoutdate && date >= checkoutdate) {
                    setCheckinError('Date must be before check-out date');
                    setSearchbutstate(true);
                    setError(null)
                } else {
                    setCheckoutError('');
                    setSearchbutstate(false);
                    setError(null)
                }
            } else if (whichdate === 2) {
                if (date <= checkindate) {
                    setCheckoutError('Date must be after check-in date');
                    setSearchbutstate(true);
                    setCheckoutdate(date);
                    setError(null)
                } else {
                    setCheckoutError('');
                    setCheckoutdate(date);
                    setSearchbutstate(false);
                    setError(null)
                }
            }
        }
    };


    function Searchresult() {
        if (
            !checkindate ||
            !checkoutdate ||
            !minimumprice ||
            !maximumprice ||
            !Accotype ||
            !numberofguests ||
            !numberofrooms ||
            !selectedbedtype ||
            !otheramenities ||
            !selectedestination
        ) {
            setError("Please fill all required fields before proceeding");
            setSearchbutstate(true);
        } else {
            setSearchbutstate(false);
            const queryParams = new URLSearchParams();
            queryParams.set("destination", selectedestination);
            queryParams.set("checkindate", checkindate);
            queryParams.set("checkoutdate", checkoutdate);
            queryParams.set("minimumprice", minimumprice);
            queryParams.set("maximumprice", maximumprice);
            queryParams.set("numberofguests", numberofguests);
            queryParams.set("numberofrooms", numberofrooms);
            queryParams.set("bedtype", selectedbedtype);
            queryParams.set("otheramenities", otheramenities);
            queryParams.set("Accotype", Accotype);
            navigate(`/Searchresult?${queryParams.toString()}`);
        }
    }

    return (
        <div className="fixed inset-0 select-none z-50 flex items-baseline justify-center md:backdrop-filter sm:backdrop-blur-sm">

            <form //onSubmit={Searchresult}
                ref={popupRef}
                className="bg-white md:w-290 w-900 p-6 z-50 rounded-2xl shadow transform transition-transform duration-300 translate-y-0 slide-in-bottom max-h-[600px] overflow-y-scroll">
                <div className="  flex justify-between">
                    <h2 className="text-xl font-bold">Search</h2>
                    <button onClick={onClose} className="text-white bg-red-500 w-6 h-8 rounded-lg font-normal flex items-center justify-center shadow-md hover:shadow-xl hover:font-medium hover:bg-red-600">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="my-6">
                    <h3 className="font-semibold ">Where are you traveling ?</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />

                    <div className=' '>
                        <p className='text-sm pb-1 '>Destination</p>
                        {/* <input type="text" placeholder='Where are you going?' className="w-full border border-gray-300 shadow-sm rounded-3xl px-2 py-2"
                                onChange={(e) => {
                                    // setDestination(e.target.value)
                                    // setSearchbutstate(false)
                                    // setError("")
                                }
                                } /> */}
                        <select id="destination" className="rounded-3xl border border-gray-300 py-2 px-2 w-full "
                            value={selectedestination}
                            onChange={(e) => {
                                setSelectedestination(e.target.value)
                                setSearchbutstate(false)
                                setError("")
                            }}>
                            {
                                selectedestination ? <>  </> : <option>Select Destination</option>
                            }
                            {destination.map(destination => (
                                <option key={destination.id} value={destination.city}>{destination.city}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold ">Date</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='md:w-1/2'>
                            <p className='text-sm pb-1'>Check-in date</p>
                            <DatePicker
                                selected={checkindate}
                                backgroundColor='red'
                                // onChange={date => setCheckindate(date)}
                                onChange={(date) => {
                                    handleDateChange(date, 1)
                                    // setCheckinError("")
                                }
                                }
                                placeholderText="Enter Check-in date"
                                className={`border border-gray-300 w-80 md:w-48 shadow-sm rounded-3xl px-3 py-2 ${checkinError ? 'border border-red-500 text-red-500' : 'border border-gray-300'}`}
                                popperClassName={{ backgroundColor: 'red' }}
                                required
                            />
                            {checkinError && <p className="text-red-500">{checkinError}</p>}
                        </div>
                        <div className='w-1/2'>
                            <p className='text-sm pb-1'>Check-out date</p>
                            <DatePicker
                                selected={checkoutdate}
                                // onChange={date => setCheckoutdate(date)}
                                onChange={(date) => {
                                    handleDateChange(date, 2)
                                    // setCheckinError("")
                                }
                                }
                                placeholderText="Enter Check-out date"
                                className={`border border-gray-300 w-80 md:w-48 shadow-sm rounded-3xl px-3 py-2 ${checkoutError ? 'border border-red-500 text-red-500' : 'border border-gray-300'}`}
                                required
                            />
                            {/* <input
                               type='date'
                               selected={checkoutdate}
                               // onChange={date => setCheckoutdate(date)}
                               onChange={(date) => {
                                   handleDateChange(date, 2)
                                   // setCheckinError("")
                               }
                               }
                               placeholderText="Enter Check-out date"
                               className={`border border-gray-300 shadow-sm rounded-3xl px-3 py-2 ${checkoutError ? 'border border-red-500 text-red-500' : 'border border-gray-300'}`}
                               required
                             
                            /> */}
                            {checkoutError && <p className="w-full text-red-500">{checkoutError}</p>}
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold ">Price Range(Per Night)</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex flex-cols justify-between md:space-x-5">
                        <div className='md:w-1/2'>
                            <p className='text-sm pb-1'>Minimum Price</p>
                            <input type="number" placeholder='Enter minimum price' required min="1" className={`border border-gray-300 shadow-sm w-full rounded-3xl px-2 py-2 `}
                                onChange={(e) => {
                                    setMinimumprice(e.target.value)
                                    setSearchbutstate(false)
                                    setError("")
                                }
                                } />
                        
                        </div>
                        <div className='md:w-1/2'>
                            <p className='text-sm pb-1'>Maximum Price</p>
                            <input type= "number" placeholder="Enter maximum price" min="1" required className={`border  border-gray-300 w-full shadow-sm rounded-3xl px-2 py-2 `}
                                onChange={(e) => {
                                    setMaximumprice(e.target.value)
                                    setSearchbutstate(false)
                                    setError("")
                                }
                                } />
                        
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold">Accommodation Type</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-4" />
                    <div className="md:flex flex-cols items-center justify-between">
                        <a className={`flex flex-col justify-center items-center border border-gray-100 shadow-lg rounded-xl text-center hover:border-gray-200 hover:bg-gray-200 hover:font-bold p-5 hover:cursor-pointer mt-2 ${click === "1" ? 'shadow-sm bg-gray-200 ' : 'shadow-lg bg-white'}`}
                            onClick={() => {
                                setAccotypes('Hotel')
                                setClick("1")
                                setSearchbutstate(false)
                                setError("")
                            }

                            }>
                            <FaHotel className='' />
                            <p className="text-md">Hotel</p>
                        </a>

                        <a className={`border border-gray-100 rounded-xl text-center hover:bg-gray-200 hover:font-bold hover:border-gray-200 p-5 flex flex-col justify-center items-center hover:cursor-pointer mt-2 ${click === "2" ? 'shadow-sm bg-gray-200' : 'shadow-lg bg-white'}`}
                            onClick={() => {
                                setAccotypes('Shared Apartment')
                                setClick("2")
                                setSearchbutstate(false)
                                setError("")
                            }}>
                            <FaBuilding className='' />
                            <p className="text-md">Shared Apartment</p>
                        </a>

                        <a className={`border border-gray-100 rounded-xl text-center hover:bg-gray-200 hover:font-bold hover:border-gray-200  p-5 flex flex-col justify-center items-center hover:cursor-pointer mt-2 ${click === "3" ? 'shadow-sm bg-gray-200' : 'shadow-lg bg-white'}`}
                            onClick={() => {
                                setAccotypes('House')
                                setClick("3")
                                setSearchbutstate(false)
                                setError("")
                            }}>
                            <AiFillHome className='' />
                            <p className="text-md">House</p>
                        </a>

                        {/* <input type="radio" id="house" name="accommodation" value="house" className="mr-2" />
                        <label htmlFor="house">House</label> */}
                    </div>
                    {/* {error && <div className="mb-2 error-message text-red-500">{error}</div>} */}
                </div>

                <div className="my-4">
                    <h3 className="font-semibold">Guests Number,Room Numbers and Beds Type</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="md:flex space-y-2 md:space-y-0 flex-cols justify-between w-full">
                        <div>
                            <p className='text-sm pb-1'>Number of Guests</p>
                            <input type="number" id="guests" min="1" className="border md:w-32 w-full border-gray-300 rounded-3xl px-2 py-2" required
                                onChange={(e) => {
                                    setNumberofguests(e.target.value)
                                    setSearchbutstate(false)
                                    setError("")
                                }
                                } />
                        </div>
                        <div>
                            <p className='text-sm pb-1'>Number of Rooms</p>
                            <input type="number" id="rooms" min="1" className={`border  md:w-32 w-full border-gray-300 shadow-sm rounded-3xl px-2 py-2 `}
                                onChange={(e) => {
                                    setNumberofrooms(e.target.value)
                                    setSearchbutstate(false)
                                    setError("")
                                }
                                } required />
                        </div>
                        <div>
                            <p className='text-sm pb-1'>Select bed type</p>
                            <select id="destination" className={`rounded-3xl border border-gray-300 py-2 px-2  ${selectedbedtype ? 'md:w-32' : 'w-full'}`}
                            value={selectedbedtype}
                            onChange={(e) => {
                                setSelectebedtype(e.target.value)
                                setSearchbutstate(false)
                                setError("")
                            }}>
                            {
                                selectedbedtype ? <>  </> : <option>Select Bedtype</option>
                            }
                            {bedtype.map(bedtype => (
                                <option key={bedtype.id} value={bedtype.bed_type}>{bedtype.bed_type}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <h3 className="font-semibold">Other Amenties</h3>
                    <hr className="bg-gray-300 mx-auto mt-2 mb-3" />
                    <div className="flex justify-between">
                        <div>
                            <input type="checkbox" id="beds" className="border border-blue-400 text-blue-300 "
                                onChange={() => {
                                    setOtheramenities("Free Cancellation")
                                    setSearchbutstate(false)
                                    setError("")
                                 }
                                } />
                            <span className='pl-1'>Free Cancellation</span>
                        </div>
                        <div>
                            <input type="checkbox" id="beds" className="border border-blue-400 text-blue-300 "
                                onChange={() => {
                                    setOtheramenities("Breakfast")
                                    setSearchbutstate(false)
                                    setError("")
                                 }
                                } />
                            <span className='pl-1'>Breakfast</span>
                        </div>
                        <div>
                            <input type="checkbox" id="beds" className="border border-blue-400 text-blue-300 "
                                onChange={() => {
                                    setOtheramenities("Free Wifi")
                                    setSearchbutstate(false)
                                    setError("")
                                 }
                                } />
                            {/* <Checkbox color="blue" className='text-blue-300' /> */}
                            <span className='pl-1'>Free Wifi</span>
                        </div>
                    </div>
                </div>
                {error && <div className="mb-2 error-message text-center text-red-500">{error}</div>}

                <div className="flex justify-between mt-6">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-3xl mr-2 focus:outline-none focus:ring focus:ring-red-300">Clear</button>
                    <button
                        type="submit"
                        className={`bg-blue-400  p-1 text-white rounded-3xl py-2 px-5 ${searchbutstate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300'}`}
                        onClick={Searchresult}
                        disabled={searchbutstate}
                    >
                        Show Result
                    </button>
                </div>
            </form>
        </div>
    );
};
export default RoomSearchModal;