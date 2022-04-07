/* eslint import/no-webpack-loader-syntax: off */
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

const MapStyle = 'mapbox://styles/mapbox/streets-v11';
mapboxgl.accessToken ='pk.eyJ1IjoiY2x1ejEyMyIsImEiOiJjbDFteGU3d2wwb2FlM2RtbTl1cGo1dmJ5In0.jk1TN2dm1nwc5Drrwx9MLQ'


const Map = ({location, markers, draggable, handleDrag}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-87.65);
  const [lat, setLat] = useState(41.84);
  const [zoom, setZoom] = useState(12);
  const [marker, setMarker] = useState()
  let marker2 ;

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MapStyle,
      center: location,
      zoom: zoom,
    });

    // Create default markers
    console.log(draggable)
    if(draggable){
      
      marker2=new mapboxgl.Marker({draggable: true})
        .setLngLat(location)
        .addTo(map)
        setMarker(marker2)
      
      console.log(marker)
    } else {
      markers?.features.map((marker) =>
          {
              new mapboxgl.Marker()
              .setLngLat(marker.geometry.coordinates)
              .setPopup(
                  new mapboxgl.Popup({ offset: 25 })
                  .setHTML(
                      `<div>
                          <h2 class="text-lg">${marker.properties.establishment}</h2>
                          <h3 class="text-lg">${marker.properties.site} - ${marker.properties.court}</h3>
                          <p class="text-lg">${marker.properties.address}</p>
                          <p class="text-lg">${marker.properties.sport}</p>
                          <p class="text-lg">${marker.properties.price}</p>
                      </div>`
                  )
              )
              .addTo(map)
          }
      );
    }

    marker2.on('dragend',  () =>{
        const lngLat = marker2.getLngLat();
        console.log(marker2); 
       console.log(`Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`);
      })

    
    //getLngLat()

    // marker.on('dragend', onDragEnd)

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;