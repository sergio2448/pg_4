import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {loadUser} from '../../redux/actions/index'
import  { useAuth0, User } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
import houseBackground from '../../styles/images/house-back.jpg'
import Footer from '../Footer';


function UserInfo() {
  
  const {user:userAuth} =useAuth0();
  console.log(userAuth)
  const user = useSelector((state)=>state.user)
  console.log(user)

  //   const dispatch = useDispatch();
  

  //  useEffect(() => {
  //     dispatch(loadUser(userAuth.email))

  //  }, [])



  const rowClass =
    "flex flex-row sm:flex-row justify-between  sm:items-start py-3 border-t border-gray-300 "
  const leftClass = "w-auto sm:w-1/3 font-black	text-lg   text-center sm:text-left p-4"
  const rightClass = "flex-1 text-center sm:text-left p-4"
  return (
<div>
    <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
      <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
    </div>
    <Nav />
    <div className="border-solid   border-4 bg-sky-500/80 my-4 w-1/2 h-1/3  font-Monserrat font-black	  rounded-md p-4 relative ml-96 ">
      <div className='flex flex-row items-center justify-between'>
      <h3 className="text-2xl font-bold	 ">User Details</h3>
  <Link to='/logged/updatedata' type="button" className="inline-block  px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out p-4 my-4">Update Info</Link>
</div>

    <div className='flex flex-row'>
      <div className="mt-4">
        <div className={rowClass}>
          <span className={leftClass}>Full name</span>
          <span className={rightClass}>{user.user?.role?.rolName === 'buyer'? `${user.user?.buyers[0].firstName} ${user.user?.buyers[0].lastName}`  : `${user.user?.sellers[0].firstName}  ${user.user?.sellers[0].lastName}`}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Email Address</span>
          <span className={rightClass}>{user.user?.email}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Username</span>
          <span className={rightClass}>{user.user?.name}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Location</span>
          <span className={rightClass}>Argentina, Buenos Aires (Hardcodeado, agregar a db)</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>BirthDate</span>
          <span className={rightClass}>
            {user.user?.role?.rolName === 'buyer'? 
            user.user?.buyers[0].datebirth? user.user?.buyers[0].datebirth : '-' 
            : user.user?.sellers[0].datebirth? user.user?.sellers[0].datebirth : '-'}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Phone Number</span>
          <span className={rightClass}>{user.user?.role?.rolName === 'buyer'? user.user?.buyers[0].phoneNumber? user.user?.buyers[0].phoneNumber : '-' : user.user?.sellers[0].phoneNumber? user.user?.sellers[0].phoneNumber : '-'}</span>
        </div>
        </div>
        <div className='mt-4'>
        <div className={rowClass}>
          <span className={leftClass}>User Role</span>
          <span className={rightClass}>{user.user?.role?.rolName}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>{user.user?.role?.rolName === 'buyer'? 'Favourites post' : 'Propierties posted'}</span>
          <span className={rightClass}>
          (Hardcodeado, agregar a db)
          </span>
        </div>
        </div>
        {/* <div className="flex space-x-2 justify-center">
  <Link to='/logged/updatedata' type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out p-4 my-4">Update Info</Link>
</div> */}
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default UserInfo


// {user.user.role.rolName === 'buyer'? `${user.user.buyers[0].firstName} ${user.user.buyers[0].lastName}` : `${user.user.sellers[0].firstName} ${user.user.sellers[0].lastName}`}