import React from "react";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

export default function DropDown() {

    const { user, isAuthenticated, isLoading, logout } = useAuth0()
    const navigate = useNavigate()


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
                <DropdownLink>
                    <div className="flex justify-center">
                        <div className="form-check form-switch">
                            <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-black bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                        </div>
                    </div>
                </DropdownLink>

                <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                    navigate("/logged")
                    console.log("Action")
                }}>
                    My profile
                </DropdownItem>


                <DropdownLink
                    color="lightBlue"
                    ripple="light"
                    size="lg"
                    onClick={(e) => {
                        navigate("/Favorites")
                    }}
                >
                    Favorites
                </DropdownLink>
                <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                    navigate("/listProperties")
                }}>
                    Publications
                </DropdownItem>
                <DropdownLink color="lightBlue" ripple="light" size="lg" onClick={() => {
                    logout({ returnTo: window.location.origin })
                }}>
                    LogOut
                </DropdownLink>
            </Dropdown>
        </div>
    )
}