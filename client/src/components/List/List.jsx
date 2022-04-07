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
  const searchFeatures = useSelector((state) => state.searchBar)

  useEffect(() => {
    dispatch(getListCards());
  }, []);

  return (
    <div>
      <div className='relative z-6  text-center'>
      <div className="h-20 relative z-20 shadow-nav">
      <div class="bg-[url('../../styles/images/house2.jpg')]"/>
                <Nav />
            </div>
      <div className='relative z-6 text-center'> 
        <SearchBar/>
        {
            searchFeatures.length ? searchFeatures.map(c => {
              return(             
          <div className='text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          <Link to='/'>
            <Card image={'http://localhost:3001/Properties' + c.photos[0].photos} featured={false} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2}/>
          </Link>
        </div>) 
            }) : (<div>loading..</div>)
          }
      </div>
      </div>
        <div className='mx-4 px-6 my-12 grid grid-cols-3 gap-6'>
        {
            listCards.length ? listCards.reverse().slice(0,6).map(c => {
              return(             
          <div className='text-transform: capitalize bg-white transition ease-in-out duration-200 hover:shadow-stone-400 hover:shadow-xl '>
          <Link to='/'>
            <Card image={'http://localhost:3001/Properties/images/' + c.photos[0].photos} featured={false} isMap={false} lease={c.lease} name={c.address} city={c.city} country={c.country} cost={c.cost} measure={c.m2}/>
          </Link>
        </div>) 
            }) : (<div>loading..</div>)
          }


                       
      </div>
                  
      </div>
   
  )
}

export default List