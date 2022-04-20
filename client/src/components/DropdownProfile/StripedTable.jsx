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

  console.log(favourites)
  const dispatch = useDispatch();
   useEffect( async function() {
     await dispatch(getFavourites(user.user.id))

    

    

  }, [])
  
  
  // console.log(user.user.buyers[0]?.id)
  const taClass =
  "px-2 py-2 text-left bg-sky-500/80 text-white text-sm font-medium border-black border-y border-x "
  const thClass =
    "px-2 py-2 text-left bg-sky-500/80 text-white text-sm font-medium border-black border-y border-x" 
  const tdClass = "px-4 py-8 border-y border-x  border-black   text-sm"
  const trClass = "border-black  border-y border-x  "
  return (
    <div>
    <div className='z-1 absolute bg-black w-full h-full shadow-black shadow-2xl '>
      <img className='opacity-60 z-2 object-cover w-screen h-screen ' src={houseBackground} />
    </div>
    <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black self-center '></div>
    <Nav />{/* sky-500/80 */}
    <div  className="bg-white  my-12 rounded-md p-4 relative ml-96 flex flex-col  items-center 	w-1/2 h-full border-solid border-sky-500/90 border-4 self-end">
    <h2 className='text-white text-3xl font-semi-bold  p-10 text-black '>Favorite Properties</h2>

    <table className="w-full   table-auto rounded-md   ">
      <thead>
        <tr>
          <th className={thClass}>Properties</th>
          <th className={thClass}>Location</th>
          <th className={thClass}>Adress</th>
          <th className={thClass}>Rent/Sell</th>
          <th className={thClass}>M2</th>
          <th className={thClass}>Price range</th>
          <th className={thClass}></th>
        </tr>
      </thead>
      <tbody>
           {favourites[0]?.favorites.map((element)=>{
          return(<tr className={trClass}>
            <td className={tdClass}>
                <a  href={`http://localhost:3000/estate/${element.property.id}`} >
              <img
                src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
                className="h-12 "
              /></a>
            </td>
            
            <td className={tdClass}>{element.property.city}</td>
            <td className={tdClass}>{element.property.address}</td>
            <td className={tdClass}>Rent</td>
            <td className={tdClass}>{element.property.m2}m2</td>
            <td className={tdClass}>${element.property.cost}</td>
            <button className='justify-self-center' onClick={(dispatch)=>dispatch(deleteFavourites(element.id,user.user.roleId, element.propertyId))}>delete</button>
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