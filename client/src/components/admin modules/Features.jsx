import React from 'react'
import Nav from '../Nav'
import houseBackground from '../../styles/images/house-back.jpg';
import { useSelector, useDispatch } from 'react-redux';
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import { getFeatureList } from '../../redux/actions';
import axios from 'axios';

export default function Features() {

    const features = useSelector(state => state.features)
    const userDB = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [newFeature, setNewFeature] = React.useState({
        nameFeature: null,
        isNumerable: null,
    })

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
            <div className='flex flex-col relative justify-around items-center'>
                <div className='flex justify-evenly items-center mt-20 mb-8 w-4/5'>
                    <p className='text-2xl font-Poppins text-white'>Add Features:</p>
                    <div>
                        <Input
                            type="text"
                            color="white"
                            size="sm"
                            outline={true}
                            placeholder="Name Feature"
                            style={
                                {
                                    color: "#FFFF"
                                }
                            }
                            value={newFeature.nameFeature}
                            onChange={(e) => setNewFeature({
                                ...newFeature,
                                nameFeature: e.target.value
                            })}
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <label htmlFor="numerable" className='text-white font-Poppins text-2xl mr-2 font-Poppins'>Is numerable?</label>
                        <div className="flex justify-center form-check form-switch pl-0"> 
                            <input className="form-check-input appearance-none w-14 rounded-full h-7 bg-black bg-no-repeat bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" defaultChecked onChange={() => {
                                setNewFeature({
                                    ...newFeature,
                                    isNumerable: !newFeature.isNumerable
                                })
                            }}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-20 mr-16'>
                    <Button
                        color="lightBlue"
                        buttonType="filled"
                        size="lg"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                        onClick={async e => {
                            e.preventDefault()
                            try {
                                if(newFeature.nameFeature) {
                                    let postFeature = await axios.post(`http://localhost:3001/admin/addFeature?userEmail=${userDB.user.email}`, newFeature)
                                    dispatch(getFeatureList())
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    >
                        Charge
                    </Button>
                </div>
                <div className='relative px-12 py-12 flex flex-wrap'>
                    {
                        features?.map(elem => 
                            <div className='mx-12 my-4 text-white text-3xl flex'>
                                <p className='capitalize mr-4 font-Poppins'>
                                    {elem.name}
                                </p>
                                <Button
                                    color="red"
                                    buttonType="filled"
                                    size="sm"
                                    rounded={false}
                                    block={false}
                                    iconOnly={false}
                                    ripple="dark"
                                    onClick={async e => {
                                        e.preventDefault()
                                        try {
                                            let deleteFeature = await axios.delete(`http://localhost:3001/admin/deleteFeature?userEmail=${userDB.user.email}&nameFeature=${elem.name}`)
                                            dispatch(getFeatureList())
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
