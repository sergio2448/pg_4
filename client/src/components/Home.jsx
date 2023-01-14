import React from 'react';
import { Link } from 'react-router-dom';
import houseBackground from '../styles/images/house-back.jpg';
import Nav from './Nav.jsx';
import Card from './Card.jsx';
import SearchBar from './SearchBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeCards, getFeatureList, getMapList, getSearchbar } from '../redux/actions';
import Footer from './Footer';

function Home() {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const homeCards = useSelector((state) => state.homeCards);
  const mapasList = useSelector((state) => state.maplist);
  let count = 0
  let count2 = 0

  const places = ['Gregoire', 'Villa', 'Cholula']
  useEffect(() => {
    dispatch(getHomeCards());
    dispatch(getFeatureList());
    
    if (!mapasList.length) {
      places.map(p => dispatch(getMapList(p)));
    }
  }, []);

  const handleButton = () => {    
    console.log(state.homeCards);
  }




  return (
    <div>
      <div className='z-1 absolute bg-black w-full h-3/4 shadow-black shadow-2xl'>
        <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
      </div>
      <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black'></div>
      <Nav />
      <div className='relative z-6  relative pt-28 text-center'>
        <h2 className='text-white text-2xl font-semi-bold font-Poppins'>Best place to</h2>
        <h2 className='text-white text-5xl pb-32 font-bold font-Poppins'>Find your perfect home</h2>
        <SearchBar />
      </div>
      <div className=' mt-64 py-16 text-center '>
        <h2 className='text-stone-600 text-5xl relative font-base font-Poppins'>Explore the Neighbourhoods</h2>
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          {
            mapasList.length ? mapasList.map(c => {
              return (
                <div key={c[0].id} className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
                  <Link onClick={() => dispatch(getSearchbar(`state=${c[0].state}`))} to={'/estate'}>
                    <Card featured={true} isMap={true} lease={c[0].lease} name={c[0].address} city={c[0].state} country={c[0].country} cost={c[0].cost} measure={c[0].m2} latitude={c[0].longitude} longitude={c[0].latitude} maplist={c} />
                  </Link>
                </div>)
            }) : (<div>Loading...</div>)
          }
        </div>
      </div>
      <div className=' py-16 text-center bg-stone-200/75 '>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Featured Properties</h2>
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          {
            homeCards.length ? homeCards.map(c => {
              if (c.statuspromotion == "true" && count !== 3 && c.idstatus.statusName === "Publicado") {
                count++
                return (
                  <div key={c.id} className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
                    <Link to={'/estate/' + c.id}>
                      <Card image={'https://new-pg.herokuapp.com/Properties/images/' + c.photos[0].photos} featured={true} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2} />
                    </Link>
                  </div>)
              }
            })
              : <div>Loading...</div>
          }
        </div>
        <Link to='/estate'>
          <button className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>See More!</button>
        </Link>
      </div>
      <div className=' py-16 text-center '>
        <h2 className='text-stone-600 text-5xl font-base font-Poppins'>Resent Properties for Sale/Rent</h2>
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
          {
            homeCards.length ? homeCards.map(c => {
              if (c.photos && count2 !== 3 && c.idstatus.statusName === "Publicado") {
                count2++
                return (
                  <div key={c.id} className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
                    <Link to={'/estate/' + c.id}>
                      <Card image={'https://new-pg.herokuapp.com/Properties/images/' + c.photos[0].photos} featured={false} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2} />
                    </Link>
                  </div>)
              }
            }) : <div>loading..</div>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home