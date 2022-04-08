import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react"
import Nav from '../Nav'
import Steps from "./Steps"
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import house from "../../styles/images/house8.jpg"
import { validate } from '../../validators/createValidator';
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

    const [errors, setErrors] = React.useState({});
    let navigate = useNavigate();

    const [citys, setCitys] = React.useState([])
    const [images, setImages] = React.useState(null)
    const [pages, setPages] = React.useState({
        page1: true,
        page2: false,
        page3: false,
        page4: false
    })
    const [countries, setCountries] = React.useState([]);
    const [currentStep, setCurrentStep] = React.useState(1)
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()
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
            navigate("/")
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
        setErrors(validate({
            ...newEstate,
            [event.target.name]: event.target.value
        }))
        console.log(errors)
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
        if(newEstate.features.length !== 0) {
            setErrors(validate({
                ...newEstate
            }))
        }
    }

    /* console.log(user) */

    return (
        isAuthenticated ?
            <div className='h-120'>
                <img className='absolute z-0 h-120 w-screen' src={house} alt="" />
                <div className='shadow-[-1px_16px_30px_-5px_rgba(0,0,0,1)] h-16 relative z-20 bg-[#00000099]'>
                    <Nav />
                </div>
                


                <div className=' mt-16 relative z-10 mb-20'>
                    <div className="mt-10 sm:mt-0 mb-24">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1 mx-4 bg-[#00000099] p-3 mt-16 h-16 rounded-sm">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-whiteProject sm:text-2xl">Property details</h3>
                                    <p className="mt-1 text-sm text-lightProject">Use the exact or declared data of your property.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2 mx-4">
                                <Steps currentStep={currentStep} setCurrentStep={setCurrentStep}/>
                                <form action="" method="POST" onSubmit={onSubmit}>
                                    <div className="shadow overflow-hidden sm:rounded-xl">
                                        {
                                            pages.page1 ? <Page1 handleSubmit={handleSubmit} countries={countries} citys={citys} setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} errors={errors} newEstate={newEstate}/> : ""
                                        }
                                        {
                                            pages.page2 ? <Page2 handleFeatures={handleFeatures} setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} errors={errors} newEstate={newEstate} handleSubmit={handleSubmit}/> : ""
                                        }
                                        {
                                            pages.page3 ? <Page3 setImages={setImages} setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} errors={errors} handleSubmit={handleSubmit}/> : ""
                                        }
                                        {
                                            pages.page4 ? <Page4 setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} newEstate={newEstate} setNewEstate={setNewEstate} errors={errors}/> : ""
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : loginWithRedirect()
    )


    /* sellerId */
}
