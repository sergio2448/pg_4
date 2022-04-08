import React from 'react'
import ReactMapGL, {Marker, GeolocateControl, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {ImLocation2} from "react-icons/im"
const apiKey = 'pk.eyJ1IjoiY2x1ejEyMyIsImEiOiJjbDFteGU3d2wwb2FlM2RtbTl1cGo1dmJ5In0.jk1TN2dm1nwc5Drrwx9MLQ'
import witch from "../../styles/images/house-back.jpg"
import axios from 'axios';

export default function Page4({ setPages, pages, setCurrentStep, newEstate, setNewEstate }) {

    const [viewport, setViewport ] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 0
    })

    const [marker, setMarker] = React.useState({
        lngLat: {
            lat:37.8,
            lng: -122.4
        }
    })

    React.useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${newEstate.country}`)
            .then(result => {
                if(newEstate.country) {
                    setViewport({
                        latitude: result.data[0].latlng[0],
                        longitude: result.data[0].latlng[1],
                        zoom: 2
                    })
                    setMarker({
                        lngLat: {
                            lat: result.data[0].latlng[0],
                            lng: result.data[0].latlng[1]
                        }
                    })
                }
            })
            .catch(error => console.log(error.message))
    },[])


    return (
        <div className="px-4 py-5 sm:p-6 bg-[#00000099]">
            <div className='h-64 w-full text-white'>
                Indicate the exact location of your property
            {
                apiKey ? (<ReactMapGL
                    {...viewport}
                    
                    onMove={(newViewport) => {
                        setViewport({
                            latitude: newViewport.viewState.latitude,
                            longitude: newViewport.viewState.longitude,
                            zoom: newViewport.viewState.zoom
                        })
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9" mapboxAccessToken={apiKey} >
                        <GeolocateControl />
                        <NavigationControl />
                        <Marker
                            latitude={marker.lngLat.lat}
                            longitude={marker.lngLat.lng}
                            draggable={true}
                            
                            onDragEnd={(newUrl) => {
                                console.log(newUrl)
                                setMarker({
                                    lngLat: {
                                        lat: newUrl.lngLat.lat,
                                        lng: newUrl.lngLat.lng
                                    }
                                })
                                setNewEstate({
                                    ...newEstate,
                                    latitude: newUrl.lngLat.lat,
                                    longitude: newUrl.lngLat.lng
                                })
                            }}
                            >
                            <ImLocation2 className='h-8 w-8 text-teal-600'/>
                            
                            
                        </Marker>
                    </ReactMapGL>
                ) : 'Loading..'
            }
            </div>
            <div className="px-4 py-3 text-center sm:px-6 mt-8">
                <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                        setCurrentStep(3)
                        setPages({
                            ...pages,
                            page3: true,
                            page4: false
                        })
                    }}
                >
                    Previous
                </button>
            </div>
            <div>
                <div className="px-4 py-3 text-center sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Upload property
                    </button>
                </div>
            </div>
        </div>

    )
}
