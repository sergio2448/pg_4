import React from "react";
import  { useAuth0 } from '@auth0/auth0-react';

export const Profile = () => {

    const {user, isAuthenticated, isLoading } =  useAuth0()

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    )
}

{/* <div className="flex px-8 py-6 items-center">
        <Avatar image="https://gustui.s3.amazonaws.com/avatar.png" />
        <div class="flex-1 ml-4">
          <p className="font-medium leading-none">Cesar Rome</p>
          <a
            href="#"
            className="no-underline text-xs text-gray-300 leading-none"
          >
            Edit Profile
          </a>
        </div> */}