import React from 'react'
import Nav from '../Nav'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import house from "../../styles/images/house2.jpg"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ0d2s5MDdAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiVjRtUlV3UHBmVEJHMnJMQWVPMW9WRHphYm9ZM0RCQjAzbDA1cXhLcGFDMl9mTjhsaGdUVFFvbERpMnBDaFZYNlZibyJ9LCJleHAiOjE2NDg5MzAxNDJ9.Row48K-egUv-RJvTbIJr_FRdd4F4NWdtheV3sp03sIE"

const changeCitys = async (country, set) => {
    let allCityes = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    })
    set(allCityes.data)
}

export default function Create() {

    const dispatch = useDispatch();
    const [errors, setErrors] = React.useState({});
    const [citys, setCitys] = React.useState([])
    const [countries, setCountries] = React.useState([]);
    const [newEstate, setNewEstate] = React.useState({
        lease: '',
        cost: '',
        m2: '',
        country: '',
        address: '',
        region: '',
        city: '',
        cp: '',
        img: ''
    });

    React.useEffect(async () => {
        try {
            let allCountries = await axios.get("https://www.universal-tutorial.com/api/countries/", {
                headers: {
                    Authorization: 'Bearer ' + apiKey
                }
            })
            setCountries(allCountries.data)
        } catch (error) {
            console.log(error)
        }
    }, []);

    const handleSubmit = (event) => {
        if ([event.target.name] == "country") {
            changeCitys(event.target.value, setCitys)
        }
        setNewEstate({
            ...newEstate,
            [event.target.name]: event.target.value
        })
        /* setErrors(validate({
            ...newPokemon,
            [event.target.name]: event.target.value
        })) */
    };

    const onSubmit = (event) => {
        event.preventDefault()
        /* if(Object.values(errors).length === 0) {
            console.log(newEstate)
            dispatch(createEstate(newEstate));
        } else {
            console.log("ERROR")
        } */
        console.log(newEstate)
    };

    return (
        <div className='relative'>
            <img className='absolute z-0 h-screen w-screen' src={house} alt="" />
            <div className='bg-[#00000060] h-16 relative z-20'>
                <Nav />
            </div>
            <div className='mt-24 relative z-10 mb-20'>
                <div className="mt-10 sm:mt-0 mb-24">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1 mx-4">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-whiteProject sm:text-2xl">Datos Del Inmueble</h3>
                                <p className="mt-1 text-sm text-lightProject">Use a permanent address where you can receive mail.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2 mx-4">
                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-xl">
                                    <div className="px-4 py-5 sm:p-6 bg-stone-800">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="lease" className="block text-sm font-medium">
                                                    Tipo de publicacion
                                                </label>
                                                <select
                                                    id="lease"
                                                    name="lease"
                                                    autoComplete="lease-name"
                                                    className="text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                >
                                                    <option hidden>~</option>
                                                    <option>Venta</option>
                                                    <option>Alquiler</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="cost" className="block text-sm font-medium">
                                                    Costo En Dolares
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cost"
                                                    id="cost"
                                                    autoComplete="cost"
                                                    className="text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="m2" className="block text-sm font-medium">
                                                    Metros Cuadrados
                                                </label>
                                                <input
                                                    type="number"
                                                    name="m2"
                                                    id="m2"
                                                    autoComplete="family-name"
                                                    className="text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="country" className="block text-sm font-medium">
                                                    Pais
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleSubmit}
                                                >
                                                    <option hidden>~</option>
                                                    {
                                                        countries.map(elem => {
                                                            return (<option key={elem.country_name}>{elem.country_name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="region" className="block text-sm font-medium">
                                                    Estado/Provincia
                                                </label>
                                                <select
                                                    id="region"
                                                    name="region"
                                                    autoComplete="region"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={handleSubmit}
                                                >
                                                    {
                                                        citys.map(elem => {
                                                            return (<option key={elem.state_name}>{elem.state_name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="address" className="block text-sm font-medium ">
                                                    Direccion
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    autoComplete="address"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label htmlFor="city" className="block text-sm font-medium">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    autoComplete="city"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="cp" className="block text-sm font-medium">
                                                    Codigo Postal
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cp"
                                                    id="cp"
                                                    autoComplete="cp"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                                <label htmlFor="description" className="block text-sm font-medium">
                                                    Descripcion
                                                </label>
                                                <textarea
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    autoComplete="description"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-14 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>
                                            {/* <div className="col-span-6 sm:col-span-3 lg:col-span-4">
                                                <label htmlFor="img" className="block text-sm font-medium">
                                                    Subi tus fotos
                                                </label>
                                                <input
                                                    type="file"
                                                    name="img"
                                                    id="img"
                                                    autoComplete="postal-code"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit} 
                                                />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-center sm:px-6 bg-stone-800">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Publicar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
