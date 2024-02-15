import React from 'react'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'
import './Css/Grid.css'
import hotel2 from './Photos/hotel2.jpeg'
import intergym2 from './Photos/intergym2.jpg'
import hotel3 from './Photos/hotel3.jpeg'
import roomview3 from './Photos/roomview3.jpg'
import bed5 from './Photos/bed5.jpeg'
import bathroom from './Photos/bathroom.jpg'
import swimingpool from './Photos/swimingpool.jpeg'
import { BiBed, BiDollarCircle, BiCalendarCheck, BiFoodMenu, BiStreetView, BiSwim, BiSquare, BiHeart } from 'react-icons/bi';
import { FaWifi, FaParking, FaClock, FaSwimmingPool, FaBed, FaPlus, FaDollyFlatbed, FaBath, FaDesktop, FaIdCard, FaTaxi, FaFacebookSquare, FaFoursquare, FaSquare, FaSquarespace, FaSquareFull, FaFire, FaMinus, FaHeart } from 'react-icons/fa';
import { GiWashingMachine, GiWeightLiftingUp } from 'react-icons/gi';
import { IoBedOutline, IoFitnessSharp } from 'react-icons/io5';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './Footer'
import { Spinner } from 'react-bootstrap'
import { HiOutlineRefresh } from 'react-icons/hi';
import data from './data.json'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Finishsetup from './Finishsetup'

function Propertydetail() {
  const [pagename, setPagename] = useState('');
  const [selectedSection, setSelectedSection] = useState('overview');
  const [imageoverview, setImageoverview] = useState(hotel3);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [likedCards, setLikedCards] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [finishsetup, setFinishsetup] = useState(false);
  const [propertyof, setPropertyof] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [userstatus, setUserstatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propid, setpropId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLikeClick = (index) => {
    const updatedLikedCards = [...likedCards];
    updatedLikedCards[index] = !updatedLikedCards[index];
    setLikedCards(updatedLikedCards);
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        },
      },
    ],
    customPaging: (index) => (
      <button
        className={`w-6 h-6 rounded-full ${index === activeSlide ? 'bg-blue-500' : 'bg-red-300'
          }`}
        onClick={() => setActiveSlide(index)}
      ></button>
    ),
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token'))//user is logged in so when user try to navigate using a get url typing it redirect it to the /Add url or add page
    {
      navigate("/Login");
    }
    fetchrooms()
    setPagename('Property Detail')
  }, []);

  async function fetchrooms() {
    // try {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const userinfo = JSON.parse(localStorage.getItem('user-info'));
    const ids = userinfo.id;
    const item = { ids }
    await axios.post(`http://localhost:8000/api/Getrooms/${id}`,item,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        setRooms(response.data.rooms)
        setPropertyof(response.data.propertyof)
        setPropertyImages(response.data.propertyImages)
        setUserstatus(response.data.userstatus)
        console.log(response.data.rooms)
        console.log(response.data.propertyImages)
        console.log(response.data.userstatus)
      })
      .catch(error => {
        console.error('Catch request error')
       
      })
      .finally(() => {
        setLoading(false)
      });
  }

  const handelBooknow = (idclick)=>{
    if(userstatus){
      setpropId(idclick)
      setIsModalOpen(true);
    }
    else{
      navigate(`/Paymentpage/${idclick}`);
    }
  }
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className='mt-2'>
            <h2 className="text-xl font-semibold mb-4">Hotel Overview</h2>
            <ul className="grid md:grid-cols-2 md:grid-row-4 gap-x-4">
              <li className="flex items-center space-x-1">
                <FaWifi className="text-gray-900" />
                <span>Free WiFi</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiFoodMenu className="text-gray-900" />
                <span>Fast Catering</span>
              </li>
              <li className="flex items-center space-x-1">

                <FaParking className="text-gray-800" />
                <span>Secure Parking</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiSwim className="text-gray-800" />
                <span>Swimming Pool</span>
              </li>
              <li className="flex items-center space-x-1">
                <FaClock className="text-gray-800" />
                <span>24/7 Services</span>
              </li>

              <li className="flex items-center space-x-1">
                <BiDollarCircle className="text-gray-900" />
                <span>Affordable Prices</span>
              </li>
              {/* Add more overview items */}
            </ul>
          </div>
        );
      case 'rooms':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Room Overview</h2>
            <ul className="grid md:grid-cols-2 md:grid-row-4 gap-x-4">
              <li className="flex items-center space-x-1">
                <FaIdCard className="text-gray-900" />
                <span>Card Lock Door</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiBed className="text-gray-900" />
                <span>King Size Bed</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiStreetView className="text-gray-900" />
                <span>Smart City View</span>
              </li>
              <li className="flex items-center space-x-1">
                <FaBath className="text-gray-900" />
                <span>Clean Bathroom</span>
              </li>
              <li className="flex items-center space-x-1">
                <FaDesktop className="text-gray-900" />
                <span>Smart Tv</span>
              </li>
              <li className="flex items-center space-x-1">
                <FaFire className="text-gray-900" />
                <span>Air Conditioner</span>
              </li>
            </ul>

          </div>
        );
      case 'amenities':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <ul className="grid md:grid-cols-2 md:grid-row-4 gap-x-4">
              <li className="flex items-center space-x-1">
                <GiWashingMachine className="text-gray-900" />
                <span>Laundry</span>
              </li>
              <li className="flex items-center space-x-1">
                <GiWeightLiftingUp className="text-gray-900" />
                <span>Fitness Center</span>
              </li>
              <li className="flex items-center space-x-1">
                <IoFitnessSharp className="text-gray-900" />
                <span>Spa and Wellness</span>
              </li>
              <li className="flex items-center space-x-1">
                < FaTaxi className="text-gray-900" />
                <span>Transport Service</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiSwim className="text-gray-900" />
                <span>Swimming Pool</span>
              </li>
              {/* Add more amenities */}
            </ul>
          </div>
        );
      case 'prices':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Price Details</h2>
            <ul className="grid md:grid-cols-2 md:grid-row-4 gap-x-4">
              <li className="flex items-center space-x-1">
                <BiDollarCircle className="text-gray-900" />
                <span>Starting from $99 per night</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiCalendarCheck className="text-gray-900" />
                <span>Flexible Booking</span>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Helmet>
        <title>{pagename}</title>
      </Helmet>
      <span className='font-bold '><AiOutlineArrowLeft className=' mx-auto text-3xl ml-5' style={{ marginTop: 100 }} /></span>
      <div className='ml-5 mr-5'>

        <div className=' mx-auto grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 grid-rows-4 gap-3 grid-flow-row-dense mt-5'  >
          {
            propertyImages[0] ?
              <div className='bg-cover bg-center bg-auto col-span-2 row-span-2 shadow-lg rounded-2xl min-h-[250px]' style={{ backgroundImage: `url(http://localhost:8000/images/${propertyImages[0]})` }}></div>
              :
              (
                <div class=" col-span-2 row-span-2 items-center pt-20 min-h-[250px] rounded-md p-4 max-w-lg w-full mx-auto">
                  <div class="items-center animate-pulse flex space-x-4">
                    <div class="rounded-full bg-slate-300 h-10 w-10"></div>
                    <div class="flex-1 space-y-6 py-1">
                      <div class="h-2 bg-slate-300 rounded"></div>
                      <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                          <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                          <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>)
          }

          {
            propertyImages[1] ?
              <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(http://localhost:8000/images/${propertyImages[1]})` }}></div>
              :
              (<div class=" items-center  rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="items-center animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-300 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-300 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>)
          }

          {
            propertyImages[2] ?
              <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(http://localhost:8000/images/${propertyImages[2]})` }}></div>
              :
              (<div class=" items-center   rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="items-center animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-300 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-300 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>)
          }

          {
            propertyImages[3] ?
              <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(http://localhost:8000/images/${propertyImages[3]})` }}></div>
              :
              (<div class=" items-center   rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="items-center animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-300 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-300 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>)
          }

          {
            propertyImages[4] ?
              <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(http://localhost:8000/images/${propertyImages[4]})` }}></div>
                :
              (<div class="items-center  rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="items-center animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-300 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-300 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>)
          }
        </div>



        <div className=' mx-auto flex flex-col md:flex-row justify-between pt-5'>
          <div>
            <p className="font-bold text-2xl leading-normal">{propertyof.property_of}</p>
            <p className="text-sm text-slate-500 leading-normal">{propertyof.property_description}</p>
          </div>
          <div className='md flex'>
            <div>
              <p className="font-bold text-lg leading-normal">Fair Price</p>
              <p className="text-sm text-slate-500 leading-normal">Per night</p>
            </div>
            <div className='mt-2'>
              <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300  text-white rounded-2xl  py-1 px-8 ml-5">
                $99
              </button>
            </div>
          </div>
        </div>
        <div className=" mx-auto px-3 flex flex-col md:flex-row justify-between pt-5 ">
          <div className="flex flex-col md:flex-row md:space-x-10 cursor-pointer">
            <a
              className={`text-lg ${selectedSection === 'overview' ? 'font-bold text-black' : 'text-slate-500'}`}
              onClick={() => { handleSectionClick('overview'), setImageoverview(hotel3) }}>
              Overview
            </a>
            <a
              className={`text-lg ${selectedSection === 'rooms' ? 'font-bold text-black' : 'text-slate-500'}`}
              onClick={() => { handleSectionClick('rooms'), setImageoverview(roomview3) }}>
              Rooms
            </a>
            <a
              className={`text-lg ${selectedSection === 'amenities' ? 'font-bold text-black' : 'text-slate-500'}`}
              onClick={() => { handleSectionClick('amenities'), setImageoverview(intergym2) }}>
              Amenities
            </a>
            <a

              className={`text-lg ${selectedSection === 'prices' ? 'font-bold text-black' : 'text-slate-500'}`}
              onClick={() => { handleSectionClick('prices'), setImageoverview(hotel2) }}>
              Prices
            </a>

          </div>

        </div>
        <hr className=" mx-auto mt-3 " />
        <div className=" mx-auto md:flex  justify-between mt-4">
          <div id="section-content" className="mb-8">
            {renderContent()}
          </div>
          <div className="img relative">
            <img src={imageoverview} alt="" className=" shadow-lg rounded-2xl w-full h-full object-contain max-w-xs max-h-44" />
          </div>
        </div>
        <hr className="mx-auto mt-3 " />

        <div className="mx-auto  font-sans text-xl font-semibold mt-5" >
          <p>Rooms</p>
        </div>

        <div className=" mx-2">

          <Slider {...settings} className="mt-8" beforeChange={(_, nextSlide) => setActiveSlide(nextSlide)}>
            {
              loading ?
               
                <div className="flex items-center justify-center" role="status">
                  <div className="flex flex-row space-x-2 items-center">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p className="text-2xl font-semibold text-gray-700">Loading...</p>
                  </div>
                </div>
                :
                rooms.map((property, index) => (
                  <div key={index} className="rounded-2xl shadow-yxl p-3">

                    <div className="img relative">
                      <div className="relative z-40 bottom-[-60px] md:left-[10px] sm:left-[590px] left-[230px]">
                        <button
                          className="text-black bg-transparent rounded-3xl shadow-xl border-2 w-9 h-9 border-black-700 focus:outline-none"
                          onClick={() => handleLikeClick(index)}>
                          {likedCards[index] ? (
                            <FaHeart className="text-red-700 w-8 h-8 p-1" />
                          ) : (
                            <BiHeart className="text-white w-8 h-8 p-1" />
                          )}
                        </button>
                      </div>
                      <img
                        // src={property.image}
                        src={`http://localhost:8000/images/${property.image}`}
                        alt={property.name}
                        className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl"
                      />
                    </div>

                    <div className="flex flex-col gap-1 mt-3">
                      <div>
                        <p className='text-slate-900 font-sans text-lg font-semibold'>{property.name}</p>
                      </div>
                      <div>
                        <ul className="">
                          <li className="flex items-center space-x-1">
                            <BiSquare className="text-gray-900" />
                            <span className='text-slate-700'>{property.sqkm}</span>
                          </li>
                          <li className="flex items-center space-x-1">
                            <IoBedOutline className="text-gray-900" />
                            <span className='text-slate-700'>{property.accomodate}</span>
                          </li>
                          <li className="flex items-center space-x-1">
                            <FaBed className="text-gray-900" />
                            <span className='text-slate-700'>{property.bed}</span>
                          </li>
                        </ul>
                      </div>
                      <p className='text-sm text-slate-500'>{property.policy}</p>

                      <div className="flex justify-center text-blue-500">
                        {/* <Link to={`/Paymentpage/${property.id}`} className="w-full text-center bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                          Book now
                        </Link> */}
                        <button className='w-full text-center bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3' 
                        onClick={() => handelBooknow(property.id)}>
                          Book now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            }
          </Slider>
        </div>
        {isModalOpen && <Finishsetup idclick={propid}  onClose={handleCloseModal} />}
        <div className=" mx-auto">
          <div className="grid md:grid-cols-7 grid-cols-1 gap-4 justify-between">
            {/* Column 1 */}
            <div className="col-span-2">
              <h2 className="font-sans text-xl font-semibold mt-8">Review</h2>
              <p className="text-3xl mb-3 mt-5">9.6/10</p>
              <div>
                <p className="mb-1">Cleanliness</p>
                <div className="relative">
                  <input type="range" min="0" max="10" value="10" className="w-full h-4 appearance-none rounded-full overflow-hidden bg-gray-200" disabled />
                  <div className="absolute top-0 left-0 h-4 bg-blue-400 rounded-full w-full" style={{ width: '100%' }}></div>

                </div>
                <p className="mb-1">Amenities</p>
                <div className="relative">
                  <input type="range" min="0" max="10" value="7" className="w-full h-4 appearance-none rounded-full overflow-hidden bg-gray-200" disabled />
                  <div className="absolute top-0 left-0 h-4 bg-blue-400 rounded-full" style={{ width: '70%' }}></div>

                </div>
                <p className="mb-1">Location</p>
                <div className="relative">
                  <input type="range" min="0" max="10" value="9" className="w-full h-4 appearance-none rounded-full overflow-hidden bg-gray-200" disabled />
                  <div className="absolute top-0 left-0 h-4 bg-blue-400 rounded-full" style={{ width: '90%' }}></div>

                </div>
                <p className="mb-1">Comfort</p>
                <div className="relative">
                  <input type="range" min="0" max="10" value="8" className="w-full h-4 appearance-none rounded-full overflow-hidden bg-gray-200" disabled />
                  <div className="absolute top-0 left-0 h-4 bg-blue-400 rounded-full" style={{ width: '80%' }}></div>

                </div>
                <p className="mb-1">Wi-Fi Connection</p>
                <div className="relative">
                  <input type="range" min="0" max="10" value="9" className="w-full h-4 appearance-none rounded-full overflow-hidden bg-gray-200" disabled />
                  <div className="absolute top-0 left-0 h-4 bg-blue-400 rounded-full" style={{ width: '90%' }}></div>

                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-span-5 pt-20">
              {/* Add content for the second column here */}
              <div className='flex md:flex-row flex-col justify-between'>
                <div>
                  <p className="font-sans text-lg font-semibold  md:pl-10">Excellent value for the price</p>
                  <p className="font-sans text-sm text-slate-400 font-semibold  md:pl-10">Reviewed by</p>
                  <p className="font-sans text-md font-semibold text-slate-600  md:pl-10">We enjoy our stay at this hotel we will definetly come back!</p>
                  <ul className="md:pl-10 pt-5">
                    <li className="flex items-center space-x-1">
                      <FaPlus className="text-gray-900" />
                      <span>Greate Location</span>
                    </li>
                    <li className="flex items-center space-x-1">
                      <FaPlus className="text-gray-900" />
                      <span>Service</span>
                    </li>
                    <li className="flex items-center space-x-1">
                      <FaPlus className="text-gray-900" />
                      <span>Bottle of champagne</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex md:flex justify-center items-center pt-10">
                    <p className='font-sans text-lg font-semibold  md:pl-10'>Excellent</p>
                    <p className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5 ml-5">
                      10
                    </p>
                  </div>
                  <p className="font-sans text-sm text-slate-400 font-semibold  md:pl-10 pt-20 ">Reviewed by</p>
                  <p className="font-sans text-sm text-slate-400 font-semibold  md:pl-10  ">25 september 2023 </p>

                </div>
              </div>

              <hr className=" mx-auto mt-3" />
              <div className='flex md:flex-row flex-col justify-between'>
                <div>
                  <p className="font-sans text-lg font-semibold pt-5 md:pl-10">Good place but noisy location</p>
                  <p className="font-sans text-sm text-slate-400 font-semibold  md:pl-10">Reviewed by</p>
                  <p className="font-sans text-md font-semibold text-slate-600  md:pl-10">Had a room facing the street it was super noisy.Unfortunatlly we couldn't chage a room</p>
                  <ul className="md:pl-10 pt-5">
                    <li className="flex items-center space-x-1">
                      <FaMinus className="text-gray-900" />
                      <span>Noisy</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex md:flex justify-center items-center pt-10">
                    <p className='font-sans text-lg font-semibold  pl-10'>Avarage</p>
                    <p className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5 ml-5">
                      5.6
                    </p>
                  </div>
                  <p className="font-sans text-sm text-slate-400 font-semibold  md:pl-10 pt-20 ">Reviewed by</p>
                  <p className="font-sans text-sm text-slate-400 font-semibold  md:pl-10  ">25 september 2023 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className=" mx-auto mt-3 " /> */}
        <Footer />
      </div>
    </>
  )
}

export default Propertydetail
