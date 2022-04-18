import React from 'react'
import { useSelector } from 'react-redux';
import houseBackground from '../../styles/images/house-back.jpg';
import Nav from "../Nav";
import { useNavigate, Link } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import HoursPicker from '../Calendar/HoursPicker';
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"

export default function ListProperties() {

    const navigate = useNavigate()
    const userDB = useSelector((state) => state.user);
    return (
        <div>
            <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
                <img className='opacity-60 z-2 object-cover w-full h-full blur-sm' src={houseBackground} />
            </div>
            <div className='relative z-6'>
                <div className=' relative z-20 '>
                    <Nav />
                </div>
            </div>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        userDB.user.sellers[0].properties.map(property => (
                            <div key={property.id}>
                                <div className="group relative">
                                    <div className="w-full border-solid border-2 border-black min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                        <img
                                            src={'http://localhost:3001/Properties/images/' + property.photos[0].photos}
                                            alt="Hello"
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                        />
                                        {
                                            property.statuspromotion === "true" ? <span className="text-white absolute top-1 text-sm font-bold ml-4 font-Poppins  opacity-100 z-120 bg-emerald-800 px-2 py-1 rounded">
                                                Featured
                                            </span>
                                                : ""
                                        }
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-lg text-white italic">
                                                <Link to={`/estate/${property.id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    "ESTADO ACTUAL"
                                                </Link>
                                            </h3>

                                            <p className="mt-1 text-sm text-white">Country: {property.country}</p>
                                            <p className="mt-1 text-sm text-white">State/Province: {property.state}</p>
                                            <p className="mt-1 text-sm text-white">City: {property.city}</p>
                                            <p className="mt-1 text-sm text-white">Property Type: {property.propertyType}</p>
                                        </div>
                                        <p className="text-sm font-medium text-white italic">Cost: ${property.cost}</p>
                                    </div>
                                </div>
                                <div className='flex justify-around flex-col my-4'>
                                    <Button
                                        color="cyan"
                                        buttonType="filled"
                                        size="regular"
                                        rounded={true}
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="relative mx-1"
                                    >
                                        Promote
                                    </Button>
                                    <div className='flex flex-row justify-around my-4'>
                                        <Button
                                            color="bg-stone-800"
                                            buttonType="filled"
                                            size="regular"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                            className="relative mx-1 bg-stone-800"
                                            onClick={() => {
                                                navigate(`/estate/edit/${property.id}`)
                                            }}
                                        >
                                            Edit Property
                                        </Button>
                                        <Button
                                            color="red"
                                            buttonType="filled"
                                            size="sm"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="light"
                                            className="relative mx-1"
                                        >
                                            DELETE PROPERTY
                                        </Button>
                                    </div>
                                    <div className='flex justify-center'>
                                    <Dropdown
                                        color="bg-stone-800"
                                        placement="bottom-start"
                                        buttonText="Change Status"
                                        buttonType="filled"
                                        size="regular"
                                        rounded={true}
                                        block={false}
                                        ripple="light"
                                        className="relative text-center bg-stone-800"
                                    >
                                        <DropdownItem color="lightBlue" ripple="light">
                                            Enable
                                        </DropdownItem>
                                        <DropdownLink
                                            href="#"
                                            color="lightBlue"
                                            ripple="light"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Pause
                                        </DropdownLink>
                                        <DropdownItem color="lightBlue" ripple="light">
                                            Close
                                        </DropdownItem>
                                    </Dropdown>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}