import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../redux/actions';


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
    <div class="flex justify-center  h-1/2  ">
    <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">User Info</h1>
        <form action="/" method="post" onSubmit={handleSubmit}>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="first_name">First Name</label>
                <input class="border py-2 px-3 text-grey-800"
                type="text"
                name="firstName"
                id="firstName"
                value={values.firstName}
                onChange={(e) => handleChange(e)} />
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">Last Name</label>
                <input class="border py-2 px-3 text-grey-800"
                type="text"
                name="lastName"
                id="last_name"
                value={values.lastName}
                onChange={(e) => handleChange(e)}/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">NickName</label>
                <input class="border py-2 px-3 text-grey-800"
                type="text"
                name="nickName"
                id="nick_name"
                value={values.nickName}
                onChange={(e) => handleChange(e)}/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">Phone Number</label>
                <input class="border py-2 px-3 text-grey-800"
                type="text"
                name="phoneNumber"
                id="phone_number"
                value={values.phoneNumber}
                onChange={(e) => handleChange(e)}/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="country">Country</label>
                <input class="border py-2 px-3 text-grey-800"
                type="country"
                name="country"
                id="country"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="city">City</label>
                <input class="border py-2 px-3 text-grey-800"
                type="city" 
                name="city"
                id="city"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="Birthdate">Birthdate</label>
                <input class="border py-2 px-3 text-grey-800"
                type="Birthdate"
                name="dateBirth"
                id="Birthdate" 
                placeholder='##/##/####'
                value={values.dateBirth}
                onChange={(e) => handleChange(e)}
                />
            </div>
            <button class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Update Info</button>
            
        </form>
        </div>
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