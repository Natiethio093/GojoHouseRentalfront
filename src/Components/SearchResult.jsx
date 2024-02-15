import React, { useContext } from 'react';
import { DateContext } from './DateContext';
import Header from './Header'
import Footer from './Footer'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { BiCheckboxChecked, BiLogoTiktok } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Prev } from 'react-bootstrap/esm/PageItem'
import { format } from 'date-fns';
// import { URLSearchParams } from 'url';

const SearchResult = () => {
    const [pagename, setPagename] = useState('');
    // const { setCheckInDate, setCheckOutDate } = useContext(DateContext);
    // const [checkindates, setCheckindate] = useState(null)
    // const [checkoutdates, setCheckoutdate] = useState(null)
    const [sortOption, setSortOption] = useState('');
    const [activeButton, setActiveButton] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pagnation, setPagnation] = useState(true);
    const [queryParameters, setQueryParameters] = useState(null);
    const [searchresult, setSearchresult] = useState([]);
    const [availabledestinations, setAvailabledestinations] = useState([]);
    const [availablebedtype, setAvailablebedtype] = useState([]);
    const [availableaccommodations, setAvailableaccommodations] = useState([]);
    const [selectedestination, setSelectedestination] = useState(null);
    const [sortingOption, setSortingOption] = useState(null);
    const [searchbutonstate, setSearchbutonstate] = useState(false);
    const [checkinError, setCheckinError] = useState(null);
    const [checkoutError, setCheckoutError] = useState(null);
    const [maximumerror, setMaximumpricerror] = useState(null);
    const [minimumerror, setMinimumpricerror] = useState(null);
    const [error, setdateError] = useState(null);
    const [searchbutstate, setSearchbutstate] = useState(false);
    const [guesterror, setGuestnumbererror] = useState(null);
    const [roomerror, setRoomnumbererror] = useState(null);
    const [guestnum, setGuestnum] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 3;
    const navigate = useNavigate();

    let [checkindate, setCheckindate] = useState(null);
    let [checkoutdate, setCheckoutdate] = useState(null);
    let [checkoutdate2, setCheckoutdate2] = useState(null);
    let [checkindate3, setCheckindate3] = useState(null);
    let [checkoutdate3, setCheckoutdate3] = useState(null);
    let [maximumprice, setMaximumprice] = useState('');
    let [minimumprice, setMinimumprice] = useState('');
    let [numberofguests, setNumberofguest] = useState('');
    let [numberofrooms, setNumberofrooms] = useState('');
    let [bedtype, setBedtype] = useState(null);
    let [destination, setDestination] = useState(null);
    let [destination2, setDestination2] = useState(null);
    let [otheramenities, setOtheramenities] = useState(null);
    let [Accommodation, setAccommodation] = useState(null);
    let [initialAccommodation, setInitialAccommodation] = useState(null);
    let [ischanged, setIschanged] = useState(false)
    let amenitiesother;
    let formattedCheckinDate2 = '';
    let formattedCheckoutDate2 = '';

    const location = useLocation();

    const handleClick = (buttonNumber) => {
        setActiveButton(buttonNumber);
    };

    // useEffect(() => {
    //     setPagename('Search Result')
    //     Properties();
    // }, [])


    useEffect(() => {
        setPagename('Search Result')
        function getQueryParameters() {
            const queryParams = new URLSearchParams(window.location.search);
            const checkinDateParam = queryParams.get('checkindate');
            const checkoutDateParam = queryParams.get('checkoutdate');

            const formattedCheckinDate = checkinDateParam ? new Date(checkinDateParam) : null;
            const formattedCheckoutDate = checkoutDateParam ? new Date(checkoutDateParam) : null;

            // const formattedCheckinDate2 = checkindate ? format(checkindate, 'MM d') : '';
            // const formattedCheckoutDate2 = checkoutdate ? format(checkoutdate, 'MM d') : '';



            setCheckindate(formattedCheckinDate);
            setCheckoutdate(formattedCheckoutDate);
            setCheckoutdate2(formattedCheckoutDate);
            setCheckindate3(formattedCheckinDate2);
            setCheckoutdate3(formattedCheckoutDate2);
            setMinimumprice(queryParams.get('minimumprice'))
            setMaximumprice(queryParams.get('maximumprice'))
            setNumberofguest(queryParams.get('numberofguests'))
            setNumberofrooms(queryParams.get('numberofrooms'))
            setBedtype(queryParams.get('bedtype'))
            setDestination(queryParams.get('destination'))
            setAccommodation(queryParams.get('Accotype'))
            setOtheramenities(queryParams.get('otheramenities'))
            amenitiesother = queryParams.get('otheramenities')

            const accommodationFromUrl = queryParams.get('Accotype');
            setInitialAccommodation(accommodationFromUrl);


            return {
                destination,
                checkindate,
                checkoutdate,
                minimumprice,
                maximumprice,
                numberofguests,
                numberofrooms,
                bedtype,
                Accommodation,
                otheramenities,
                amenitiesother,
            };
        }

        const query = getQueryParameters();

        // Check if any query parameter is present
        if (Object.values(query).some(value => value !== null)) {
            setQueryParameters(query);
        }
    }, []);

    useEffect(() => {
        if (queryParameters) {
            Properties();
        }

    }, [queryParameters]);

    useEffect(() => {
        validateDates();
    }, [checkindate, checkoutdate]);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00
    const checkin = new Date(checkindate);
    checkin.setHours(0, 0, 0, 0); // Set time to 00:00:00
    const checkout = new Date(checkoutdate);
    checkout.setHours(0, 0, 0, 0);

    const validateDates = () => {
        // const today = new Date();
        if (checkin < today) {
            setCheckinError('Check-in date has already passed')
            setdateError('Check-in date has already passed');
            setSearchbutstate(true);
        } else if (checkin >= checkout) {
            setCheckinError('Check-in date must be at least one day before check-out date');
            setSearchbutstate(true);
        } else if (checkout < today) {
            setCheckoutError('Check-out date has already passed');
            setSearchbutstate(true);
        } else if (checkout <= checkin) {
            setdateError('Check-out date must be at least one day after check-in date');
            setCheckoutError('Check-out date must be after check-in date');
            setSearchbutstate(true);
        } else {
            setSearchbutstate(false);
            setCheckoutError(null);
            setCheckinError(null);
            setdateError(null);
            // setSearchbutstate(false);
        }
    };

    useEffect(() => {
        validateprice();
    }, [minimumprice, maximumprice]);


    const validateprice = () => {
        let minimumError = '';
        let maximumError = '';

        setMinimumpricerror(null);
        setMaximumpricerror(null);

        if (minimumprice.length < 3) {
            minimumError = "Minimum price cannot be less than 100 birr";
            setSearchbutstate(true);
        }

        if (maximumprice.length < 3) {
            maximumError = "Maximum price cannot be less than 100 birr";
            setSearchbutstate(true);
        }

        if (minimumprice.length >= 3 && maximumprice.length >= 3 && Number(maximumprice) < Number(minimumprice)) {
            maximumError = "Maximum price must be greater than or equal to Minimum price";
            setSearchbutstate(true);
        }

        setMinimumpricerror(minimumError);
        setMaximumpricerror(maximumError);

        if (minimumError === null && maximumError === null && guesterror === null && roomerror === null && checkinError === null && checkoutError === null) {
            setSearchbutstate(false);
        }
    };

    useEffect(() => {
        validateGusetandRoom();
    }, [numberofguests, numberofrooms]);

    function validateGusetandRoom() {
        let guestnoError = '';
        let roomnoError = '';

        if (numberofguests.length < 1) {
            guestnoError = "Empty Guest number";
            setSearchbutstate(true);
        }

        if (numberofrooms.length < 1) {
            roomnoError = "Empty Room number";
            setSearchbutstate(true);
        }


        setGuestnumbererror(guestnoError);
        setRoomnumbererror(roomnoError);

        if (guestnoError === '' && roomnoError === '' && minimumerror === null && maximumerror === null && checkoutError === null && checkinError === null) {
            setSearchbutstate(false);
        }
    }


    async function Properties() {

        amenitiesother = queryParameters.otheramenities;
        setLoading(true)
        setPagnation(false)
        setSearchbutonstate((Prev) => !Prev)
        setSearchbutstate(true)
        // searchresult.result_status=400
        try {
            const token = JSON.parse(localStorage.getItem('access_token'));

            const request = {
                destination,
                checkindate,
                checkoutdate,
                minimumprice,
                maximumprice,
                numberofguests,
                numberofrooms,
                bedtype,
                Accommodation,
                otheramenities,
                sortingOption
            };

            const response = await axios.post('http://localhost:8000/api/Searchresult', request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status === 200) {
                setSearchresult(response.data.result);
                setAvailabledestinations(response.data.result.destination)
                setAvailableaccommodations(response.data.result.availableaccommodations)
                setAvailablebedtype(response.data.result.availablebedtype)
                setGuestnum(response.data.result.numberofguests)
                console.log(response.data.result)
                console.log(response.data.result.destination)

                if (response.data.result.result_status === 200) {
                    setPagnation(true)
                }

            } else {
                console.log('Else Error');
            }
        } catch (error) {
            console.error(error);
            console.error('Catch Error');
            setSearchbutonstate(false)
        }
        finally {
            setLoading(false)
            setSearchbutonstate(false)
            setSearchbutstate(false)
        }
    }

    const handleSelectDates = () => {
        const checkIn = format(checkindate, 'yyyy-MM-dd')
        const checkOut = format(checkoutdate, 'yyyy-MM-dd')
        localStorage.setItem('checkInDate', checkIn);
        localStorage.setItem('checkOutDate', checkOut);
        // setCheckInDate(checkIn);
        // setCheckOutDate(checkOut);
    };

    const handleDateChange = (date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        setCheckoutdate2(date)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state
        if (name === 'sortingOption') {
            setSortingOption(value);
            Properties()
        }

        switch (name) {

            case 'checkindate':
                setCheckindate(value);
                break;
            case 'checkoutdate':
                setCheckoutdate(value);
                break;
            case 'checkoutdate2':
                setCheckoutdate2(value);
                break;
            case 'minimumprice':
                setMinimumprice(value);
                break;
            case 'maximumprice':
                setMaximumprice(value);
                break;
            case 'Accotype':
                setAccommodation(value);
                break;
            case 'destination':
                setDestination(value);
                break;
            case 'numberofrooms':
                setNumberofrooms(value);
                break;
            case 'numberofguests':
                setNumberofguest(value);
                break;
            case 'bedtype':
                setBedtype(value);
                break;

            default:
                break;
        }

        // Update URL
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(name, value);

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    //The   Properties() method is triggerd when their any change on the 
    useEffect(() => {
        // Call Properties() whenever sortingOption changes sortingOption state variable
        console.log(sortingOption)
        Properties();
    }, [sortingOption]);

    return (
        <>
            <Helmet>
                <title>{pagename}</title>
            </Helmet>
            <Header pagename={pagename} />
            <div className='container mx-auto grid grid-cols-1 lg:grid-cols-8 select-none gap-7 mt-5'>
                <div className=' mt-20 md:col-span-2 col-span-5'>
                    {/* <a href='/Listing' className='font-bold '><AiOutlineArrowLeft className=' mx-auto text-3xl ml-2' /></a> */}

                    <div className='px-2 shadow-lg pb-5 border-gray-300'>
                        <p className="mx-3 font-semibold font-sans text-xl opacity-75 leading-normal">Your Search</p>
                        <div className="mx-3 mt-2">
                            <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                Destination
                            </label>
                            <div className="">
                                <select name="destination" id="destination" className="rounded-3xl border border-gray-300 py-2 px-2 w-full "
                                    value={destination}
                                    onChange={handleInputChange}
                                >

                                    {availabledestinations.map(destinations => (
                                        <option key={destinations.id} value={destinations.city}>{destinations.city}</option>
                                    ))}

                                </select>
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="mx-3 mt-2 w-1/2 md:justify-between">
                                <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                    Minimum Price
                                </label>
                                <div className="">
                                    <input
                                        type="number"
                                        value={minimumprice}
                                        name="minimumprice"
                                        id="minimumprice"
                                        placeholder='Minimum'
                                        onChange={handleInputChange}
                                        autoComplete="address-level2"
                                        className={`w-full p-2 border shadow-sm  rounded-3xl  placeholder:text-gray-400 placeholder:font-normal ${minimumerror ? 'border-red-500' : 'border-gray-300'}`}
                                    />

                                </div>
                            </div>
                            <div className="mx-3 mt-2 w-1/2 md:justify-between">
                                <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                    Maximum Price
                                </label>
                                <div className="">
                                    <input
                                        type="number"
                                        value={maximumprice}
                                        name="maximumprice"
                                        id="maximumprice"
                                        placeholder='Maximum'
                                        onChange={handleInputChange}
                                        autoComplete="address-level2"
                                        className={`w-full p-2 border shadow-sm  rounded-3xl  placeholder:text-gray-400 placeholder:font-normal ${maximumerror ? 'border-red-500' : 'border-gray-300'}`}
                                    />

                                </div>
                            </div>
                        </div>
                        {minimumerror && (
                            <div className="ml-3 text-red-600">{minimumerror}</div>
                        )}
                        {maximumerror && (
                            <div className="ml-3 text-red-600">{maximumerror}</div>
                        )}
                        <div className="mx-3 mt-2">
                            <label htmlFor="city" className="text-md font-medium leading-6 text-gray-600">
                                Check-in date
                            </label>
                            <div className="">
                                <input
                                    type="date"
                                    value={checkindate ? format(checkindate, 'yyyy-MM-dd') : ''}
                                    name="checkindate"
                                    id="checkindate"
                                    placeholder='Enter check in date'
                                    onChange={handleInputChange}
                                    autoComplete="address-level2"
                                    className={`w-full p-2  shadow-sm rounded-3xl placeholder:text-gray-400 placeholder:font-normal ${checkinError ? 'border border-red-600 text-red-600' : 'border border-gray-300 text-black'}`}
                                />
                                {checkinError && (
                                    <div className="mx-3 text-red-600">{checkinError}</div>
                                )}
                            </div>
                        </div>
                        <div className="mx-3 mt-2">
                            <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                Check-out date
                            </label>
                            <div className="">
                                <input
                                    type="date"
                                    value={checkoutdate ? format(checkoutdate, 'yyyy-MM-dd') : ''}
                                    name="checkoutdate"
                                    id="checkoutdate"
                                    placeholder='Enter check out date'
                                    onChange={handleInputChange}
                                    autoComplete="address-level2"
                                    className={`w-full p-2 shadow-sm rounded-3xl  placeholder:text-gray-400 placeholder:font-normal ${checkoutError ? 'border border-red-600 text-red-600' : 'border border-gray-300 text-black'}`}
                                />
                                {checkoutError && (
                                    <div className="mx-3 text-red-600">{checkoutError}</div>
                                )}
                            </div>
                        </div>
                        {/* {error && (
                            <div className="mx-3 text-red-600">{error}</div>
                        )} */}
                        <div className="mx-3 mt-2">
                            <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                Accommodation type
                            </label>
                            <div className="">
                                <select name='Accotype' id="bedOptions" className="rounded-3xl border border-gray-300 py-2 px-2 w-full "

                                    onChange={handleInputChange}
                                    value={Accommodation}>

                                    {availableaccommodations.map(availableaccommodations => (
                                        <option key={availableaccommodations.id} value={availableaccommodations.category_name}>{availableaccommodations.category_name}</option>
                                    ))}

                                </select>
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <div className="mx-3 mt-2 mb-3">
                            <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                Bed Type
                            </label>
                            <div className="">
                                <select name='bedtype' id="bedtype" className="rounded-3xl border border-gray-300 py-2 px-2 w-full "
                                    onChange={handleInputChange}
                                    value={bedtype}>
                                    {availablebedtype.map(availablebedtype => (
                                        <option key={availablebedtype.id} value={availablebedtype.bed_type}>{availablebedtype.bed_type}</option>
                                    ))
                                  }
                                </select>
                                {/* {errorList.city && (
                                            <div className="text-red-600">{errorList.city}</div>
                                        )} */}
                            </div>
                        </div>
                        <div className="flex  justify-between ">
                            <div className="mx-3 mt-2  w-1/2">
                                <label htmlFor="city" className="text-md font-medium leading-6 text-gray-600">
                                    Guests Number
                                </label>
                                <div className="">
                                    <input
                                        type="number"
                                        value={numberofguests}
                                        name="numberofguests"
                                        id="numberofguests"
                                        placeholder='Guests number'
                                        // onChange={(e) => {
                                        //     setNumberofguest(e.target.value)
                                        // }}
                                        min="1"
                                        onChange={handleInputChange}
                                        autoComplete="address-level2"
                                        className={`w-full p-2 shadow-sm border rounded-3xl placeholder:text-gray-400 placeholder:font-normal ${guesterror ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {guesterror && (
                                        <div className=" mt-0 md:text-center  text-red-600">{guesterror}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mx-3 mt-2  w-1/2">
                                <label htmlFor="city" className=" text-md font-medium leading-6 text-gray-600">
                                    Room Number
                                </label>
                                <div className="">
                                    <input
                                        type="number"
                                        value={numberofrooms}
                                        name="numberofrooms"
                                        id="numberofrooms"
                                        placeholder='Room number'
                                        // onChange={(e) => {
                                        //     setNumberofrooms(e.target.value)
                                        // }}
                                        min="1"
                                        onChange={handleInputChange}
                                        autoComplete="address-level2"
                                        className={`w-full p-2 shadow-sm border  rounded-3xl  placeholder:text-gray-400 placeholder:font-normal ${roomerror ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {roomerror && (
                                        <div className=" mt-0  md:text-center text-red-600">{roomerror}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={Properties}
                            disabled={searchbutstate}
                            className={`w-full mx-auto mb-5 mt-5 bg-blue-400  text-white rounded-3xl  min-h-[38px] focus:outline-none ${searchbutonstate ? 'focus:ring focus:ring-blue-300' : ''} ${searchbutstate ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-blue-500'}`}>Search</button>
                    </div>

                    <div className='shadow-lg  mt-5 pb-10'>
                        <p className="mx-3 font-semibold font-sans text-xl opacity-75 leading-normal">Popular Filters</p>
                        <ul className='mx-3 mt-2'>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Affordable Home</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Home With Breakfast Included</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Free AirPort Pickup</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Shared Home</span>
                            </li>
                        </ul>

                        <p className="mt-2 mx-3 font-semibold font-sans text-xl opacity-75 leading-normal">Nightly Rate</p>
                        <ul className='mx-3 mt-2'>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Less than 250ETB pre Night</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>250ETB to 350ETB per Night</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>350ETB to 450ETB per Night</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>450ETB and Above per Night</span>
                            </li>
                        </ul>

                        <p className="mt-2 mx-3 font-semibold font-sans text-xl opacity-75 leading-normal">Guest Reviews</p>
                        <ul className='mx-3 mt-2'>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Any Type</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Excellent Rating</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Very Good Rating</span>
                            </li>
                            <li className="pb-2 flex items-center space-x-1">
                                <BiCheckboxChecked className="text-blue-400 text-2xl " />
                                <span className='text-slate-700 text-sm'>Good Location</span>
                            </li>
                        </ul>
                        <p className="mt-2 mx-3 font-semibold font-sans text-xl opacity-75 leading-normal">Home Category</p>
                        <div className="sm:flex-row space-x-2 space-y-2 flex-col md:justify-around mt-3 ml-3">
                            <button className='border-2 rounded-3xl p-2 min-w-[60px] border-gray-500'>
                                <div className="flex justify-center text-gray-500">
                                    <p>1</p>
                                    <FaStar className='text-gray-500' />
                                </div>
                            </button>
                            <button className='border-2 rounded-3xl p-2 min-w-[60px] border-gray-500'>
                                <div className="flex justify-center text-gray-500">
                                    <p>2</p>
                                    <FaStar className='text-gray-500' />
                                </div>
                            </button>
                            <button className='border-2 rounded-3xl p-2 min-w-[60px] border-gray-500'>
                                <div className="flex justify-center text-gray-500">
                                    <p>3</p>
                                    <FaStar className='' />
                                </div>
                            </button>
                            <button className='border-2 rounded-3xl p-2 min-w-[60px] border-gray-500'>
                                <div className="flex justify-center text-gray-500">
                                    <p>4</p>
                                    <FaStar className='text-gray-500' />
                                </div>
                            </button>

                        </div>
                    </div>
                </div>

                <div className='md:mt-20 col-span-6'>
                    <p className='text-gray-600 ml-3'>{searchresult.totalfound} Homes Found</p>
                    {
                        loading ?
                            <>

                            </>
                            :

                            (
                                <div className='md:flex flex-cols justify-between'>
                                    <p className='text-2xl font-bold font-sans ml-3'>Ethiopia {searchresult.destinationcurrent},
                                        {new Date(searchresult.checkindate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit"
                                        })} - {new Date(searchresult.checkoutdate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "2-digit"
                                        })},

                                        {searchresult.currentbedtype} Room ,

                                        {guestnum > 1 ? `${guestnum} Guests` : `${guestnum} Guest`} </p>

                                    <div className="">
                                        <div className="">
                                            <select
                                                id="sortingOption"
                                                name="sortingOption"
                                                autoComplete="country-name"
                                                className={`ml-3 p-2 border border-gray-300 rounded-2xl placeholder:font-light placeholder:text-gray-500 `}
                                                // value={sortingOption}
                                                onChange={handleInputChange}
                                            >
                                                {
                                                    sortingOption ? '' :
                                                        <option value=''>Sort by</option>
                                                }
                                                {
                                                     sortingOption ?  <option value = {sortingOption}>{sortingOption}</option> 
                                                     : ''
                                                }
                                               
                                                { sortingOption == "Price" ? '' : 
                                                  <option value="Price">Price</option>
                                                }
                                                { sortingOption == "Distance" ? '' :
                                                   <option value="Distance">Distance</option>
                                                }
                                                {/* <option value="reviews">Reviews</option> */}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )
                    }

                    {
                        loading ? (

                            <div className="flex items-center justify-center" role="status">
                                <div className="flex flex-row space-x-2 items-center">
                                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <p className="text-2xl font-semibold text-gray-700">Loading...</p>
                                </div>
                            </div>)
                            :
                            searchresult.result_status !== 200 ? (
                                <p className="text-2xl text-center font-semibold text-gray-700 pt-20">No result found</p>
                            )
                                :
                                (
                                    // searchresult.property_name.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage).map((name, index) => (
                                    //      adjustedIndex = (currentPage - 1) * resultsPerPage + index;
                                    searchresult.property_name.map((name, index) => (
                                        <div key={index} className="grid lg:grid-cols-9 grid-col-4 gap-3 grid-flow-row-dense p-3 mt-3 shadow-lg rounded-2xl">
                                            <img
                                                src={`http://localhost:8000/images/${searchresult.property_image[index]}`}
                                                className="col-span-2 w-full min-h-[200px] rounded-2xl"
                                                alt="Property"
                                            />
                                            <div className='col-span-5'>
                                                <p className="text-2xl font-sans">{name}</p>
                                                <p className="text-sm text-gray-400 pt-1">
                                                    {searchresult.distance_center[index]}Km from city center
                                                </p>
                                                <p className="text-sm text-gray-400">Great amenities</p>
                                                <p className="pt-5 text-lg font-sans">
                                                    {searchresult.room_type[index]}
                                                </p>
                                                <p className="text-sm text-gray-500 pt-1">
                                                    {/* 1x King size bedroom, 1x Bath room */}
                                                    {searchresult.bedtype[index]}
                                                </p>
                                                <div className="md:flex space-x-3">
                                                    <button className="mt-5 text-gray-400 border-2 border-gray-500 rounded-2xl py-1 px-2 hover:text-gray-600 hover:border-gray-500">
                                                        #Special Offer
                                                    </button>
                                                    <button className="mt-5 text-gray-400 border-2 border-gray-500 rounded-2xl py-1 px-5 hover:text-gray-600 hover:border-gray-500">
                                                        #Popular
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='col-span-2'>
                                                <div className="lg:flex flex-cols">
                                                    <div>
                                                        <p className="font-semibold text-lg leading-normal">Super</p>
                                                        <p className="text-sm text-gray-400 leading-normal">
                                                            1920 reviews
                                                        </p>
                                                    </div>
                                                    <div className="mt-2">
                                                        <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300  text-white rounded-2xl  py-1 px-6 lg:ml-3">
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-white">96</span>
                                                                <FaStar className="text-white" />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-2xl pt-10 ">
                                                    {searchresult.price[index]} ETB
                                                </p>
                                                <p className="text-gray-400 text-md mb-10">
                                                    Per night, 3 guests
                                                </p>

                                                <Link
                                                    to={`/Listing/${searchresult.id[index]}`}
                                                    className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300  text-white rounded-2xl  py-1 mt-10 px-8"
                                                    onClick={handleSelectDates}>
                                                    View More
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                    ))}
                    {/* <div>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          )}

          {searchresult.property_name && currentPage < Math.ceil(searchresult.property_name.length / resultsPerPage) && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          )}
        </div> */}





                    {/* <div className='grid lg:grid-cols-9 grid-col-4 gap-3 grid-flow-row-dense mt-5 p-3 mt-3 shadow-lg rounded-2xl'>
                        <img
                            src={bed5}
                            className="col-span-2 w-full min-h-[200px]  rounded-2xl"
                        />
                        <div className='col-span-5 '>
                            <p className=' text-2xl font-sans'>Inter Addis Hotel</p>
                            <p className='text-sm text-gray-400 pt-1'>7km from city center</p>
                            <p className='text-sm text-gray-400'>Great amenities</p>

                            <p className='pt-5 text-lg font-sans'>Spacious Rooms</p>
                            <p className='text-sm text-gray-500 pt-1'>1x King size bedroom,1x Bath room</p>
                            <div className='md:flex space-x-3'>
                                <button className="mt-5 text-gray-400 border-2 border-gray-500 rounded-2xl py-1 px-2 hover:text-gray-600 hover:border-gray-500">
                                    #Special Offer
                                </button>
                                <button className="mt-5 text-gray-400 border-2 border-gray-500 rounded-2xl py-1 px-5 hover:text-gray-600 hover:border-gray-500">
                                    #Popular
                                </button>
                            </div>


                        </div>
                        <div className='col-span-2'>
                            <div className='lg:flex flex-cols '>
                                <div>
                                    <p className="font-semibold text-lg leading-normal">Super</p>
                                    <p className="text-sm text-gray-400 leading-normal">1920 reviews</p>
                                </div>
                                <div className='mt-2'>
                                    <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300  text-white rounded-2xl  py-1 px-6 lg:ml-3">
                                        <div className="flex items-center space-x-1">
                                            <span className='text-white'>96</span>
                                            <FaStar className='text-white' />
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <p className='font-bold text-2xl pt-10'>1350ETB</p>
                            <p className='text-gray-400 text-md mb-10'>Per night,3 guests</p>
                            <Link to="/Listing" className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300  text-white rounded-2xl  py-1 mt-10 px-8">
                                View More
                            </Link>
                        </div>
                    </div> */}

                    {
                        pagnation ? (
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-10 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                                    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center  sm:justify-between">
                                    <div className='pr-2'>
                                        <div className="flex space-x-1 text-sm text-gray-700">
                                            <p>Showing</p>
                                            <span className="font-medium ">1</span>
                                            <p>to</p>
                                            <span className="font-medium">10</span>
                                            <p>of</p>
                                            <span className="font-medium">97</span>
                                            <p>results</p>
                                        </div>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                <span className="sr-only">Previous</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                                </svg>
                                            </a>

                                            <a
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${activeButton === 1 ? 'text-white bg-blue-400 hover:bg-blue-500' : 'text-gray-900'
                                                    } cursor-pointer ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                                                onClick={() => handleClick(1)}
                                            >
                                                1
                                            </a>
                                            <a
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${activeButton === 2 ? 'text-white bg-blue-400 hover:bg-blue-500' : 'text-gray-900'
                                                    } cursor-pointer ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                                                onClick={() => handleClick(2)}
                                            >
                                                2
                                            </a>

                                            <a
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${activeButton === 3 ? 'text-white bg-blue-400 hover:bg-blue-500 ' : 'text-gray-900'
                                                    } cursor-pointer ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                                                onClick={() => handleClick(3)}
                                            >
                                                3
                                            </a>
                                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                            <a
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${activeButton === 8 ? 'text-white bg-blue-400 hover:bg-blue-500' : 'text-gray-900'
                                                    } cursor-pointer ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                                                onClick={() => handleClick(8)}
                                            >
                                                8
                                            </a>
                                            <a
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${activeButton === 9 ? 'text-white bg-blue-400 hover:bg-blue-500' : 'text-gray-900'
                                                    } cursor-pointer ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                                                onClick={() => handleClick(9)}
                                            >
                                                9
                                            </a>
                                            <a
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${activeButton === 10 ? 'text-white bg-blue-400 hover:bg-blue-500' : 'text-gray-900'
                                                    } cursor-pointer ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                                                onClick={() => handleClick(10)}
                                            >
                                                10
                                            </a>


                                            <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                <span className="sr-only">Next</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                                </svg>
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )
                            :
                            <>

                            </>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SearchResult
