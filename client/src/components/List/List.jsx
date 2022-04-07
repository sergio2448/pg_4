import hardcodeHouse from "../../styles/images/hardcode-house.jpg"
import poolHouse from "../../styles/images/house-back2.jpg"
import { Link } from 'react-router-dom';
import Card from "../Card"
import Nav from '../Nav'
import SearchBar from '../SearchBar'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConteinInputs from "./ConteinInputs"
import { getListCards } from '../../redux/actions';

function List() {

  const dispatch = useDispatch();  
  const listCards = useSelector((state) => state.homeCards);

  useEffect(() => {
    dispatch(getListCards());
  }, []);

  return (
    <div className=" bg-stone-200/75">
      <div className='relative z-6 bg-stone-200/75 text-center'>
      <div className='bg-stone-800 h-20 relative z-20 shadow-nav'>
                <Nav />
            </div>
      <div className='relative z-6 text-center'> 
        <SearchBar/>
      </div>
      </div>
      
      <div className=' mt-45 pt-10 py-15  bg-stone-200/75 text-center'>    
      <ConteinInputs/>  
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
        {
            listCards.length ? listCards.reverse().slice(0,4).map(c => {
              return(             
          <div className='text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          <Link to='/'>
            <Card image={'http://localhost:3001/Properties/images/' + c.photos[0].photos} featured={false} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2}/>
          </Link>
        </div>) 
            }) : (<div>loading..</div>)
          }
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card name="San Martín 308" country="Argentina" city="Calafate" cost="$77.000" measure="180" rooms="3" image={poolHouse} />
          </div>
          <div className=' bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
              <Card name="Av Francisco" country="México" city="Acapulco" cost="$80.000" measure="289" rooms="5"  image={hardcodeHouse} />
          </div>


        </div>                
      </div>
                  
      </div>
   
  )
}

export default List