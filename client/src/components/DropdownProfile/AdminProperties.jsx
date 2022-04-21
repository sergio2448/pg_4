import { Link } from 'react-router-dom';
import Card from "../Card"
import Nav from '../Nav'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCards } from '../../redux/actions';
import houseBackground from '../../styles/images/house-back.jpg'

function AdminProperties() {

    const dispatch = useDispatch();
    const properties = useSelector((state) => state.homeCards);
    const [currentProperties, setCurrentProperties] = useState([]);

    useEffect(() => {
        dispatch(getListCards());
    }, []);

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
                    <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
                      
                        {
                            properties.length ? ( (!currentProperties.length ? setCurrentProperties(properties) : currentProperties.length) &&
                              currentProperties?.map(c => {
                              if(c.idstatus.statusName) {
                                return (
                                  <div
                                    key={c.id}
                                    className="text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-900 hover:shadow-xl "
                                  >
                                  
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
                                        id={c.id}
                                        currentProperties={currentProperties}
                                        setCurrentProperties={setCurrentProperties}
                                      />
                                  
                                  </div>
                                );
                              }
                            })) : <div>Loading..</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProperties

