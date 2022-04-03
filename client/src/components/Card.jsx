import React from 'react';

export default function Cards ({image, featured = false, isMap = false, name, city, country, cost, measure, rooms }) {
    name = 'Hardcode Street';
    city = 'Hardcode City';
    country = 'Hardcode Country'
    cost = '$4000 usd'
    measure = '300 sq m'
    rooms = 5
    return isMap ? (
        <div className='border border-stone-600/40 pb-6  transition ease-in-out duration-200 hover:text-sky-500'>
            <div className='relative bg-black w-full h-64'>
                <iframe className='w-full h-full ' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=es&amp;q=Tucuman,%20Argentina+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=6&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/car-satnav-gps/">Car Navigation Systems</a></iframe>
            </div>              
            <div></div>
            <h2 className='px-6 mt-6 mb-6 text-xl font-bold font-Monserrat' >{city + ', ' + country}</h2>
            <div className='px-6 grid grid-cols-1 gap-x-10'>
                <span className='text-left text-stone-600/60'>Listings: {rooms} </span>
                <span className='text-left text-stone-600/60'>Price: {cost + ' ~ ' + cost}</span>
            </div>
        </div>
    ) : (        
        <div className='border border-stone-600/40 pb-6  transition ease-in-out duration-200 hover:text-sky-500'>
            <div className='relative bg-black w-full h-64'>
                <img className='w-full h-full object-cover transition ease-in-out duration-200 hover:opacity-60' src={image}/>
            </div> 
                <div className='relative bottom-60 float-left'>
                    {
                        featured ? (<span className='text-white  text-sm font-bold ml-4 font-Poppins  opacity-100 z-120 bg-emerald-500 px-2 py-1 rounded'>Featured</span>) : 
                         <span></span>
                    }            
                    <span className='text-white text-sm font-bold ml-4 font-Poppins opacity-100 z-120 bg-rose-500 px-2 py-1 rounded'>For Sale</span>           
                </div>
            <h2 className='px-6 mt-6 mb-6 text-xl font-bold font-Monserrat' >{name + ', ' + city + ', ' + country}</h2>
            <div className='px-6 grid grid-cols-2 gap-x-10'>
                <span className='text-left text-stone-600/60'>{rooms} Rooms </span>
                <span className='text-right text-stone-600/60'>Measure: {measure}</span>
                <span className='text-left text-stone-600/60'>other details</span>
            </div>
            <div className='text-stone-600 border-stone-600/40 w-4/5 m-auto mt-4 pt-4 border-t-2 text-left'>
                <h2>Cost: {cost}</h2>
            </div>
        </div>
    )
}
