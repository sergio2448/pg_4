import { Link } from 'react-router-dom';
import Card from "../Card"
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCards, getFeatureList } from '../../redux/actions';
import houseBackground from '../../styles/images/house-back.jpg';
import Paginado from './Paginado';
import Footer from '../Footer';

function List() {

    const dispatch = useDispatch();
    const listCards = useSelector((state) => state.homeCards);
    const searchFeatures = useSelector((state) => state.searchBar)
    const errorSearchBar = useSelector((state) => state.errorSearchBar);

    useEffect(() => {
        dispatch(getListCards());
        dispatch(getFeatureList());
    }, []);

    // Paginado
    let listing;
    searchFeatures.length ? listing = searchFeatures.filter(elem => elem.idstatus.statusName === "Publicado") : listing = listCards.filter(elem => elem.idstatus.statusName === "Publicado");
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 6;
    const lastProperty = propertiesPerPage * currentPage; 
    const firstProperty = lastProperty - propertiesPerPage;
    let currentProperties = listing.slice(firstProperty, lastProperty);
    const paginado = (paginas) => {
      setCurrentPage(paginas)
    }


    return (
        <div className='bg-sky-900 pb-20'>
            <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
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
                {errorSearchBar.length ? (<div className='flex justify-center '><div className=' mt-28 bg-stone-800 rounded px-4 py-2 flex justify-center text-rose-700 text-2xl font-semi-bold font-Poppins'>Error: Not properties found, Try again! </div></div>) : <div className='flex justify-center '><div className={listing.length ? 'text-center  mt-28 bg-stone-800 rounded px-4 py-2 flex justify-center  text-emerald-500 text-2xl font-semi-bold font-Poppins' : 'bg-transparent mt-36 rounded px-4 py-2'}> {listing.length ? listing.length + ' Properties found!' : ''} </div></div>}
                <div className=' mt-45 pt-24 py-15 text-center'>
                <Paginado propertiesPerPage={propertiesPerPage} listing={listing.length} paginado={paginado}/>
                    <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
                      
                        {
                            currentProperties?.map(c => {
                              if(c.idstatus.statusName) {
                                return (
                                  <div
                                    key={c.id}
                                    className="text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-900 hover:shadow-xl "
                                  >
                                    <Link to={"/estate/" + c.id}>
                                      <Card
                                        image={
                                          "https://new-pg.herokuapp.com/Properties/images/" +
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
                              }
                            })
                        }
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default List