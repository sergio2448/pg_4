import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import DropDown from "../Auth0/DropDown"

export const Profile = () => {

    const { isAuthenticated, isLoading } = useAuth0()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        isAuthenticated && (
            <div className="flex justify-end mr-4">
                <DropDown />
            </div>
        )
    )
}