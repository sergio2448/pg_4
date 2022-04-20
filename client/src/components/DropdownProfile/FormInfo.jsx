import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../redux/actions';
import Nav from '../Nav';
import houseBackground from '../../styles/images/house-back.jpg'
import Footer from '../Footer';

function FormInfo() {
    const user = useSelector((state)=>state.user)

    const dispatch = useDispatch();
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        nickName: '',
        phoneNumber: '',
        email: user.user.email,
        dateBirth:'',
        role:user.user.rolName,

        
    })
    //ACTUALIZA INFORMACION Y  REESTABLECE LOS LUGARES EN BLANCO
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await dispatch(updateInfo(values))
            
            alert('Information Update!');

        } catch (err) {
            console.log(err.message)
            alert('We could not update your information. Please try again.');

        }
        setValues({
            firstName: '',
        lastName: '',
        nickName: '',
        phoneNumber: '',
        dateBirth:'',
        
        })

    }
     //SETEA LOS VALORES DE LOS INPUT EN EL ESTADO VALUES
     function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


  return (
    <div>
    <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
      <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
    </div>
    <div className='z-2 absolute  w-full h-screen shadow-inner shadow-black'></div>
    <Nav />
    <div class="border-solid     border-4 bg-sky-500/80 my-16 w-1/2 h-1/3  font-Monserrat font-bold	  rounded-md p-4 relative ml-96 h-3/4">
    
    
        <h1 class="block w-full text-center text-4xl font-black mb-16   ">User Info</h1>
        <form action="/" method="post" onSubmit={handleSubmit} className="flex flex-row justify-evenly   ">
            <div className='   '>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="first_name">First Name</label>
                <input class="border py-2 px-3 text-grey-800  rounded-md "
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={(e) => handleChange(e)} />
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">Last Name</label>
                <input class="border py-2 px-3 text-grey-800 rounded-md"
                type="text"
                name="lastName"
                id="last_name"
                value={values.lastName}
                onChange={(e) => handleChange(e)}/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">NickName</label>
                <input class="border py-2 px-3 text-grey-800 rounded-md"
                type="text"
                name="nickName"
                id="nick_name"
                value={values.nickName}
                onChange={(e) => handleChange(e)}/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">Phone Number</label>
                <input class="border py-2 px-3 text-grey-800 rounded-md"
                type="text"
                name="phoneNumber"
                id="phone_number"
                value={values.phoneNumber}
                onChange={(e) => handleChange(e)}/>
            </div>
            </div>
            <div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="country">Country</label>
                <input class="border py-2 px-3 text-grey-800 rounded-md"
                type="country"
                name="country"
                id="country"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="city">City</label>
                <input class="border py-2 px-3 text-grey-800 rounded-md"
                type="city" 
                name="city"
                id="city"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="Birthdate">Birthdate</label>
                <input class="border py-2 px-3 text-grey-800 rounded-md"
                type="Birthdate"
                name="dateBirth"
                id="Birthdate" 
                placeholder='##/##/####'
                value={values.dateBirth}
                onChange={(e) => handleChange(e)}
                />
            </div>
            <button class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded mt-12" type="submit">Update Info</button>
                </div>
            
        </form>
        </div>

        <Footer/>
        </div>
  )
}

export default FormInfo


// firstName: '',
//         lastName: '',
//         nickName: '',
//         phoneNumber: '',
//         dateBirth: '',
//         role: user.user.role.rolName,
//         image:user.user.image,
//         email: user.user.email,