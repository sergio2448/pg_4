import React from 'react'
import ReactMapGL, {Marker, GeolocateControl, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {ImLocation2} from "react-icons/im"
const apiKey = 'pk.eyJ1IjoiY2x1ejEyMyIsImEiOiJjbDFteGU3d2wwb2FlM2RtbTl1cGo1dmJ5In0.jk1TN2dm1nwc5Drrwx9MLQ'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

export default function Page4({ setPages, pages, setCurrentStep, newEstate, setNewEstate, submit, errorsForm }) {

    const [showModal, setShowModal] = React.useState(false)
    const [time, setTime] = React.useState(10000)
    const navigate = useNavigate()

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
        if(newEstate.longitude) {
            setViewport({
                latitude: newEstate.longitude,
                longitude: newEstate.latitude,
                zoom: 9
            })
            setMarker({
                lngLat: {
                    lat: newEstate.longitude,
                    lng: newEstate.latitude
                }
            })
        } else {
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
        }
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
                            longitude: newViewport.viewState.longitude,
                            latitude: newViewport.viewState.latitude,
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
                                setMarker({
                                    lngLat: {
                                        lat: newUrl.lngLat.lat,
                                        lng: newUrl.lngLat.lng
                                    }
                                })
                                setNewEstate({
                                    ...newEstate,
                                    longitude: newUrl.lngLat.lat,
                                    latitude: newUrl.lngLat.lng
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
                    className="inline-flex justify-center ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-4 py-2 rounded"
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
                        onClick={(e) => {
                            if(Object.values(errorsForm).length === 0) {
                                submit(e)
                                setShowModal(true)
                                setTimeout(() => {
                                    setTime(null)
                                }, time);
                            } else {
                                alert("Your upload form is not correct")
                                navigate("/")
                            }
                        }}
                        className="inline-flex justify-center ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-4 py-2 rounded"
                    >
                        Upload property
                    </button>
                </div>
            </div>
            <Modal size="sm" active={showModal} toggler={() => {
                            if(time === null) {
                                navigate('/listProperties')
                            }
                        }}>
                <ModalHeader toggler={() => {
                    if(time === null) {
                        navigate('/listProperties')
                    }
                }}>
                {
                    time !== null ? "Await..." : "Ready"
                }
                </ModalHeader>
                <ModalBody>
                    {
                        time !== null ? <p className="text-base text-gray-600 font-normal">
                            Wait a few seconds! We are processing the property. At the end you will get a button to continue
                        </p> : <p className="text-base text-gray-600 font-normal">
                            Ready! You can click on the button to continue to select your available days for a client
                        </p>
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        time !== null ? 
                        <div class="flex justify-center items-center">
                            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>
                        </div> : 
                        <Button
                            color="lightBlue"
                            buttonType="filled"
                            size="regular"
                            className="mt-8"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            onClick={async (e) => {
                                e.preventDefault()
                                navigate('/logged/SellerCalendar')
                            }}
                        >
                            Go!
                        </Button>
                    }
                </ModalFooter>
            </Modal>
        </div>

    )
}
