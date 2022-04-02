import React from 'react';
import { Link } from 'react-router-dom';
import houseBackground from '../styles/images/house-back.jpg';
import Nav from './Nav.jsx';
import Card from './Card.jsx';
import hardcodeHouse from '../styles/images/hardcode-house.jpg'

function Home() {


  return (
    <div>
    <div className='z-1 absolute bg-black w-full h-screen shadow-stone-600 shadow-xl'>
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
      <div className=' mt-64 py-16 text-center'>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Featured Properties</h2>        
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card image={hardcodeHouse} featured={true}/>
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
            <Link to='/'>
              <Card image={hardcodeHouse} featured={true}/>
            </Link>
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
            <Link to='/'>
              <Card image={hardcodeHouse} featured={true}/>
            </Link>
          </div>
        </div>                
      </div>
      <div className=' py-16 text-center bg-stone-200/75 '>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Resent Properties for Sale</h2>
        <div className='mx-4 px-6 mt-12 grid grid-cols-3 gap-6'>
          <div className='border-2 '>
            <Link to='/'>
              <Card image={hardcodeHouse}/>
            </Link>
          </div>
          <div className='border-2 h-60'></div>
          <div className='border-2 h-60'></div>
        </div>                
      </div>
    </div>
  )
}

export default Home