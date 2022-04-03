import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Nav(){
    return (
        <nav className='pt-5 font-Monserrat text-white relative grid grid-cols-3 gap-4 z-100 w-full'>
          <span className='ml-10 text-xl font-semibold'>INMOBILIARIA</span>
          <div className='m-auto space-x-6'>
            <NavLink className={({isActive}) =>
    (isActive ? "bg-sky-500 px-3 py-2 rounded" : "text-center text-lg transition ease-in-out duration-200 hover:bg-sky-500 px-3 py-2 rounded")
  } to='/state/create'>About us</NavLink>
            <NavLink className={({isActive}) =>
    (isActive ? "bg-sky-500 px-3 py-2 rounded" : "text-center text-lg transition ease-in-out duration-200 hover:bg-sky-500 px-3 py-2 rounded")
  } end to='/state'>Properties</NavLink>
            <NavLink className={({isActive}) =>
    (isActive ? "bg-sky-500 px-3 py-2 rounded" : "text-center text-lg transition ease-in-out duration-200 hover:bg-sky-500 px-3 py-2 rounded")
  } to='/contacto'>Contact</NavLink>
          </div>
          <div className='text-right'>
            <a onClick={()=> {alert('Coming Soon')}} className='mr-5 transition ease-in-out duration-300 hover:border-b-sky-500 border-b-transparent hover:border-b-2 py-1 ' to='/'>Register</a>
            <a onClick={()=> {alert('Coming Soon')}} className='mr-10 transition ease-in-out duration-300 hover:border-b-sky-500 border-b-transparent hover:border-b-2 py-1 ' to='/'>Log in</a>
          </div>
        </nav>
    )
}

export default Nav