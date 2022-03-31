import React from 'react';
import { Link } from 'react-router-dom';
import houseBackground from '../styles/images/house-back.jpg';
import Nav from './Nav.jsx'


function Home() {



  return (
    <div>
    <div className='z-1 absolute bg-black w-screen h-screen'>
      <img className='opacity-60 z-2 object-cover w-full h-full' src={houseBackground} />
    </div>
    <Nav/>
      <div className='relative z-6 pt-28 text-center'>
        <h2 className='text-white text-2xl font-semi-bold font-Poppins'>Best place to</h2>
        <h2 className='text-white text-5xl font-bold font-Poppins'>Find your perfect home</h2>
        <div className='flex items-center m-auto justify-center z-10 mt-32 w-5/12 h-16 bg-stone-800'>
          <input type='text' placeholder='Write here..' className='pl-2 rounded w-3/5 transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'/>
          <button className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>Search!</button>
        </div>
      </div>
      <div className='h-96 mt-56 pt-16 text-center'>
        <h2 className='text-stone-600 text-5xl font-bold font-Poppins'>Explore the Neighbourhood</h2>
        <div className='mx-4 mt-12 grid grid-cols-4 gap-4'>
          <div className='border-2 h-60'></div>
          <div className='border-2 h-60'></div>
          <div className='border-2 h-60'></div>
          <div className='border-2 h-60'></div>
        </div>                
      </div>
      <div className='h-96 mt-56 pt-16 text-center bg-stone-300'>
        <h2 className='text-stone-600 text-5xl font-bold font-Poppins'>Featured Properties</h2>
      </div>
    </div>
  )
}

export default Home