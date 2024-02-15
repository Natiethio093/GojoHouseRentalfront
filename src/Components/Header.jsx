import React, { useState, useEffect, useRef } from 'react';
import RoomSearchModal from './RoomSearchModal ';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaAngleDown, FaAngleUp, FaArrowUp, FaBars, FaCaretDown, FaSearch, FaTimes } from 'react-icons/fa';
const Header = ({ pagename }) => {

  let user = JSON.parse(localStorage.getItem('user-info'))
  const [showMenu, setShowMenu] = useState(false);
  const [isdropdown, setIsdropdown] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function Hidedropdown() {
    setIsdropdown(!isdropdown)
  }

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsdropdown(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleCloseDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCloseDropdown]);

  async function Logout() {

    const token = JSON.parse(localStorage.getItem('access_token'));
    try {
      const response = await axios.post('http://localhost:8000/api/Logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      
    }
      );

      if (response.data.status === 200) {
        localStorage.clear();
        navigate('/Login')
      }

      else {
        console.error('else error cant logout');
      }
    }
    catch (error) {
      console.error(error);
      console.error('else error cant logout');
    }
  }

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setIsdropdown(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="transition  easy-out duration-500  fixed top-0 left-0 right-0 bg-white shadow-xl fixed-top z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-20">
            <Link to='/' className="text-black text-3xl font-bold">
              Logo
            </Link>
            <div className={`hidden lg:flex space-x-10 ${showMenu ? 'flex' : 'hidden'}`}>

              {
                localStorage.getItem('user-info') ?
                  <>
                    {/* <Link to='/Listing' className="text-black font-sans text-lg hover:text-gray-500 tracking-wide">
                      Listings
                    </Link> */}

                    <a href="#" className="font-sans font-normal text-gray-800 text-lg hover:bg-gray-100 px-4 flex items-center py-1 hover:text-md rounded-full transorm duration-200 ease-in-out">
                      Luxurious
                    </a>
                  </>
                  :
                  <>

                  </>
              }
              <a href="#" className="font-sans font-normal text-gray-800 text-lg px-4 hover:bg-gray-100 flex items-center py-1 rounded-full transorm duration-200 ease-in-out">
                Popular
              </a>
              <a href="#" className="font-sans font-normal text-gray-800 text-lg px-4  hover:bg-gray-100 flex items-center py-1 rounded-full transorm duration-200 ease-in-out">
                Blog
              </a>

            </div>
          </div>
          {
            localStorage.getItem('user-info') ?
              <>
                <div className="flex md:justify-between space-x-5">
                  <div ref={popupRef} className="relative hidden lg:flex  items-start text-left">
                    <button className='font-sans text-lg font-normal items-center text-gray-800 hover:bg-gray-100 px-4  rounded-full transorm duration-200 ease-in-out py-1 mr-3'>Switch to hosting</button>
                    <div>
                      <button type="button" className="inline-flex w-full justify-center gap-x-2.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
                        onClick={Hidedropdown}>
                        {user && user.user_name}
                        {isdropdown ?
                          <FaAngleUp className='text-gray-400  mt-1' />
                          :
                          <FaAngleDown className='text-gray-400 mt-1' />

                        }
                      </button>
                    </div>
                    {
                      isdropdown ?
                        <div className="absolute right-0 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                          <div className="py-1" role="none">
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-1">Profile</a>
                            <a className="text-gray-700 block px-4 cursor-pointer py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-2" onClick={Logout}>Logout</a>
                          </div>
                        </div>
                        :
                        <>

                        </>
                    }
                  </div>
                  {
                    pagename == 'Search Result' ?
                      <>

                      </>
                      :
                      <button href="#" className="text-black font-sans text-lg  hover:text-gray-500 tracking-wide"
                        onClick={handleSearchClick}>
                        <FaSearch />
                      </button>
                  }


                  {isModalOpen && <RoomSearchModal onClose={handleCloseModal} />}
                </div>
              </>
              :
              <>
                <div className="hidden lg:flex items-center space-x-5">
                  <Link to='/Register' className="text-gray-400 border border-gray-400 rounded-2xl py-1 px-5 hover:text-gray-500 hover:border-gray-500">
                    Sign Up
                  </Link>
                  <Link to='/Login' className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5">
                    Log In
                  </Link>
                </div>
              </>
          }
          {/* Hamburger menu */}
          <div className="lg:hidden">
            <button
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleMenuClick}>
              {
                showMenu ?
                  <FaTimes className='text-2xl font-semibold' />
                  :
                  <FaBars className='text-2xl font-semibold' />
              }
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {showMenu && (
          <div className="lg:hidden transition-all duration-300 ease-in-out delay-3">

            {
              localStorage.getItem('user-info') ?
                // <a href="#" className="block text-black font-sans text-lg hover:text-gray-500 py-1">
                //   Luxurious
                // </a>
                <button href="#" className="font-sans font-normal text-gray-800 text-lg px-4 hover:bg-gray-100 flex items-center py-1 rounded-full transorm duration-200 ease-in-out">
                    Luxurious
                </button>
                :
                <>

                </>
            }

            <button href="#" className="font-sans font-normal text-gray-800 text-lg px-4 hover:bg-gray-100 flex items-center py-1 rounded-full transorm duration-200 ease-in-out">
              Popular
            </button>
            <button href="#" className="font-sans font-normal text-gray-800 text-lg px-4  hover:bg-gray-100 flex items-center py-1 rounded-full transorm duration-200 ease-in-out">
              Blog
            </button>
            {
              localStorage.getItem('user-info') ?
                <button className='font-sans text-lg font-normal text-black px-4 hover:bg-gray-100 py-1 rounded-full transorm duration-200 ease-in-out'>Switch to hosting</button>
                :
                <>

                </>
            }

            {
              localStorage.getItem('user-info') ?
                <>
                  <div className="flex md:justify-between space-x-5">
                    <div ref={popupRef} className="relative  md:flex  items-start text-left mb-5 mt-3">
                      <div>
                        <button type="button" className="inline-flex w-full justify-center gap-x-2.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ml-4 ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
                          onClick={Hidedropdown}>
                          {user && user.user_name}
                          {isdropdown ?
                            <FaAngleUp className='text-gray-400  mt-1' />
                            :
                            <FaAngleDown className='text-gray-400 mt-1' />

                          }
                        </button>
                      </div>
                      {
                        isdropdown ?
                          <div className="absolute left-10 right-0 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div className="py-1" role="none">
                              <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                              <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-1">Profile</a>
                              <a className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-2" onClick={Logout}>Logout</a>
                            </div>
                          </div>
                          :
                          <>

                          </>
                      }
                    </div>

                  </div>
                </>
                :
                <>
                  <div className="space-x-5 mb-10 mt-3" >
                    <Link to='/Register' className="text-gray-400 border border-gray-400 rounded-2xl py-1 px-5 hover:text-gray-500 hover:border-gray-500">
                      Sign Up
                    </Link>
                    <Link to='/Login' className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5">
                      Log In
                    </Link>
                  </div>
                </>
            }


            {/* {
              localStorage.getItem('user-info') ?

                <div className="relative  items-center text-left mb-5">
                  <div>
                    <button type="button" className="inline-flex justify-end gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
                      onClick={Hidedropdown}>
                      {user && user.user_name}
                      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {
                     isdropdown ?
                     <div className="absolute right-0 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                       <div className="py-1" role="none">
                         <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                         <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-1">Profile</a>
                         <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-300 hover:text-white" role="menuitem" tabindex="-1" id="menu-item-2" onClick={Logout}>Logout</a>
                       </div>
                     </div>
                      :
                      <>

                      </>
                  }

                </div>
                :
                <div className="space-x-5 mb-10">
                  <Link to='/Register' className="text-gray-400 border border-gray-400 rounded-2xl py-1 px-5 hover:text-gray-500 hover:border-gray-500">
                    Sign Up
                  </Link>
                  <Link to='/Login' className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5">
                    Log In
                  </Link>
                </div>
            } */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;