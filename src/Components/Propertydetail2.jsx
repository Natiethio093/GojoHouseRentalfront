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
import { BiBed, BiDollarCircle, BiCalendarCheck, BiFoodMenu, BiStreetView, BiSwim, BiSquare } from 'react-icons/bi';
import { FaWifi, FaParking, FaClock, FaSwimmingPool, FaBed, FaDollyFlatbed, FaBath, FaDesktop, FaIdCard, FaTaxi, FaFacebookSquare, FaFoursquare, FaSquare, FaSquarespace, FaSquareFull, FaFire } from 'react-icons/fa';
import { GiWashingMachine, GiWeightLiftingUp } from 'react-icons/gi';
import { IoBedOutline, IoFitnessSharp } from 'react-icons/io5';
import { AiOutlineArrowRight } from 'react-icons/ai'

function Productdetail2 (){
    const [pagename, setPagename] = useState('');
    const [selectedSection, setSelectedSection] = useState('overview');
    const [imageoverview, setImageoverview] = useState(hotel3);
  useEffect(() => {
    const slider = $('.slider');
    slider.slick({
      slidesToShow: 4, // Number of slides to show initially
      slidesToScroll: 1, // Number of slides to scroll at a time
      infinite: false, // Disable infinite loop
      responsive: [
        {
          breakpoint: 640, // Adjust as needed
          settings: {
            slidesToShow: 1, // Number of slides to show on smaller screens
          },
        },
      ],
    });
    setPagename('Property Detail')
  }, []);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
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
                <FaSwimmingPool className="text-gray-800" />
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
                <span>Laundary</span>
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

      <div className='container mx-auto grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 grid-rows-5 gap-3 grid-flow-row-dense mt-20' style={{ marginTop: 130 }} >
        <div className='bg-cover bg-center bg-auto  col-span-2 row-span-2 shadow-lg rounded-2xl min-h-[250px]' style={{ backgroundImage: `url(${bed5}` }}></div>
        <div className='bg-cover bg-bottom bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(${hotel2}` }}></div>
        <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(${bathroom}` }}></div>
        <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(${roomview3}` }}></div>
        <div className='bg-cover bg-center bg-auto shadow-lg rounded-2xl min-h-[50px]' style={{ backgroundImage: `url(${swimingpool}` }}></div>
      </div>
      <div className='container mx-auto flex flex-col md:flex-row justify-between pt-5'>
        <div>
          <p className="font-bold text-2xl leading-normal">Inter Continental Hotel</p>
          <p className="text-sm text-slate-500 leading-normal">Elegant room smart city views and Fast and hot catering</p>
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
      <div className="container mx-auto px-3 flex flex-col md:flex-row justify-between pt-5 space-x-10">
        <div className="flex flex-col md:flex-row space-x-10">
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
            onClick={() => { handleSectionClick('amenities'), setImageoverview(intergym2) }}
          >
            Amenities
          </a>
          <a

            className={`text-lg ${selectedSection === 'prices' ? 'font-bold text-black' : 'text-slate-500'}`}
            onClick={() => { handleSectionClick('prices'), setImageoverview(hotel2) }}>
            Prices
          </a>

        </div>

      </div>
      <hr className="container mx-auto mt-3 " />
      <div className="container mx-auto md:flex  justify-between mt-4">
        <div id="section-content" className="mb-8">
          {renderContent()}
        </div>
        <div className="img relative">
          <img src={imageoverview} alt="" className=" shadow-lg rounded-2xl w-full h-full object-contain max-w-xs max-h-44" />
        </div>
      </div>
      <hr className="container mx-auto mt-3 " />

      <div className="container  mx-auto  font-sans text-xl font-semibold" >
        <p>Rooms</p>
      </div>
      <div className="container mx-auto flex md:flex justify-center">
        <div className="flex space-x-4">
      <div className="slider">
        {/* Card 1 */}
        
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 - Hidden initially */}
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6 - Hidden initially */}
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 7 - Hidden initially */}
        <div className="p-3">
          <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-xl p-3">
            {/* Card content */}
            <div className="img relative ">
              <img src={bed5} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-contain rounded-2xl" />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <p className='text-slate-900 font-sans text-lg font-semibold'>Luxurious double room</p>
              </div>
              <div>
                <ul className="">
                  <li className="flex items-center space-x-1">
                    <BiSquare className="text-gray-900" />
                    <span className='text-slate-700'>35sqm</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <IoBedOutline className="text-gray-900" />
                    <span className='text-slate-700'>Accomodate</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <FaBed className="text-gray-900" />
                    <span className='text-slate-700'>1 king size bed and couch</span>
                  </li>
                </ul>
              </div>

              <p className='text-sm text-slate-500'>Non refendable,Breakfast included</p>
              <div className="flex justify-center text-blue-500">
                <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-20 mt-3">
                   Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</div>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
    </>
  );
};

export default Productdetail2;