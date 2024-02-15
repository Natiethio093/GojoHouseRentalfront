import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Nav = () => {
  let Links = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between md:space-x-10 bg-white py-4 md:px-10 px-7'>
        <div className='text-2xl cursor-pointer flex items-center font-sans
      text-gray-800'>
          <span className='text-3xl text-indigo-600 mr-1 pt-2'>
            {/* <ion-icon name="logo-ionic"></ion-icon> */}
          </span>
          <p className='flex md:mr-10 font-bold text-3xl'>Designer</p>
          <ul className={`shadow-md md:flex md:space-x-10 md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-250 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
            {/* {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        } */}
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

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          {/* <ion-icon name={open ? 'close':'menu'}></ion-icon> */}
          <span>{open ? <FaTimes /> : <BiMenu />}</span>
        </div>
        {/* <button className={`bg-blue-400 rounded-xl text-white absolute md:static md:z-auto z-[-1]  transition-all duration-500 ease-in ${open ? 'top-[390px]':'top-[-490px]'}`}>
           Login
        </button> */}
        <div className={`md:flex items-center space-x-5   absolute md:z-auto md:static md:z-auto z-[-1] left-0  md:w-auto  transition-all 
                 duration-250 ease-in ${open ? 'top-[200px] left-9 bottom-10':'top-[-490px]'}`} style={{}}>
          <Link to='/Register' className={`text-gray-400 border border-gray-400 rounded-2xl py-1 px-5 hover:text-gray-500 hover:border-gray-500  md:z-auto z-10 left-0  md:w-auto  transition-all 
                 duration-250 ease-in `}>
            Sign Up
          </Link>
          <Link to='/Login' className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 p-1 text-white rounded-2xl py-1 px-5">
            Log In
          </Link>
        </div>
       
      </div>
      {/* <hr className=" bg-gray-300 h-1 mx-auto mt-10 " /> */}
    </div>
    
  )
}

export default Nav
