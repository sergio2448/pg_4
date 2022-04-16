import React from 'react'
import Nav from '../Nav'
import HouseBackGround from '../../styles/images/house-back.jpg'
import FormInfo from './FormInfo'
import StripedTable from './StripedTable'
import UserInfo from './UserInfo'
import { useSelector } from 'react-redux'
import { User } from '@auth0/auth0-react'
import { useNavigate } from "react-router-dom";

function Settings() {
  const dropdown = useSelector((state)=>state.dropdown)
  const navigate = useNavigate()
  
  function dropSelector(dropdown){
    if (dropdown === "my profile"){
      return(<UserInfo/>)
    }
    if (dropdown === "Favourites"){
      return(<StripedTable/>)
    }
   
    
  }
  

  return (
    <div>   
    <div className='z-1 absolute bg-black w-full h-screen shadow-stone-600 shadow-xl'>
      <img className='opacity-60 z-2 object-cover w-full h-full' src={HouseBackGround} />
    </div>
    <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black 	 '></div>
    <Nav />
    <div className='relative z-5 pt-28 text-center flex  content-center '>
          { }
         

      </div>
    
      </div>

  )
}

export default Settings