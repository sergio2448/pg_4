import React from 'react';
import { useState } from 'react';

export default function SearchBar (){
    const [filterSelect, setFilterSelect] = useState(0);


    return (
        <div>
            {
                filterSelect == 0 ? (<div className='flex justify-center mt-34'>
                <div className=' bg-stone-800 text-base text-sky-500 font-Monserrat font-bold px-4 py-1 ' >Buy</div>
                <div onClick={() => setFilterSelect(1)} className='bg-stone-900 text-base text-white font-Monserrat font-bold px-4 py-1 '>Rent</div>
            </div>) : (<div className='flex justify-center mt-32'>
                <div onClick={()=> setFilterSelect(0)} className=' bg-stone-900 text-base text-white font-Monserrat font-bold px-4 py-1  ' >Buy</div>
                <div className=' bg-stone-800 text-base text-sky-500 font-Monserrat font-bold px-4 py-1 '>Rent</div>
            </div>)            
            }
            <div className='flex items-center m-auto justify-center z-10 w-5/12 h-16 bg-stone-800'>
              <input type='text' placeholder='Address, Country, Zip Code, Cost..' className='pl-2 rounded w-3/5 transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'/>
              <button className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>Search!</button>
            </div>
        </div>
    )
}