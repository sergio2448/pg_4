import React from "react";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTypeUser } from '../../redux/actions'

export default function DropDown() {

    const { user, isAuthenticated, isLoading, logout } = useAuth0()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const typeUser = useSelector(state => state.typeUser)
    const userDB = useSelector(state => state.user)

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
                {
                    userDB.user?.role?.rolName === "admin" ?
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/cardad")
                        }}>
                            Statistics
                        </DropdownItem>
                        : <DropdownItem>

                            <div className="flex justify-between w-32">
                                <span className="select-none">Buyer</span>
                                <div className="flex justify-center form-check form-switch pl-0">

                                    {
                                        typeUser === "seller" ?
                                            <input className="form-check-input appearance-none w-9 rounded-full h-5 bg-black bg-no-repeat bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" defaultChecked onClick={() => {
                                                if (typeUser === "buyer") {
                                                    dispatch(updateTypeUser("seller"))
                                                }
                                                if (typeUser === "seller") {
                                                    dispatch(updateTypeUser("buyer"))
                                                }
                                            }}
                                            />
                                            : <input className="form-check-input appearance-none w-9 rounded-full h-5 bg-black bg-no-repeat bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" onClick={() => {
                                                if (typeUser === "buyer") {
                                                    dispatch(updateTypeUser("seller"))
                                                }
                                                if (typeUser === "seller") {
                                                    dispatch(updateTypeUser("buyer"))
                                                }
                                            }}
                                            />
                                    }

                                </div>
                                <span className="select-none">Seller</span>
                            </div>
                        </DropdownItem>
                }

                {
                   userDB.user?.role?.rolName === "admin" ? 
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/admin/users")
                        }}>
                            Users
                        </DropdownItem>
                    : <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                        navigate("/logged/myprofile")
                    }}>
                        My profile
                    </DropdownItem>
                }

                {
                   userDB.user?.role?.rolName === "admin" ? 
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/admin/features")
                        }}>
                            Features
                        </DropdownItem>
                    : ""
                }

                {
                    typeUser === "buyer" && userDB.user?.role?.rolName == "admin" ?
                        <DropdownItem
                            color="lightBlue"
                            ripple="light"
                            size="lg"
                            onClick={(e) => {
                                navigate("/logged/Publishing")
                            }}
                        >
                            Publishing
                        </DropdownItem>
                        : ""
                }
               {
                    typeUser === "buyer" ? <DropdownItem
                        color="lightBlue"
                        ripple="light"
                        size="lg"
                        onClick={(e) => {
                            navigate("/logged/Favorites")
                        }}
                    >
                        Favorites
                    </DropdownItem>
                    : ""
                }
                {
                    typeUser === "seller" ?
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/listProperties")
                        }}>
                            Publications
                        </DropdownItem>
                        : ""
                }
                {
                    typeUser === "seller" ?
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/estate/create")
                        }}>
                            Create
                        </DropdownItem>
                        : ""
                }

                {
                    typeUser === "seller" ?
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/logged/SellerCalendar")
                        }}>
                            Select your days
                        </DropdownItem>
                        : ""
                }

                {
                    userDB.user?.role?.rolName !== "admin" ? 
                        <DropdownItem color="lightBlue" ripple="light" size="lg" onClick={() => {
                            navigate("/logged/Quotes")
                        }}>
                            Quotes
                        </DropdownItem>
                        : ""
                }

                <DropdownLink color="lightBlue" ripple="light" size="lg" onClick={() => {
                    logout({returnTo: window.location.origin})
                }}>
                    LogOut
                </DropdownLink>
            </Dropdown>
        </div>
    )
}