import React from "react";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import  { useAuth0 } from '@auth0/auth0-react';

export default function DropDown() {

    const {user, isAuthenticated, isLoading, logout} =  useAuth0()

    return (
        <div className="relative">
            <div className="absolute -left-4 -top-1 z-30 flex justify-center items-center overflow-hidden h-12 w-12">
                <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={user.picture}
                    alt="user"
                />
            </div>
            <Dropdown
                color="lightBlue"
                placement="bottom-end"
                buttonText={user.name}
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                ripple="light"
                img={user.picture}
                >
                    
                <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={(e) => {
                    e.preventDefault()
                    console.log("Action")
                }}>
                    My profile
                </DropdownItem>
                <DropdownLink
                    href="#"
                    color="lightBlue"
                    ripple="light"
                    size="lg"
                    onClick={(e) => {
                        e.preventDefault()
                    }}
                >
                    Favorites
                </DropdownLink>
                <DropdownItem color="lightBlue" ripple="light" size="lg">
                    Publications
                </DropdownItem>
                <DropdownLink color="lightBlue" ripple="light" size="lg" onClick={() => {
                    logout({returnTo: window.location.origin})
                }}>
                    LogOut
                </DropdownLink>
            </Dropdown>
        </div>
    )
}