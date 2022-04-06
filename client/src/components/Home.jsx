import React from 'react';
import { Link } from 'react-router-dom';
import houseBackground from '../styles/images/house-back.jpg';
import Nav from './Nav.jsx';
import Card from './Card.jsx';
import hardcodeHouse from '../styles/images/hardcode-house.jpg'
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeCards, getApiKey } from '../redux/actions';

function Home() {

  const dispatch = useDispatch();  
  const homeCards = useSelector((state) => state.homeCards);

  useEffect(() => {
    dispatch(getHomeCards());
    dispatch(getApiKey())
  }, []);
  
  const apiKey = useSelector((state) => state.apikey);
  
  

  return (
    <div>
    <div className='z-1 absolute bg-black w-full h-screen shadow-stone-600 shadow-xl'>
      <img className='opacity-60 z-2 object-cover w-full h-full' src={houseBackground} />
    </div>
    <Nav/>
      <div className='relative z-6 pt-28 text-center'>
        <h2 className='text-white text-2xl font-semi-bold font-Poppins'>Best place to</h2>
        <h2 className='text-white text-5xl font-bold font-Poppins'>Find your perfect home</h2>
        <SearchBar/>
      </div>
      <div className=' mt-64 py-16 text-center'>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Explore the Neighbourhoods</h2>        
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
            <Link to='/'>
              <Card image={hardcodeHouse} featured={true} isMap={true} city='Tucuman' country='Argentina' cost='4000' apiKey={apiKey.APIKEY}/>
            </Link>
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
            <Link to='/'>
              <Card image={hardcodeHouse} featured={true} isMap={true} city='Tucuman' country='Argentina' cost='4000'/>
            </Link>
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
            <Link to='/'>
              <Card image={hardcodeHouse} featured={true} isMap={true} city='Tucuman' country='Argentina' cost='4000'/>
            </Link>
          </div>
        </div>                 
      </div>
      <div className=' py-16 text-center bg-stone-200/75 '>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Featured Properties</h2>        
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          {
            homeCards.length ? homeCards.slice(0,3).map(c => {
              return(             
        <div key={c.id} className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          <Link to={'/estate/' + c.id}>
            <Card image={'http://localhost:3001/Properties/images/' + c.photos[0].photos} featured={true} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2}/>
          </Link>
        </div>) 
            }) : (<div>Loading...</div>)
          }
        </div>  
        <button className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>See More!</button> 
      </div>
      <div className=' py-16 text-center '>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Resent Properties for Sale/Rent</h2>
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          {
            homeCards.length ? homeCards.reverse().slice(0,3).map(c => {
              return(             
        <div key={c.id} className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          <Link to={'/estate/' + c.id}>
            <Card image={'http://localhost:3001/Properties/images/' + c.photos[0].photos} featured={false} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2}/>
          </Link>
        </div>) 
            }) : (<div>loading..</div>)
          }
        </div>   
        <button className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>See More!</button>                  
      </div>
    </div>
  )
}

export default Home