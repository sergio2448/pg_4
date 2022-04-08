import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import DropDown from "../Auth0/DropDown"

export const Profile = () => {

    const { isAuthenticated, isLoading, user} = useAuth0()

    if (isLoading) {
        return <div>Loading...</div>
    }

   
    return (
        isAuthenticated && (
            <div className="flex relative justify-end mr-4">
                {/* <div className="flex justify-center items-center overflow-hidden h-12 w-12">
                    <img
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src={user.picture}
                        alt="user"
                    />
                </div> */}
                <DropDown />
            </div>
        )
    )
}