import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid-cols-[3fr_1fr_1fr]  gap-14 my-10 mt-40 text-sm'>  {/* md:flex-row */ }

                {/* left */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'> change it later in footer section /components/Footer.jsx jnadsjb sadjkndsbjadsjkbbc adskjnds adskjnaskjbdskjbdfs dskjbdskjbdfkjb dsdsuiewiurbdfs </p>
                </div>


                {/* center */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>


                {/* right */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul  className='flex flex-col gap-2 text-gray-600'>
                        <li>+91 9850788895</li>
                        <li>info@docapp.com</li>
                    </ul>
                </div>


            </div>
            {/* Copyright section  */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>© 2023 DocApp. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
