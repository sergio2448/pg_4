import React, { useEffect, useState } from 'react';
import Nav from '../Nav';
import houseBackground from '../../styles/images/house-back.jpg'
import  { useAuth0 } from '@auth0/auth0-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getFavourites,deleteFavourites } from "../../redux/actions";
import Footer from '../Footer';




function StripedTable() {

  const user = useSelector((state)=>state.user)
  const favourites = useSelector((state)=>state.favourites)
  
  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(getFavourites(user.user.id))
    console.log(favourites) 
    const favoritosReduce = favourites[0].favorites.join(',')
    console.log(favoritosReduce)

  }, [])
  
  
  // console.log(user.user.buyers[0]?.id)

  const thClass =
    "px-2 py-2 text-left bg-blue-900 text-white text-sm font-medium " 
  const tdClass = "px-4 py-8 border-t border-b border-gray-300 text-sm"
  const trClass = "border-gray-300 bg-gray-300 "
  return (
    <div>
    <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
      <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
    </div>
    <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black'></div>
    <Nav />
    <div  className="flex flex-col bg-sky-500/80 relative  items-center justify-center 	w-full h-full border-solid border-4">
    <h2 className='text-white text-3xl font-semi-bold font-Poppins p-10 '>Favorite Properties</h2>

    <table className="w-1/2 table-auto rounded-md   ">
      <thead>
        <tr>
          <th className={thClass}>Properties</th>
          <th className={thClass}>Location</th>
          <th className={thClass}>Adress</th>
          <th className={thClass}>Rent/Sell</th>
          <th className={thClass}>M2</th>
          <th className={thClass}>Price range</th>
        </tr>
      </thead>
      <tbody>
        {favourites[0].favorites.map(()=>{
          return(<tr className={trClass}>
            <td className={tdClass}>
                <a  href={`http://localhost:3000/estate/${favourites[0].favorites[0].property.id}`} >
              <img
                src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
                className="h-24"
              /></a>
            </td>
            <td className={tdClass}>{favoritosReduce.property.city}</td>
            <td className={tdClass}>{favourites[0].favorites[0].property.address}</td>
            <td className={tdClass}>Rent</td>
            <td className={tdClass}>{favourites[0].favorites[0].property.m2}m2</td>
            <td className={tdClass}>${favourites[0].favorites[0].property.cost}</td>
            <button onSubmit={()=>dispatch(deleteFavourites(favourites[0].favorites[0].id,favourites[0].favorites[0].buyerId, favourites[0].favorites[0].propertyId))}>delete</button>
          </tr>   )
        })}
         {/* <tr className={trClass}>
          <td className={tdClass}>
              <a  href={`http://localhost:3000/estate/${favourites[0].favorites[0].property.id}`} >
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            /></a>
          </td>
          <td className={tdClass}>{favourites[0].favorites[0].property.city}</td>
          <td className={tdClass}>{favourites[0].favorites[0].property.address}</td>
          <td className={tdClass}>Rent</td>
          <td className={tdClass}>{favourites[0].favorites[0].property.m2}m2</td>
          <td className={tdClass}>${favourites[0].favorites[0].property.cost}</td>
          <button onClick={()=>dispatch(deleteFavourites(favourites.id,favourites.buyerId, favourites.propertyId))}>delete</button>
        </tr>  */}
        {/* <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            />
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 5th</td>
          <td className={tdClass}>Sell</td>
          <td className={tdClass}>5</td>
          <td className={tdClass}>5</td>
          <button onClick={()=>dispatch(deleteFavourites(favourites.id,favourites.buyerId, favourites.propertyId))}>delete</button>
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            />
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 12th</td>
          <td className={tdClass}>Rent</td>
          <td className={tdClass}>Free</td>
          <td className={tdClass}>5</td>
          <button onClick={()=>dispatch(deleteFavourites(favourites.id,favourites.buyerId, favourites.propertyId))}>delete</button>

          
        </tr>
        <tr className={trClass}>
          <td className={tdClass}>
            <img
              src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
              className="h-24"
            />
          </td>
          <td className={tdClass}>Argentina,Buenos Aires</td>
          <td className={tdClass}>March 31st</td>
          <td className={tdClass}>Sell</td>
          <td className={tdClass}>$7</td>
          <td className={tdClass}>5</td>
          <button onClick={()=>dispatch(deleteFavourites(favourites.id,favourites.buyerId, favourites.propertyId))}>delete</button>
        </tr> */}
      </tbody>
    </table>
 </div>
    <Footer/>
   </div>
  )
}

export default StripedTable