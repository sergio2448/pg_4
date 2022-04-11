import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';



function FormInfo() {

    us


  return (
    <div class="flex justify-center  h-1/2  ">
    <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">User Info</h1>
        <form action="/" method="post">
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="first_name">First Name</label>
                <input class="border py-2 px-3 text-grey-800" type="text" name="first_name" id="first_name" />
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="last_name">Last Name</label>
                <input class="border py-2 px-3 text-grey-800" type="text" name="last_name" id="last_name"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="country">Country</label>
                <input class="border py-2 px-3 text-grey-800" type="country" name="country" id="country"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="city">City</label>
                <input class="border py-2 px-3 text-grey-800" type="city" name="city" id="city"/>
            </div>
            <div class="flex flex-col mb-4">
                <label class="mb-2 font-bold text-lg text-gray-900" for="Birthdate">Birthdate</label>
                <input class="border py-2 px-3 text-grey-800" type="Birthdate" name="Birthdate" id="Birthdate" placeholder='##/##/####'/>
            </div>
            <button class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Update Info</button>
            
        </form>
        </div>
        </div>
  )
}

export default FormInfo


