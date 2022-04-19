import React from "react";
import Nav from "../Nav";
import houseBackground from '../../styles/images/house-back.jpg';
import axios from "axios"
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import { useSelector } from "react-redux";


export default function Schedule() {

    const [quotes, setQuotes] = React.useState(null)
    const userDB = useSelector(state => state.user)

    console.log(userDB.user.sellers[0].id)
    console.log(userDB.user.buyers[0].id)
    React.useEffect(async () => {
        try {
            let quot = await axios.put(`http://localhost:3001/agenda`, {
                idSeller: userDB.user.sellers[0].id,
                idBuyer: userDB.user.buyers[0].id
            })
            setQuotes(quot.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    console.log(quotes)

    return (
        <div className="w-full h-screen bg-stone-200/75 ">
            <div class="shadow-inner shadow-black">
                <div className="z-1 absolute bg-black w-full h-full shadow-black shadow-2xl">
                    <img className=" opacity-60 z-2 object-cover w-full h-full blur-sm" src={houseBackground} />
                </div>
                <div className='z-2 absolute  w-full h-full shadow-inner shadow-black'></div>
                <div class="shadow-nav h-20 relative z-20 ">
                    <Nav />
                </div>
            </div>
            <div className="bg-white relative w-full h-screen">
                <div className="flex flex-col relative">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center mt-8">
                        <div className="py-2 inline-block w-11/12 sm:px-6 lg:px-8">
                            Whit seller
                            <div className="overflow-hidden rounded-2xl">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-gray-800 boder-gray-900">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Date
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Time
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Confirm/Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            quotes?.map(quote =>
                                                quote.sellerId === userDB.user.sellers[0].id &&
                                                <tr className="border-b bg-blue-100 border-black">
                                                    <td className="text-sm text-gray-900 font-medium px-4 py-2 whitespace-nowrap">
                                                        {quote.dates.day}/{quote.dates.month}/{quote.dates.year}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                        {quote.hours.hours}:{quote.hours.minutes}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                        <Dropdown
                                                            color="lightBlue"
                                                            placement="bottom-start"
                                                            buttonText="Change Status"
                                                            buttonType="filled"
                                                            size="sm"
                                                            rounded={true}
                                                            block={false}
                                                            ripple="light"
                                                            className="relative text-center bg-stone-800"
                                                        >
                                                            <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                                                e.preventDefault()
                                                                /* try {
                                                                    let state = await axios("http://localhost:3001/status")
                                                                    await axios.put(`http://localhost:3001/Properties/${property.id}`, {
                                                                        idstatusId: state.data[0].id
                                                                    })
                                                                    let userExist = await axios(`http://localhost:3001/optionUser/${userDB.user.email}`)
                                                                    dispatch(loadUser(userExist.data))
                                                                } catch (error) {
                                                                    console.log(error)
                                                                } */
                                                            }}>
                                                                Enable
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#"
                                                                color="lightBlue"
                                                                ripple="light"
                                                                onClick={async (e) => {
                                                                    e.preventDefault()
                                                                    /* try {
                                                                        let state = await axios("http://localhost:3001/status")
                                                                        await axios.put(`http://localhost:3001/Properties/${property.id}`, {
                                                                            idstatusId: state.data[1].id
                                                                        })
                                                                        let userExist = await axios(`http://localhost:3001/optionUser/${userDB.user.email}`)
                                                                        dispatch(loadUser(userExist.data))
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                    } */
                                                                }}
                                                            >
                                                                Pause
                                                            </DropdownItem>
                                                            <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                                                e.preventDefault()
                                                                /* try {
                                                                    let state = await axios("http://localhost:3001/status")
                                                                    console.log(state.data[2].id)
                                                                    await axios.put(`http://localhost:3001/Properties/${property.id}`, {
                                                                        idstatusId: state.data[2].id
                                                                    })
                                                                    console.log(userDB)
                                                                    let userExist = await axios(`http://localhost:3001/optionUser/${userDB.user.email}`)
                                                                    dispatch(loadUser(userExist.data))
                                                                } catch (error) {
                                                                    console.log(error)
                                                                } */
                                                            }}>
                                                                Close
                                                            </DropdownItem>
                                                        </Dropdown>
                                                    </td>
                                                    {/* <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                    <Button
                                                        color="red"
                                                        buttonType="filled"
                                                        size="regular"
                                                        rounded={false}
                                                        block={false}
                                                        iconOnly={false}
                                                        ripple="light"
                                                        onClick={async (e) => {
                                                            e.preventDefault()
                                                            try {
                                                                if (selectedDayRange.from && selectedDayRange.to) {
                                                                    let newRange = await axios.post('http://localhost:3001/calendar', {
                                                                        "dates": selectedDayRange,
                                                                        "type": "seller",
                                                                        "userId": userDB.user.id
                                                                    })
                                                                    navigate("/logged/myprofile")
                                                                } else {
                                                                    setShowModal(true)
                                                                }
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td> */}
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-col relative mt-8">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center">
                        <div className="py-2 inline-block w-11/12 sm:px-6 lg:px-8">
                            Whit buyer
                            <div className="overflow-hidden rounded-2xl">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-gray-800 boder-gray-900">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Date
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Time
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Confirm/Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            quotes?.map(quote =>
                                                quote.buyerId === userDB.user.buyers[0].id &&
                                                <tr className="border-b bg-blue-100 border-black">
                                                    <td className="text-sm text-gray-900 font-medium px-4 py-2 whitespace-nowrap">
                                                        {quote.dates.day}/{quote.dates.month}/{quote.dates.year}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                        {quote.hours.hours}:{quote.hours.minutes}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                        <Dropdown
                                                            color="lightBlue"
                                                            placement="bottom-start"
                                                            buttonText="Change Status"
                                                            buttonType="filled"
                                                            size="sm"
                                                            rounded={true}
                                                            block={false}
                                                            ripple="light"
                                                            className="relative text-center bg-stone-800"
                                                        >
                                                            <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                                                e.preventDefault()
                                                                /* try {
                                                                    let state = await axios("http://localhost:3001/status")
                                                                    await axios.put(`http://localhost:3001/Properties/${property.id}`, {
                                                                        idstatusId: state.data[0].id
                                                                    })
                                                                    let userExist = await axios(`http://localhost:3001/optionUser/${userDB.user.email}`)
                                                                    dispatch(loadUser(userExist.data))
                                                                } catch (error) {
                                                                    console.log(error)
                                                                } */
                                                            }}>
                                                                Enable
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                href="#"
                                                                color="lightBlue"
                                                                ripple="light"
                                                                onClick={async (e) => {
                                                                    e.preventDefault()
                                                                    /* try {
                                                                        let state = await axios("http://localhost:3001/status")
                                                                        await axios.put(`http://localhost:3001/Properties/${property.id}`, {
                                                                            idstatusId: state.data[1].id
                                                                        })
                                                                        let userExist = await axios(`http://localhost:3001/optionUser/${userDB.user.email}`)
                                                                        dispatch(loadUser(userExist.data))
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                    } */
                                                                }}
                                                            >
                                                                Pause
                                                            </DropdownItem>
                                                            <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                                                e.preventDefault()
                                                                /* try {
                                                                    let state = await axios("http://localhost:3001/status")
                                                                    console.log(state.data[2].id)
                                                                    await axios.put(`http://localhost:3001/Properties/${property.id}`, {
                                                                        idstatusId: state.data[2].id
                                                                    })
                                                                    console.log(userDB)
                                                                    let userExist = await axios(`http://localhost:3001/optionUser/${userDB.user.email}`)
                                                                    dispatch(loadUser(userExist.data))
                                                                } catch (error) {
                                                                    console.log(error)
                                                                } */
                                                            }}>
                                                                Close
                                                            </DropdownItem>
                                                        </Dropdown>
                                                    </td>
                                                    {/* <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                    <Button
                                                        color="red"
                                                        buttonType="filled"
                                                        size="regular"
                                                        rounded={false}
                                                        block={false}
                                                        iconOnly={false}
                                                        ripple="light"
                                                        onClick={async (e) => {
                                                            e.preventDefault()
                                                            try {
                                                                if (selectedDayRange.from && selectedDayRange.to) {
                                                                    let newRange = await axios.post('http://localhost:3001/calendar', {
                                                                        "dates": selectedDayRange,
                                                                        "type": "seller",
                                                                        "userId": userDB.user.id
                                                                    })
                                                                    navigate("/logged/myprofile")
                                                                } else {
                                                                    setShowModal(true)
                                                                }
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td> */}
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )

}