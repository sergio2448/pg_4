import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { loadUser } from '../../redux/actions';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react"
import Nav from '../Nav'
import Steps from "./Steps"
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import houseBackground from "../../styles/images/house-back.jpg"
import { validate } from '../../validators/createValidator';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer';
let apiKey = ""
const changeCitys = async (country, set) => {
    try {
        let allCityes = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
            headers: {
                Authorization: 'Bearer ' + apiKey
            }
        })
        set(allCityes.data)
    } catch (error) {
        console.log(error)
    }
}



export default function Create() {

    let { id } = useParams();
    let navigate = useNavigate();
    const userDB = useSelector((state) => state.user);
    const [errors, setErrors] = React.useState({});
    const [citys, setCitys] = React.useState([])
    const [images, setImages] = React.useState(null)
    const [imagesDeleted, setImagesDeleted] = React.useState([])
    const [pages, setPages] = React.useState({
        page1: true,
        page2: false,
        page3: false,
        page4: false
    })
    const [countries, setCountries] = React.useState([]);
    const [currentStep, setCurrentStep] = React.useState(1)
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()
    const dispatch = useDispatch()
    const [newEstate, setNewEstate] = React.useState({
        sellerId: userDB.user.sellers[0] ? userDB.user.sellers[0].id : 0,
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
        axios.get('https://new-pg.herokuapp.com/Properties?id=' + id)
            .then((result) => result.data)
            .then(propertyEdit => {
                setNewEstate({
                    sellerId: userDB.user.sellers[0] ? userDB.user.sellers[0].id : 0,
                    lease: propertyEdit[0].lease,
                    cost: propertyEdit[0].cost,
                    m2: propertyEdit[0].m2,
                    country: propertyEdit[0].country,
                    state: propertyEdit[0].state,
                    city: propertyEdit[0].city,
                    photos: propertyEdit[0].photos,
                    address: propertyEdit[0].address,
                    cp: propertyEdit[0].cp,
                    features: propertyEdit[0].features,
                    propertyType: propertyEdit[0].propertyType,
                    description: propertyEdit[0].description,
                    longitude: propertyEdit[0].longitude,
                    latitude: propertyEdit[0].latitude
                })
                setImages(propertyEdit[0].photos)
                changeCitys(propertyEdit[0].country, setCitys)
                setImagesDeleted(propertyEdit[0].photos.map(elem => elem.photos))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

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
    console.log("Errors", Object.values(errors))
    const submit = async (event) => {
        event.preventDefault()
        let idEstateCreated
        if (Object.values(errors).length === 0) {
            if (id) {
                try {
                    let estateCreated = await axios.put(`https://new-pg.herokuapp.com/Properties/${id}?override=true`, newEstate)
                    console.log(estateCreated)
                    if (imagesDeleted) {
                        console.log(imagesDeleted)
                        await axios.put(`https://new-pg.herokuapp.com/Properties/images/${id}`, {
                            "listImage": imagesDeleted
                        })
                    }
                    if (!images[0].photos) {
                        const f = new FormData()
                        for (let i = 0; i < images.length; i++) {
                            f.append("files", images[i])
                        }
                        const result = await axios.post(`https://new-pg.herokuapp.com/Properties/img/${id}`, f, { headers: { 'Content-Type': 'multipart/form-data' } })
                    }
                    let userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${user.email}`)
                    dispatch(loadUser(userExist.data))
                } catch (error) {
                    console.log(error.message)
                }
            } else {
                try {
                    let estateCreated = await axios.post(`https://new-pg.herokuapp.com/Properties/pro`, newEstate)
                    idEstateCreated = estateCreated.data.id
                    const f = new FormData()
                    for (let i = 0; i < images.length; i++) {
                        f.append("files", images[i])
                    }
                    const result = await axios.post(`https://new-pg.herokuapp.com/Properties/img/${idEstateCreated}`, f, { headers: { 'Content-Type': 'multipart/form-data' } })
                    let userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${user.email}`)
                    dispatch(loadUser(userExist.data))
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            console.log("ERROR DE CREACION")
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
        if (newEstate.features.length !== 0) {
            setErrors(validate({
                ...newEstate
            }))
        }
        document.querySelector("#quantity").value = ""
        document.querySelector("#features").value = "~"
    }


    return (
        isAuthenticated ?
        <div >
        <div className='z-1 absolute bg-black w-full h-full shadow-black shadow-2xl '>
          <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
        </div>
        
        <Nav />
        <div className="relative flex flex-col items-center mt-12 ">
            <h3 className="text-5xl font-bold	text-white font-Poppins ">Create Your Publication</h3>
            </div>
                {
                    userDB.user.sellers[0] ? <div className=' mt-16 relative z-10 mb-8'>
                        <div className="mt-10 sm:mt-0">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1 mx-4 bg-[#00000099] p-3 mt-16 h-16 rounded-sm">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-whiteProject sm:text-2xl">Property details</h3>
                                        <p className="mt-1 text-sm text-gray-400">Use the exact or declared data of your property.</p>
                                    </div>
                                </div>
                                <div className="mt-5 mb-12 md:mt-0 md:col-span-2 mx-4">
                                    <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />
                                    <form>
                                        <div className="shadow overflow-hidden sm:rounded-xl">
                                            {
                                                pages.page1 ? <Page1 setCitys={setCitys} handleSubmit={handleSubmit} countries={countries} citys={citys} setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} errors={errors} newEstate={newEstate} /> : ""
                                            }
                                            {
                                                pages.page2 ? <Page2 handleFeatures={handleFeatures} setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} errors={errors} newEstate={newEstate} handleSubmit={handleSubmit} /> : ""
                                            }
                                            {
                                                pages.page3 ? <Page3 newEstate={newEstate} setImages={setImages} imagesDeleted={imagesDeleted} setImagesDeleted={setImagesDeleted} setCurrentStep={setCurrentStep} setPages={setPages} pages={pages} errors={errors} handleSubmit={handleSubmit} images={images} /> : ""
                                            }
                                            {
                                                pages.page4 ? <Page4 setCurrentStep={setCurrentStep} errorsForm={errors} submit={submit} setPages={setPages} pages={pages} newEstate={newEstate} setNewEstate={setNewEstate} errors={errors} /> : ""
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                        : <div className='relative z-10 w-1/2 flex justify-center items-center my-32 mx-auto bg-[#00000090] p-8'>
                            <p className='text-4xl text-white'>
                                You are not a seller, if you want to change your account type, go to the top menu and select my profile.
                            </p>
                        </div>
                }
                
                <Footer />
            

            </div>
            : loginWithRedirect()
    )
}
