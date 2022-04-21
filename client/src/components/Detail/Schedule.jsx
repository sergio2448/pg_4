import React from "react";
import Nav from "../Nav";
import houseBackground from '../../styles/images/house-back.jpg';
import axios from "axios"
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import { useSelector } from "react-redux";
import Footer from "../Footer";


export default function Schedule() {

    const [quotes, setQuotes] = React.useState(null)
    const userDB = useSelector(state => state.user)
    const [render, setRender] = React.useState(0)
    const [property, setProperties] = React.useState(null)

    console.log(userDB.user.sellers[0].id)
    console.log(userDB.user.buyers[0].id)
    React.useEffect(async () => {
        try {
            let quot = await axios.put(`http://localhost:3001/agenda`, {
                idSeller: userDB.user?.sellers[0]?.id,
                idBuyer: userDB.user?.buyers[0]?.id
            })
            setQuotes(quot.data)
        } catch (error) {
            console.log(error)
        }
    }, [render])

    async function updateProperty(id) {
        let json = await axios.post('http://localhost:3001/Properties?id=' + id);
        setProperties(json.data)
    }

    console.log(quotes)

    return (
        <div className="w-full h-screen bg-stone-200/75 ">
            <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
                <img className='opacity-60 z-2 object-cover w-full h-full blur-sm' src={houseBackground} />
            </div>
            
                <div className=' relative z-20 '>
                    <Nav />
                
            </div>
            <div className="relative flex flex-col items-center mt-20 ">
            <h3 className="text-5xl font-bold	text-white font-Poppins ">User Quotes</h3>
            </div>
            <div className="flex flex-col items-center mb-16">
            <div className="  mb-6  font-black  w-4/6  p-12 relative items-center ">
                <div className="flex flex-col relative ">
                    
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center mt-8">
                        <div className="py-2 inline-block w-11/12 sm:px-6 lg:px-8 text-white text-xl">
                            Whit seller
                            <div className="overflow-hidden rounded-2xl shadow-2xl border">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-stone-900 boder-gray-900">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Date
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Time
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Place
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Actual state
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Confirm/Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <div className="bg-gray-300/80">
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
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                        {quote.place}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                        {quote.status}
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
                                                            {
                                                                quote.status !== "Approved" && <DropdownItem color="lightBlue" ripple="light" onClick={async (e) => {
                                                                    e.preventDefault()
                                                                    try {
                                                                        let state = await axios.put("http://localhost:3001/agenda/status", {
                                                                            id: quote.id,
                                                                            status: "Approved"
                                                                        })
                                                                        setRender(render + 1)
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                    }
                                                                }}>
                                                                    Approve
                                                                </DropdownItem>
                                                            }
                                                            
                                                            {
                                                                quote.status !== "Cancelled" && <DropdownItem
                                                                href="#"
                                                                color="lightBlue"
                                                                ripple="light"
                                                                onClick={async (e) => {
                                                                    e.preventDefault()
                                                                    try {
                                                                        let state = await axios.put("http://localhost:3001/agenda/status", {
                                                                            id: quote.id,
                                                                            status: "Cancelled"
                                                                        })
                                                                        setRender(render + 1)
                                                                    } catch (error) {
                                                                        console.log(error)
                                                                    }
                                                                }}
                                                            >
                                                                Cancel
                                                                </DropdownItem>
                                                            }
                                                            
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            )
                                        }</div>
                                    </tbody>
                                </table>
                                {
                                    !quotes && <div className="text-center my-8 ">
                                        <p className="font-Poppins text-white text-2xl italic">You don't have appointments as a seller.</p>
                                    </div>
                                }
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="flex flex-col relative mt-16">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center">
                        <div className="py-2 inline-block w-11/12 sm:px-6 lg:px-8 text-white text-xl">
                            Whit buyer
                            <div className="overflow-hidden rounded-2xl shadow-2xl border">
                                <table className="min-w-full text-center border-white border-solid ">
                                    <thead className="border-b bg-stone-900 boder-gray-900">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Date
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Time
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Place
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                                Actual State
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
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                        {quote.place}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                        {quote.status}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                        
                                                        Contact: {quote.status === "Approved" ? userDB.user.email : "2644576693"
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                {
                                    !quotes && <div className="text-center my-8 ">
                                        <p className="font-Poppins text-white text-2xl italic">You don't have appointments as a buyer.</p>
                                    </div>
                                }
                            </div>
                        </div>   
                    </div></div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )

}