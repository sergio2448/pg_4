import React from 'react'
import Nav from '../Nav'
import HouseBackGround from '../../styles/images/house-back.jpg'
import FormInfo from './FormInfo'
import StripedTable from './StripedTable'

function Settings() {
  return (
    <div>   
    <div className='z-1 absolute bg-black w-full h-screen shadow-stone-600 shadow-xl'>
      <img className='opacity-60 z-2 object-cover w-full h-full' src={HouseBackGround   } />
    </div>
    <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black'></div>
    <Nav />
    <div className='relative z-5 pt-28 text-center'>
        {/* <StripedTable/> */}
        <FormInfo/>
      </div>
    
      </div>

  )
}

export default Settings