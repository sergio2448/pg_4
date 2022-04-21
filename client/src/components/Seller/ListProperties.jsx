import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import houseBackground from '../../styles/images/house-back.jpg';
import Nav from "../Nav";
import { useNavigate, Link } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import { useAuth0 } from '@auth0/auth0-react';
import { loadUser } from '../../redux/actions';
import axios from 'axios';
import Paypalbutton from '../paypal/paypalbutton';
import Footer from '../Footer';

export default function ListProperties() {

    const navigate = useNavigate()
    const userDB = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const { user } =  useAuth0()

    return (
        <div>
            <div className='z-1 fixed bg-black w-full h-screen shadow-black shadow-2xl'>
                <img className='opacity-60 z-2 object-cover  w-full h-screen blur-sm' src={houseBackground} />
            </div>
            
                <div className=' relative z-20 '>
                    <Nav />
                </div>
        
            <div className="relative flex flex-col items-center mt-12 ">
            <h3 className="text-5xl font-bold	text-white font-Poppins ">Publications</h3>
            </div>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        userDB.user.sellers[0].properties.length ? userDB.user?.sellers[0]?.properties.map(property => (
                            <div key={property.id} className="w-full">
                                <div className="group relative">
                                    <div className="w-full border-solid border-2 border-black min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                        <img
                                            src={'https://new-pg.herokuapp.com/Properties/images/' + property.photos[0].photos}
                                            alt="Loading..."
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
                                            <h3 className="text-lg text-white italic uppercase mb-2">
                                                <Link to={`/estate/${property.id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {property.idstatus.statusName}
                                                </Link>
                                                <p className="mt-1 text-lg text-white">{property.lease}</p>
                                            </h3>

                                            <p className="mt-1 text-sm text-white">Country: {property.country}</p>
                                            <p className="mt-1 text-sm text-white">State/Province: {property.state}</p>
                                            <p className="mt-1 text-sm text-white">City: {property.city}</p>
                                            <p className="mt-1 text-sm text-white">Property Type: {property.propertyType}</p>
                                        </div>
                                        <p className="text-lg font-medium text-white italic">Cost: ${property.cost}</p>
                                    </div>
                                </div>
                                <div className='flex justify-around flex-col my-4'>
                                <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="lg"
                                            rounded={false}
                                            block={false}
                                            iconOnly={false}
                                            ripple="dark"
                                            className="relative mx-1 text-black animate-bounce"
                                            onClick={(e) => setShowModal2(true)}
                                        >
                                            Promote Publication 
                                        </Button>
                                        <Modal size="lg" active={showModal2} className="relative" toggler={() => 
                                                setShowModal2(false)
                                            }>
                                            <ModalHeader toggler={() => {
                                                setShowModal2(false)
                                            }} >
                                                Okay! Choose how long you want to advertise your property
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className="text-base leading-relaxed text-gray-600 font-normal">
                                                Our payment method is PayPal, your publication will be placed in the main view and will have first positions in filtersOur payment method is PayPal, your publication will be placed in the main view and will have first positions in filters.
                                                </p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    color="lightBlue"
                                                    buttonType="filled"
                                                    size="lg"
                                                    rounded={true}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="dark"
                                                    className="relative mx-1"
                                                    onClick={async (e) => {
                                                        e.preventDefault()
                                                        try {
                                                            let paypal = await axios.post(`http://localhost:3001/pay/dispatch-order?tiempo=uno`, {
                                                                id: property.id
                                                            })
                                                            console.log(paypal)
                                                            window.location.replace(paypal.data.links[1].href)
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                >
                                                    1 Month
                                                </Button>
                                                <Button
                                                    color="lightBlue"
                                                    buttonType="filled"
                                                    size="lg"
                                                    rounded={true}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="dark"
                                                    className="relative mx-1"
                                                    onClick={async (e) => {
                                                        e.preventDefault()
                                                        try {
                                                            let paypal = await axios.post(`http://localhost:3001/pay/dispatch-order?tiempo=tres`, {
                                                                id: property.id
                                                            })
                                                            console.log(paypal)
                                                            window.location.replace(paypal.data.links[1].href)
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                >
                                                    3 Months
                                                </Button>
                                                <Button
                                                    color="lightBlue"
                                                    buttonType="filled"
                                                    size="lg"
                                                    rounded={true}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="dark"
                                                    className="relative mx-1"
                                                    onClick={async (e) => {
                                                        e.preventDefault()
                                                        try {
                                                            let paypal = await axios.post(`http://localhost:3001/pay/dispatch-order?tiempo=seis`, {
                                                                id: property.id
                                                            })
                                                            console.log(paypal)
                                                            window.location.replace(paypal.data.links[1].href)
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                >
                                                    6 Months
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
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
                                            onClick={(e) => {
                                                e.preventDefault()
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
                                            onClick={(e) => setShowModal(true)}
                                        >
                                            DELETE PROPERTY
                                        </Button>
                                        <Modal size="sm" active={showModal} className="relative" >
                                            <ModalHeader toggler={() => {
                                                setShowModal(false)
                                            }} >
                                                Warning!
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className="text-base leading-relaxed text-gray-600 font-normal">
                                                Are you sure you want to delete this property? If so, click the Delete button.
                                                </p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    color="red"
                                                    buttonType="filled"
                                                    size="sm"
                                                    rounded={false}
                                                    block={false}
                                                    iconOnly={false}
                                                    ripple="light"
                                                    className="relative mx-1"
                                                    onClick={async (e) => {
                                                        e.preventDefault()
                                                        try {
                                                            await axios.delete(`https://new-pg.herokuapp.com/Properties/${property.id}`)
                                                            let userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${userDB.user.email}`)
                                                            dispatch(loadUser(userExist.data))
                                                            setShowModal(false)
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                >
                                                    CONFIRM DELETE
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <div className='flex justify-center'>
                                    <Dropdown
                                        color="bg-stone-800"
                                        placement="bottom-start"
                                        buttonText="Change Status"
                                        buttonType="filled"
                                        size="regular"
                                        rounded={false}
                                        block={false}
                                        ripple="light"
                                        className="relative text-center bg-stone-800"
                                    >
                                        <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                            e.preventDefault()
                                            try {
                                                let state = await axios("https://new-pg.herokuapp.com/status")
                                                await axios.put(`https://new-pg.herokuapp.com/Properties/${property.id}`, {
                                                    idstatusId: state.data[0].id
                                                })
                                                let userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${userDB.user.email}`)
                                                dispatch(loadUser(userExist.data))
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        }}>
                                            Enable
                                        </DropdownItem>
                                        <DropdownLink
                                            href="#"
                                            color="lightBlue"
                                            ripple="light"
                                            onClick={async (e) =>{ 
                                                e.preventDefault()
                                                try {
                                                    let state = await axios("https://new-pg.herokuapp.com/status")
                                                    await axios.put(`https://new-pg.herokuapp.com/Properties/${property.id}`, {
                                                        idstatusId: state.data[1].id
                                                    })
                                                    let userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${userDB.user.email}`)
                                                    dispatch(loadUser(userExist.data))
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}
                                        >
                                            Pause
                                        </DropdownLink>
                                        <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                            e.preventDefault()
                                            try {
                                                let state = await axios("https://new-pg.herokuapp.com/status")
                                                console.log(state.data[2].id)
                                                await axios.put(`https://new-pg.herokuapp.com/Properties/${property.id}`, {
                                                    idstatusId: state.data[2].id
                                                })
                                                console.log(userDB)
                                                let userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${userDB.user.email}`)
                                                dispatch(loadUser(userExist.data))
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        }}>
                                            Close
                                        </DropdownItem>
                                    </Dropdown>
                                    </div>
                                    
                                </div>
                            </div>
                        )): <p className='text-white relative text-5xl pb-20  mb-32 absolute mx-32 font-bold font-Poppins'>You don't have any properties created.</p>
                    }
                </div>   
            </div>
            <div className=' relative'>
            <Footer/></div>
        </div>
    )
}