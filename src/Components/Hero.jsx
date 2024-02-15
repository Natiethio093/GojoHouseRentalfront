import { useState, useEffect } from 'react'
import './Css/Grid.css'
import bd2 from './Photos/bd2.jpeg'
import bed3 from './Photos/bed3.jpeg'
import bed5 from './Photos/bed5.jpeg'
import bed9 from './Photos/bed9.jpg'
import arbaminch from './Photos/arbaminch.jpeg'
import addis1 from './Photos/addis1.jpeg'
import hawassa1 from './Photos/hawassa1.jpeg'
import roomview4 from './Photos/roomview4.jpeg'
import roomview6 from './Photos/roomview6.jpg'
import roomview7 from './Photos/roomview7.jpg'
import roomview8 from './Photos/roomview8.jpg'
import mekele1 from './Photos/mekele1.jpeg'
import diredawa from './Photos/diredawa.jpeg'
import { Helmet } from "react-helmet";
import Header from './Header'
import { BiArrowFromLeft } from 'react-icons/bi'
import { FaBath } from 'react-icons/fa'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Footer from './Footer'
function Hero() {
    const [count, setCount] = useState(0);
    const [pagename, setPagename] = useState("");


    // useEffect(() => {

    // }, [])

    // useEffect(() => {
    //     setPagename('Hero');
    //     const motionElements = document.querySelectorAll('.motion-effect');
    //     motionElements.forEach((element, index) => {
    //         setTimeout(() => {
    //             element.classList.add('show');
    //         }, index * 500); // Delay each element by 500ms
    //     });
    // }, []);

    useEffect(() => {
        setPagename('Home')
        const motionElements = document.querySelectorAll('.motion-effect');
    
        const showMotionEffect = () => {
          motionElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('show');
            }, index * 1000); // Delay each element by 1000ms
          });
        };
    
        showMotionEffect(); // Show the motion effect initially
    
        const interval = setInterval(() => {
          motionElements.forEach((element) => {
            element.classList.remove('show');
          });
    
          setTimeout(() => {
            showMotionEffect();
          }, 1000);
        }, 7000); // Run the motion effect every 15 seconds (15,000 milliseconds)
    
        const repeatInterval = setInterval(() => {
          motionElements.forEach((element) => {
            element.classList.remove('show');
          });
    
          setTimeout(() => {
            showMotionEffect();
          }, 1000);
        }, 900000); // Repeat the motion effect every 15 minutes (900,000 milliseconds)
    
        return () => {
          clearInterval(interval); // Clean up the interval when the component unmounts
          clearInterval(repeatInterval); // Clean up the repeat interval when the component unmounts
        };
      }, []);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = (e) => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <Helmet>
                <title>{pagename}</title>
            </Helmet>

            {/* <div className='bg-green-200 hover:bg-green-300 active:bg-green-400 rounded-lg shadow-xl min-h-[50px] col-span-4 ' /> */}

            <Header />

            {/* <div className=' mx-5 bg-white bg-opacity-30 backdrop-blur-sm drop-shadow-lg md:block grid grid-cols-1  sm:grid-rows-6 gap-2 content-center grid-flow-row-dense mt-20 ' style={{ marginBottom: 80 }}>
                <div className='bg-auto bg-center bg-cover rounded-2xl shadow-xl min-h-[250px] col-span-4 row-span-6' style={{ backgroundImage: `url(${bed5})` }} />
            </div> */}

            <div className='mx-5 bg-white bg-opacity-30 backdrop-blur-sm select-none content-center grid-flow-row-dense mt-20' >
                <div className='bg-auto bg-center bg-cover rounded-2xl  min-h-[250px] col-span-4 row-span-6' style={{ backgroundImage: `url(${bed5})` }}>
                    <div className='absolute top-0 left-0 w-full h-full bg-white opacity-50 rounded-2xl'></div>
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center hidden xl:block">
                        <h2 className="text-gray-900 md:text-3xl text-lg font-bold font-sans motion-effect">
                            Book Your Dream House With Gojo
                        </h2>
                        <p className="text-gray-900 font-sans md:text-md pt-2 font-semibold text-sm motion-effect">
                            Discover Over 1 Million Homes Worldwide
                        </p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='mx-auto shadow-lg lg:px-20 px-10 xl:space-x-10 flex flex-col xl:flex-row justify-center items-center bg-white xl:rounded-l-full xl:rounded-r-full py-3' style={{ position: 'relative', transform: 'translateY(-50%)' }}>
                        <div className='flex flex-col mb-2 sm:mb-0 sm:mr-2 '>
                            <label htmlFor='location' className='mb-1 text-sm'>
                                Location
                            </label>
                            <input type='text' id='location' className='border border-gray-200 p-1 rounded-sm md:min-w-[210px] min-w-[192px]' placeholder='Where are you travling?' />
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-0 sm:mr-2'>
                            <label htmlFor='location' className='mb-1 text-sm'>
                                Check-in
                            </label>
                            <input type='date' id='location' className='border  border-gray-200 p-1 rounded-sm md:min-w-[210px] min-w-[192px]' placeholder='' />
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-0 sm:mr-2'>
                            <label htmlFor='location' className='mb-1 text-sm'>
                                Check-out
                            </label>
                            <input type='date' id='location' className='border  border-gray-200 p-1 rounded-sm md:min-w-[210px] min-w-[192px]' placeholder='' />
                        </div>
                        <div className='flex flex-col mb-2 sm:mb-0 sm:mr-2'>
                            <label htmlFor='location' className='mb-1 text-sm'>
                                Guests
                            </label>
                            <input type='number' id='location' className='border  border-gray-200 p-1 rounded-sm md:min-w-[210px] min-w-[192px]' placeholder='Number of Guests' />
                        </div>

                        <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300  text-white rounded-3xl py-2 px-2">
                            <span className='font-bold '><AiOutlineArrowRight className='text-xl text-center ' /></span>
                        </button>
                    </div>
                </div>
                {/* <div className="shadow-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:px-10 px-7   gap-4 justify-center items-center bg-white md:rounded-l-full md:rounded-r-full py-3" style={{ position: 'relative', transform: 'translateY(-50%)' }}>
                    <div className="md:col-span-1 col-span-5 flex justify-center mb-2">
                        <label htmlFor="location" className="mb-1 text-sm">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            className="border border-gray-200 p-1 rounded-sm"
                            placeholder="Where are you traveling?"
                        />
                    </div>
                    <div className="md:col-span-1 col-span-5 flex justify-center mb-2">
                        <label htmlFor="check-in" className="mb-1 text-sm">
                            Check-in
                        </label>
                        <input
                            type="date"
                            id="check-in"
                            className="border border-gray-200 p-1 rounded-sm min-w-[192px]"
                            placeholder=""
                        />
                    </div>
                    <div className="md:col-span-1 col-span-5 flex justify-center mb-2">
                        <label htmlFor="check-out" className="mb-1 text-sm">
                            Check-out
                        </label>
                        <input
                            type="date"
                            id="check-out"
                            className="border border-gray-200 p-1 rounded-sm min-w-[192px]"
                            placeholder=""
                        />
                    </div>
                    <div className="md:col-span-1 col-span-5 flex justify-between mb-2">
                        <label htmlFor="guests" className="mb-1 text-sm">
                            Guests
                        </label>
                        <input
                            type="number"
                            id="guests"
                            className="border border-gray-200 p-1 rounded-sm"
                            placeholder="Number of Guests"
                        />
                    </div>
                    <button className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 text-white rounded-3xl py-2 px-2 col-span-3 md:col-span-1">
                        <span className="font-bold">
                            <AiOutlineArrowRight className="text-xl text-center" />
                        </span>
                    </button>
                </div> */}
            </div>

            <div className="mx-5  font-sans text-xl/7" >
                <p style={{ opacity: 0.6 }}>Popular Destinations</p>
            </div>

            <div className='mx-5 grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-6 gap-3 content-center mt-3'>
                <div className=' relative bg-auto bg-center bg-cover rounded-xl shadow-xl sm:min-h-[300px] min-h-[200px] row-span-5' style={{ backgroundImage: `url(${bd2})` }}>
                    <div className='absolute left-6 bottom-4 bg-white rounded-xl pl-5 pr-5 border border-gray-700'>
                        <p className='text-black/75 font-sans'>Bahirdar</p>
                    </div>
                </div>
                <div className='relative bg-auto bg-center bg-cover rounded-xl sm:min-h-[50px] min-h-[200px] row-span-3' style={{ backgroundImage: `url(${arbaminch})` }}>
                    <div className='absolute left-6 bottom-4 bg-white rounded-xl pl-5 pr-5 border border-gray-700'>
                        <p className='text-black/75 font-sans'>Arbaminch</p>
                    </div>
                </div>
                <div className='relative bg-auto bg-center bg-cover rounded-xl shadow-xl sm:min-h-[300px] min-h-[200px] row-span-5' style={{ backgroundImage: `url(${hawassa1})` }}>
                    <div className='absolute left-6 bottom-4 bg-white rounded-xl pl-5 pr-5 border border-gray-700'>
                        <p className='text-black/75 font-sans'>Hawassa</p>
                    </div>
                </div>
                <div className='relative bg-auto bg-center bg-cover rounded-xl shadow-xl sm:min-h-[50px] min-h-[200px] row-span-2' style={{ backgroundImage: `url(${diredawa})` }}>
                    <div className='absolute left-6 bottom-3 bg-white rounded-xl pl-5 pr-5 border border-gray-700'>
                        <p className='text-black/75 font-sans'>Dire Dawa</p>
                    </div>
                </div>
                <div className='relative bg-auto bg-center bg-cover rounded-xl shadow-xl sm:min-h-[50px] min-h-[200px] row-span-3' style={{ backgroundImage: `url(${mekele1})` }}>
                    <div className='absolute left-6 bottom-4 bg-white rounded-xl pl-5 pr-5 border border-gray-700'>
                        <p className='text-black/75 font-sans'>Mekele</p>
                    </div>
                </div>
                <div className='relative bg-auto bg-center bg-cover rounded-xl shadow-xl sm:min-h-[50px] min-h-[200px] row-span-2' style={{ backgroundImage: `url(${addis1})` }}>
                    <div className='absolute left-6 bottom-4 bg-white rounded-xl pl-5 pr-5 border border-gray-700'>
                        <p className='text-black/75 font-sans'>Addis Abeba</p>
                    </div>
                </div>
            </div>

            <div className="mx-5  font-sans text-xl/7" >
                <p style={{ opacity: 0.6 }}>Top Rated Accommodation</p>
            </div>

            <div className="mx-5 md:flex justify-center">
                <div className="flex flex-col md:flex-row space-x-4">

                    <div className="bg-white rounded-2xl shadow-lg  p-3">
                        <div className="img relative ">
                            <img src={arbaminch} alt="" className="w-full h-auto object-contain rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-1 mt-3">
                            <div>
                                <p className='text-xl font-bold'>Ethiopia</p>
                            </div>
                            <div className="text-md text-slate-500">Addis Abeba</div>
                            <div className="flex justify-center text-blue-500 hover:cursor-pointer">
                                <p className="font-bold font-sans">Starting From</p>
                                <span className='font-bold '><AiOutlineArrowRight className='text-2xl ml-3' /></span>
                            </div>
                        </div>
                    </div>

                    <div className="backdrop-sepia-0 bg-white/30 bg-white rounded-2xl shadow-lg  p-3">
                        <div className="img relative ">
                            <img src={addis1} alt="" className="backdrop-sepia-0 bg-white/30 w-full h-auto object-cover rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-1 mt-3">
                            <div>
                                <p className='text-xl font-bold'>Ethiopia</p>
                            </div>
                            <div className="text-md text-slate-500">Addis Abeba</div>
                            <div className="flex justify-center text-blue-500 hover:cursor-pointer">
                                <p className="font-bold font-sans">Starting From</p>
                                <span className='font-bold '><AiOutlineArrowRight className='text-2xl ml-3' /></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg  p-3">
                        <div className="img relative ">
                            <img src={addis1} alt="" className="w-full h-auto object-cover rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-1 mt-3">
                            <div>
                                <p className='text-xl font-bold'>Ethiopia</p>
                            </div>
                            <div className="text-md text-slate-500 ">Addis Abeba</div>
                            <div className="flex justify-center text-blue-500 hover:cursor-pointer">
                                <p className="font-bold font-sans">Starting From</p>
                                <span className='font-bold '><AiOutlineArrowRight className='text-2xl ml-3' /></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg  p-3">
                        <div className="img relative ">
                            <img src={addis1} alt="" className="w-full h-auto object-cover rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-1 mt-3">
                            <div>
                                <p className='text-xl font-bold'>Ethiopia</p>
                            </div>
                            <div className="text-md text-slate-500 ">Addis Abeba</div>
                            <div className="flex justify-center text-blue-500 hover:cursor-pointer">
                                <p className="font-bold font-sans">Starting From</p>
                                <span className='font-bold '><AiOutlineArrowRight className='text-2xl ml-3' /></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg  p-3">
                        <div className="img relative ">
                            <img src={arbaminch} alt="" className="w-full h-auto object-cover rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-1 mt-3">
                            <div>
                                <p className='text-xl font-bold'>Ethiopia</p>
                            </div>
                            <div className="text-md text-slate-500 ">Addis Abeba</div>
                            <div className="flex justify-center text-blue-500 hover:cursor-pointer">
                                <p className="font-bold font-sans">Starting From</p>
                                <span className='font-bold '><AiOutlineArrowRight className='text-2xl ml-3' /></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <hr className="container mx-auto mt-10 " /> */}
            <Footer />
        </>

    )
}

export default Hero
