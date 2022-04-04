import React from 'react'
import Nav from '../Nav'
import axios from 'axios'
import house from "../../styles/images/house2.jpg"
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
let apiKey = ""


const changeCitys = async (country, set) => {

    let allCityes = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
        headers: {
            Authorization: 'Bearer ' + apiKey
        }
    })
    set(allCityes.data)
}

export default function Create() {

    /* const [errors, setErrors] = React.useState({}); */
    const [citys, setCitys] = React.useState([])
    const [images, setImages] = React.useState(null)
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
            let resultKeyApi = await axios.get(`https://www.universal-tutorial.com/api/getaccesstoken`, {
                headers: {
                    "Accept": "application/json",
                    "api-token": "V4mRUwPpfTBG2rLAeO1oVDzaboY3DBB03l05qxKpaC2_fN8lhgTTQolDi2pChVX6Vbo",
                    "user-email": "twk907@gmail.com"
                }
            })
            apiKey = resultKeyApi.data.auth_token
            let allCountries = await axios.get("https://www.universal-tutorial.com/api/countries/", {
                headers: {
                    Authorization: 'Bearer ' + apiKey
                }
            })
            setCountries(allCountries.data)
        } catch (error) {
            console.log(error.message)
        }
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault()
        let idEstateCreated
        /* if(Object.values(errors).length === 0) {
            console.log(newEstate)
            dispatch(createEstate(newEstate));
        } else {
            console.log("ERROR")
        } */
        /* dispatch(createEstate(newEstate)); */
        try {
            let estateCreated = await axios.post(`http://localhost:3001/Properties/pro`, newEstate)
            idEstateCreated = estateCreated.data.id
            const f = new FormData()
            for (let i = 0; i < images.length; i++) {
                f.append("files", images[i])
            }
            const result = await axios.post(`http://localhost:3001/Properties/img/${idEstateCreated}`, f, { headers: { 'Content-Type': 'multipart/form-data' } })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    };

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
        document.querySelector("#quantity").value = ""
    }

    return (
        <div className='h-120'>
            <img className='absolute z-0 h-120 w-screen' src={house} alt="" />
            <div className='bg-[#00000060] h-16 relative z-20'>
                <Nav />
            </div>
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
                            <form action="" method="POST" onSubmit={onSubmit}>
                                <div className="shadow overflow-hidden sm:rounded-xl">
                                    {
                                        pages.page1 ? <Page1 handleSubmit={handleSubmit} countries={countries} citys={citys} /> : ""

                                    }
                                    {
                                        pages.page2 ? <Page2 handleFeatures={handleFeatures} /> : ""
                                    }
                                    {
                                        pages.page3 ? <Page3 setImages={setImages} /> : ""
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
