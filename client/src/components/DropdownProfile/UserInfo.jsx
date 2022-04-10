import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {loadUser} from '../../redux/actions/index'
import  { useAuth0, User } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';



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
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none"
  const leftClass = "w-full sm:w-1/3 font-medium text-center sm:text-left"
  const rightClass = "flex-1 text-center sm:text-left"
  return (
    <div className="w-1/2 bg-white flex flex-col rounded-md p-4 ">
      <h3 className="text-2xl font-medium">User Details</h3>
      <div className="mt-4">
        <div className={rowClass}>
          <span className={leftClass}>Full name</span>
          <span className={rightClass}>asd</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Email Address</span>
          <span className={rightClass}>{user.user.email}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>User Role</span>
          <span className={rightClass}>{user.user.role.rolName}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Username</span>
          <span className={rightClass}>{user.user.name}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Location</span>
          <span className={rightClass}>AGREGARLO A DB ???</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>BirthDate</span>
          <span className={rightClass}>{user.user.buyers[0].dateBirth === null ? '-': user.user.buyers[0].dateBirth}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>Phone Number</span>
          <span className={rightClass}>{user.user.buyers[0].phoneNumber === null ? '-': user.user.buyers[0].phoneNumber}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>{user.user.role.rolName === 'buyer'? 'Favorite propierties' : 'Propierties publish'  }</span>
          <span className={rightClass}>
            AGREGAR A DB
          </span>
        </div>
        <div className="flex space-x-2 justify-center">
  <Link to='/logged/profileUpdate' type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</Link>
</div>
      </div>
    </div>
  )
}

export default UserInfo


// {user.user.role.rolName === 'buyer'? `${user.user.buyers[0].firstName} ${user.user.buyers[0].lastName}` : `${user.user.sellers[0].firstName} ${user.user.sellers[0].lastName}`}