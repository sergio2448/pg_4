import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';





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
  apiKey
}) {
  rooms = 5;
  const mapRef = useRef();
  console.log(apiKey)
  const [ dataMap, setDataMap ] = useState({
    latitude: 52.6376,
    longitude: -1.135171,
    width: "100%",
    height: "100%",
    zoom: 12
  })

  return isMap ? (
    <div className="border border-stone-600/40 pb-6  transition ease-in-out duration-200 hover:text-sky-500">
      <div className="relative bg-black w-full h-64">
        {
          apiKey ? (<ReactMapGL 
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9" mapboxAccessToken={apiKey} ></ReactMapGL>) : 'Loading..'}
      </div>
      <h2 className="px-6 mt-6 mb-6 text-xl font-bold font-Monserrat">
        {city + ", " + country}
      </h2>
      <div className="px-6 grid grid-cols-1 gap-x-10">
        <span className="text-left text-stone-600/60">Listings: {rooms} </span>
        <span className="text-left text-stone-600/60">
          Price: {cost + " ~ " + cost}
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
        <span className="text-white text-sm font-bold ml-4 font-Poppins opacity-100 z-120 bg-rose-500 px-2 py-1 rounded">
          {lease == 'Venta' ? 'For Sale' : 'Rent'}
        </span>
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
