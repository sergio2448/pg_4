import { Link } from 'react-router-dom';
import Card from "../Card"
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCards, getFeatureList } from '../../redux/actions';
import houseBackground from '../../styles/images/house-back.jpg';

function List() {

    const dispatch = useDispatch();
    const listCards = useSelector((state) => state.homeCards);
    const searchFeatures = useSelector((state) => state.searchBar)
    const errorSearchBar = useSelector((state) => state.errorSearchBar);

    useEffect(() => {
        dispatch(getListCards());
        dispatch(getFeatureList());
    }, []);


    return (
        <div className='bg-sky-900 pb-20'>
            <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-xl'>
                <img className='opacity-60 z-2 object-cover w-full h-full blur-sm' src={houseBackground} />
            </div>
            <div className='relative z-6'>
                <div className=' relative z-20 '>
                    <Nav />
                </div>
            </div>
            <div className=" pt-32 relative z-150">
                <div className='relative z-6 text-center'>
                    <SearchBar />
                </div>
                {errorSearchBar.length ? (<div className='flex justify-center '><div className=' mt-28 bg-stone-900/75 rounded px-4 py-2 flex justify-center text-rose-700 text-2xl font-semi-bold font-Poppins'>Error: Not properties found, Try again! </div></div>) : <div className='flex justify-center '><div className={searchFeatures.length ? 'text-center  mt-28 bg-stone-900/75 rounded px-4 py-2 flex justify-center  text-emerald-500 text-2xl font-semi-bold font-Poppins' : 'bg-transparent mt-28 rounded px-4 py-2'}> {searchFeatures.length ? searchFeatures.length + ' Properties found!' : ''} </div></div>}
                <div className=' mt-45 pt-24 py-15 text-center'>
                    <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
                        {
                            searchFeatures.length ? searchFeatures.slice(0, 6).map(c => {
                                return (
                                  <div
                                    key={c.id}
                                    className="text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl "
                                  >
                                    <Link to={"/estate/" + c.id}>
                                      <Card
                                        image={
                                          "http://localhost:3001/Properties/images/" +
                                          c.photos[0].photos
                                        }
                                        featured={false}
                                        isMap={false}
                                        lease={c.lease}
                                        name={c.address}
                                        city={c.city}
                                        country={c.country}
                                        cost={c.cost}
                                        measure={c.m2}
                                      />
                                    </Link>
                                  </div>
                                );
                            }) : listCards.reverse().slice(0, 6).map(c => {
                                return (
                                  <div
                                    key={c.id}
                                    className="text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl "
                                  >
                                    <Link to={"/estate/" + c.id}>
                                      <Card
                                        image={
                                          "http://localhost:3001/Properties/images/" +
                                          c.photos[0].photos
                                        }
                                        featured={false}
                                        isMap={false}
                                        lease={c.lease}
                                        name={c.address}
                                        city={c.city}
                                        country={c.country}
                                        cost={c.cost}
                                        measure={c.m2}
                                      />
                                    </Link>
                                  </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List