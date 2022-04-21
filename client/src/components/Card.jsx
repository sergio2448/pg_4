import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {ImLocation2} from "react-icons/im"

export default function Cards({
  image,
  featured = false,
  isMap = false,
  lease,
  name,
  city,
  country,
  cost,
  measure,
  rooms,
  latitude,
  longitude,
  maplist,
  id,
  currentProperties,
  setCurrentProperties
}) {
  rooms = 5;
  const apiKey = 'pk.eyJ1IjoiY2x1ejEyMyIsImEiOiJjbDFteGU3d2wwb2FlM2RtbTl1cGo1dmJ5In0.jk1TN2dm1nwc5Drrwx9MLQ'
  const mapRef = useRef();
  const user = useSelector(state => state.user)

  function deleteProperties(id, adminEmail) {
    return axios.delete(`http://localhost:3001/admin/delete-prop?id=${id}&adminEmail=${adminEmail}`)
    .then((res)=>{
        alert('Property has been deleted.')
    })
    .catch((err) => console.error(err));

  }

  function handleButton(e) {
  if (window.confirm("Do you really want to delete this property?")) {
    deleteProperties(id, user.user.email)
    let newProps = [];
    currentProperties.map(c => {
      if(c.id !== id){
        newProps.push(c);
      }
    })
    setCurrentProperties(newProps);  
  }
  
}


  return isMap ? (
    <div className="border border-stone-600/40 pb-6  transition ease-in-out duration-200 hover:text-sky-500">
      <div className="relative bg-black w-full h-64">
        {
          apiKey ? (<ReactMapGL 
      initialViewState={{
        latitude: latitude,
        longitude: longitude,
        zoom: 10
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9" mapboxAccessToken={apiKey} >
        {
          maplist?.map(m => {
            return (
            <Marker
              latitude={m.longitude}
              longitude={m.latitude}
              draggable={false}
              key={m.logitude}
              >
              <ImLocation2 className='h-8 w-8 text-teal-600'/>
              
              
          </Marker>)
          })
        }
      </ReactMapGL>) : 'Loading..'}
      </div>
      <h2 className="px-6 mt-6 mb-6 text-xl font-bold font-Monserrat">
        { city + ", " + country}
      </h2>
      <div className="px-6 grid grid-cols-1 gap-x-10">
        <span className="text-left text-stone-600/60">Listings: {maplist.length} </span>
        <span className="text-left text-stone-600/60">
          Price: {parseFloat(maplist[0].cost) < parseFloat(maplist[maplist.length-1].cost) ? maplist[0].cost + " ~ " + maplist[maplist.length-1].cost : maplist[maplist.length-1].cost+ " ~ " + maplist[0].cost}
        </span>
      </div>
    </div>
  ) : (
    <div className="border border-stone-600/40 pb-6 h-full transition ease-in-out duration-200 hover:text-sky-500">
      <div className="relative bg-black w-full h-64">
        <img
          className="w-full h-full object-cover transition ease-in-out duration-200 hover:opacity-60"
          src={image}
        />
      </div>
      <div className="relative bottom-60 float-left">
        {featured ? (
          <span className="text-white  text-sm font-bold ml-4 font-Poppins  opacity-100 z-120 bg-emerald-500 px-2 py-1 rounded">
            Featured
          </span>
        ) : (
          <span></span>
        )} 
        {
          window.location.pathname == "/logged/Publishing" ? (<button onClick={(e) => {handleButton(e)}} className='text-white bg-red-600 border-dashed rounded-md text-xl hover:bg-red-800'>Eliminate</button>) : (<span className="text-white text-sm font-bold ml-4 font-Poppins opacity-100 z-120 bg-rose-500 px-2 py-1 rounded">
          {lease == 'Venta' ? 'For Sale' : 'Rent'}
        </span>)
        }
      </div>
        <h2 className="px-6 mt-6 mb-6 text-xl font-bold font-Monserrat">
          {name + ", " + city + ", " + country}
        </h2>
      <div className="px-6 grid grid-cols-2 gap-x-10">
        <span className="text-left text-stone-600/60">{rooms} Rooms </span>
        <span className="text-right text-stone-600/60">Measure: {measure} m2</span>
        <span className="text-left text-stone-600/60">other details</span>
      </div>
      <div className="text-stone-600  border-stone-600/40 w-4/5 m-auto mt-4 pt-4 border-t-2 text-left">
        <h2>Cost: $ {cost} usd</h2>
      </div>
    </div>
  );
}
