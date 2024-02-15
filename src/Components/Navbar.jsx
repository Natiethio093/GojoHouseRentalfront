import React, { useState, useEffect, useRef } from 'react';
import RoomSearchModal from './RoomSearchModal ';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaBars, FaClosedCaptioning, FaSearch, FaTimes } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
const Navbar = () => {

  let user = JSON.parse(localStorage.getItem('user-info'))
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(true);
  const [isdropdown, setIsdropdown] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef();

  function Hidedropdown() {
    setIsdropdown(!isdropdown)
  }

  const handleCloseDropdown = () => {
    setIsdropdown(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  async function Logout() {

    const token = JSON.parse(localStorage.getItem('access_token'));
    try {
      const response = await axios.post('http://localhost:8000/api/Logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

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
  return (
    <div className='shadow-md w-full  fixed top-0 left-0'>
      <div className="md:flex md:space-y-0 space-y-4 bg-white py-4 md:px-10 px-7 justify-between item-center">
        <div className='cursor-pointer md:flex flex-cols item-center md:space-x-20 '>
          <Link to='/' className="text-black text-3xl font-bold z-20 ">
            Logo
          </Link>
          <div className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden transition-all duration-700 ease-in-out' onClick={() => setOpen(!open)}>
            <span>{open ? <FaTimes /> : <BiMenu />}</span>
          </div>
    
          <ul className={`md:flex flex-cols md:items-center md:space-x-10 md:space-y-0 space-y-3 md:mt-0 mt-4
          relative md:static bg-white md:z-auto z-10 left-0 w-full md:w-auto transition-all 
          duration-250 ease-in ${open ? 'top-0 opacity-100' : 'top-[-490px] opacity-100'}`}>
            <li>
              <Link to='/Listing' className='text-gray-800 font-sans text-lg hover:text-gray-400  duration-500 tracking-wide'>Listings</Link>
            </li>
            <li>
              <a href='#' className='text-gray-800 font-sans text-lg hover:text-gray-400  duration-500 tracking-wide'>Popular</a>
            </li>
            <li>
              <a href='#' className='text-gray-800 font-sans text-lg hover:text-gray-400  duration-500 tracking-wide'>Blog</a>
            </li>
          </ul>
        </div>

        {
          localStorage.getItem('user-info') ?
            <>
              <div className={`flex md:justify-between space-x-5`}>
                <div ref={popupRef} className={`relative  md:flex  items-start text-left    md:z-auto z-10 left-0  md:w-auto  transition-all 
                 duration-250 ease-in ${open ? 'top-0 opacity-100' : 'top-[-490px]'} md:opacity-100`}>
                  <div>
                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all 
                     duration-500 ease-in" id="menu-button" aria-expanded="true" aria-haspopup="true"
                      onClick={Hidedropdown}>
                      {user && user.user_name}
                      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {
                    isdropdown ?
                      <div className="absolute right-0 md:left-[-180px] left-7 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all 
                      duration-500 ease-out" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
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
                <button
                  href="#"
                  className={`text-black font-sans text-lg hover:text-gray-500 tracking-wide transition-all duration-500 ease-in`}
                  onClick={handleSearchClick}
                >
                  <span className={`transition-all duration-500 ease-in ${open ? '' : 'opacity-0'}`}>
                    {open ? <FaSearch /> : <> </>}
                  </span>
                </button>

                {isModalOpen && <RoomSearchModal onClose={handleCloseModal} />}
              </div>
            </>
            :
            <>
              <div className={`md:flex items-center space-x-5  relative md:z-auto z-10 left-0  md:w-auto  transition-all 
                 duration-250 ease-in  ${open ? 'top-0 opacity-100' : 'top-[-490px] opacity-100'}`}>
                <Link to='/Register' className={`text-gray-400 border border-gray-400 rounded-2xl py-1 px-5 hover:text-gray-500 hover:border-gray-500  md:z-auto z-10 left-0  md:w-auto  transition-all 
                 duration-250 ease-in `}>
                  Sign Up
                </Link>
                <Link to='/Login' className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5">
                  Log In
                </Link>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Navbar

