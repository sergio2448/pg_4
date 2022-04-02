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
    const [pages, setPages] = React.useState({
        page1: true,
        page2: true,
        page3: true
    })
    const [countries, setCountries] = React.useState([]);
    const [newEstate, setNewEstate] = React.useState({
        lease: '',
        cost: '',
        m2: '',
        country: '',
        state: '',
        city: '',
        address: '',
        cp: '',
        features: [],
        propertyType: ''
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

    const handleFeatures = (event) => {
        event.preventDefault()
        let option = document.querySelector("#features").value
        let quantity = document.querySelector("#quantity").value
        let newFeature = {
            name: option,
            value: quantity
        }
        let features = newEstate.features
        features.push(newFeature)
        setNewEstate({
            ...newEstate,
            features: features
        })
    }

    return (
        <div className='h-screen'>
            <img className='absolute z-0 h-screen w-screen' src={house} alt="" />
            <div className='bg-[#00000060] h-16 relative z-20'>
                <Nav />
            </div>

            {/* state = {
            page1 = false,   //Si esta en true renderiza si no no
            page2 = false,
            page3 = false,
        }


        onclick  -----> setState

            <div onClick={}>
                <div>Step1</div>
                <div>Contein2</div>
            </div>
            <div>
            <div>
                <div>Step1</div>
                <div>Contein2</div>
            </div> */}

            <div className='mt-24 relative z-10 mb-20'>
                <div className="mt-10 sm:mt-0 mb-24">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1 mx-4 bg-[#00000060] h-16 rounded-sm">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-whiteProject sm:text-2xl">Datos Del Inmueble</h3>
                                <p className="mt-1 text-sm text-lightProject">Use a permanent address where you can receive mail.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2 mx-4">
                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-xl">
                                {
                                    pages.page1 ?
                                            <div className="px-4 py-5 sm:p-6 bg-[#29252480]">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-2">
                                                        <label htmlFor="lease" className="block text-sm text-white font-medium">
                                                            Tipo de publicacion
                                                        </label>
                                                        <select
                                                            id="lease"
                                                            name="lease"
                                                            autoComplete="lease-name"
                                                            className="bg-[#f8fafc95] text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        >
                                                            <option hidden>~</option>
                                                            <option>Venta</option>
                                                            <option>Alquiler</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-2">
                                                        <label htmlFor="cost" className="block text-white text-sm font-medium">
                                                            Costo En Dolares
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="cost"
                                                            id="cost"
                                                            autoComplete="cost"
                                                            className="bg-[#f8fafc95] text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-2">
                                                        <label htmlFor="m2" className="block text-white text-sm font-medium">
                                                            Metros Cuadrados
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="m2"
                                                            id="m2"
                                                            autoComplete="family-name"
                                                            className="bg-[#f8fafc95] text-center mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-4">
                                                        <label htmlFor="country" className="block text-white text-sm font-medium">
                                                            Pais
                                                        </label>
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="country-name"
                                                            className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                                        <label htmlFor="state" className="block text-white text-sm font-medium">
                                                            Estado/Provincia
                                                        </label>
                                                        <select
                                                            id="state"
                                                            name="state"
                                                            autoComplete="state"
                                                            className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                                        <label htmlFor="address" className="block text-white text-sm font-medium ">
                                                            Direccion
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            id="address"
                                                            autoComplete="address"
                                                            className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                        <label htmlFor="city" className="block text-white text-sm font-medium">
                                                            City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            autoComplete="city"
                                                            className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label htmlFor="cp" className="block text-white text-sm font-medium">
                                                            Codigo Postal
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cp"
                                                            id="cp"
                                                            autoComplete="cp"
                                                            className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        />
                                                    </div>
                                                    
                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label htmlFor="propertyType" className="block text-white text-sm font-medium">
                                                            Property Type
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="propertyType"
                                                            id="propertyType"
                                                            autoComplete="propertyType"
                                                            className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            onChange={handleSubmit}
                                                        />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                                        <label htmlFor="description" className="block text-white text-sm font-medium">
                                                            Descripcion
                                                        </label>
                                                        <textarea
                                                            type="text"
                                                            name="description"
                                                            id="description"
                                                            autoComplete="description"
                                                            className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-14 shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                            
                                        </div> : ""
                                    
                                }
                                {
                                    pages.page2 ?
                                        <div className="px-4 py-5 sm:p-6 bg-[#29252480]">
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="features" className="block text-white text-sm font-medium">
                                                    Detalles
                                                </label>
                                                <select
                                                    id="features"
                                                    name="features"
                                                    autoComplete="features"
                                                    className="bg-[#f8fafc95] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option>rooms</option>
                                                    <option>bathrooms</option>
                                                    <option>Piscina</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label htmlFor="quantity" className="block text-white text-sm font-medium">
                                                    Cantidad
                                                </label>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    id="quantity"
                                                    autoComplete="quantity"
                                                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <button
                                                onClick={handleFeatures}
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                        : ""
                                }
                                {
                                    pages.page3 ?
                                        <div className="px-4 py-5 sm:p-6 bg-[#29252480]">
                                            {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="img1" className="block text-white text-sm font-medium">
                                                    Imagen Principal
                                                </label>
                                                <input
                                                    type="file"
                                                    name="img1"
                                                    id="img1"
                                                    autoComplete="img1"
                                                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="img2" className="block text-white text-sm font-medium">
                                                    Imagen Secundaria
                                                </label>
                                                <input
                                                    type="file"
                                                    name="img2"
                                                    id="img2"
                                                    autoComplete="img2"
                                                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="img3" className="block text-white text-sm font-medium">
                                                    Quieres mostrar mas??
                                                </label>
                                                <input
                                                    type="file"
                                                    name="img3"
                                                    id="img3"
                                                    autoComplete="img3"
                                                    className="bg-[#f8fafc95] mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={handleSubmit}
                                                    multiple
                                                />
                                            </div> */}
                                            <div className="px-4 py-3 text-center sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Publicar
                                                </button>
                                            </div>
                                        </div>
                                        : ""
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
