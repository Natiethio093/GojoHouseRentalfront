import React from 'react'

const Footer = () => {
    return (
        <>
            <hr className="bg-gray-300 h-1 mx-auto mt-10 " />
            <div className=" mx-auto flex flex-col md:flex-row justify-between pt-10 ">
               
                <div className='pl-5'>
                    
                    <p className='font-sans text-xl font-semibold'>Gojo</p>
                    <p className="font-sans text-sm text-slate-400 font-semibold pt-4">Your Favorite Home Booking since 2015</p>
                    <p className="font-sans text-sm text-slate-400 font-semibold md:pt-20 pt-5 pb-5">Gojo @2023</p>
                </div>
                <div className='flex flex-col pr-5 pl-5'>
                    <p href="#" className='font-sans text-md font-semibold'>Help & support</p>
                    <a href="#" className="font-sans text-sm text-slate-400 font-semibold hover:text-slate-500 hover:underline pt-3">Frequent</a>
                    <a href="#" className="font-sans text-sm text-slate-400 font-semibold hover:text-slate-500 hover:underline">Contact</a>
                    <a href="#" className="font-sans text-sm text-slate-400 font-semibold hover:text-slate-500 hover:underline">How to Book</a>
                    <a href="#" className="font-sans text-sm text-slate-400 font-semibold hover:text-slate-500 hover:underline">Get in touch</a>
                </div>
            </div>
        </>
    )
}

export default Footer


