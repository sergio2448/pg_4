import React, { useEffect, useState } from 'react';
import Nav from '../Nav';
import houseBackground from '../../styles/images/house-back.jpg'
import  { useAuth0 } from '@auth0/auth0-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getFavourites,deleteFavourites } from "../../redux/actions";
import Footer from '../Footer';
import { useNavigate } from "react-router-dom";




function StripedTable() {

  const [render,setrender] =useState(0)
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  const favourites = useSelector((state)=>state.favourites)

  
  const dispatch = useDispatch();
   useEffect( async function() {
     await dispatch(getFavourites(user.user.id))
     return () => {
      dispatch(getFavourites(user.user.id));
    };
    

  }, [render])

  const handleSubmit = async ( element ) =>{
    await dispatch(deleteFavourites(element.id,element.buyerId, element.propertyId))
    setrender(render+1)
    // if(window.confirm("Are you sure you want to delete favorite?")){
      
       
    // }
    
  }
  async function Redirect( element){
   
    navigate(`/estate/${element.propertyId}`)
  }
  
  
  // console.log(user.user.buyers[0]?.id)
  const puntas2Class =
  "px-2 py-2 text-left bg-stone-900 text-white text-lg	font-medium  rounded-tr-md"
  const puntasClass =
  "px-2 py-2 text-left bg-stone-900 text-white text-lg	 font-medium  rounded-tl-md"
  const thClass =
    "px-2 py-2 text-left bg-stone-900 text-white text-lg	 font-medium  font-Poppins" 
  const tdClass = "px-4 py-8 border-y border-x  border-black   text-md bg-white font-Poppins "
  const trClass = "border-black  border-y border-x bg-white align-middle items-center font-Poppins "
  return (
    <div >
    <div className='z-1 absolute bg-black w-full h-full shadow-black shadow-2xl '>
      <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
    </div>
    <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black self-center '></div>
    <Nav />{/* sky-500/80 */}
    <div  className="  my-12 rounded-md p-4 relative bg-gray-300/80 flex flex-col  items-center 	w-screen h-full shadow-md    self-end">
    <h2 className='text-white text-5xl pb-20  relative font-bold font-Poppins'>Favorite Properties</h2>

    <table className="w-4/6 table-auto  rounded-md   ">
      <thead>
        <tr>
          <th className={puntasClass}>Properties</th>
          <th className={thClass}>Location</th>
          <th className={thClass}>Adress</th>
          <th className={thClass}>Rent/Sell</th>
          <th className={thClass}>M2</th>
          <th className={thClass}>Price range</th>
          <th className={puntas2Class}></th>
        </tr>
      </thead>
      <tbody>
            

           {favourites[0]?.favorites.map((element)=>{
          return(<tr className={trClass}>

            
            <td className={tdClass} onClick={()=> Redirect(element)}>
                <a >
              <img
                src="https://frtassets.fotocasa.es/statics/img/home_inspirational_block_6.jpg"
                className="h-12"
              /></a>
            </td>
            
            <td className={tdClass}>{element.property.city}</td>
            <td className={tdClass}>{element.property.address}</td>
            <td className={tdClass}>{element.property.lease === "Alquiler"? "rent" : "sell"}</td>
            <td className={tdClass}>{element.property.m2}m2</td>
            <td className={tdClass}>${element.property.cost}</td>
            <div className='flex flex-col pt-10 '>
            <button className='' onClick={()=> handleSubmit(element)}>Delete Favorites</button></div>
          </tr>   )
        })}   
         
      </tbody>
    </table>
 </div>
          <div className='bottom-0 absolute'>
    <Footer /></div>
   </div>
  )
}

export default StripedTable