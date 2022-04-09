import React from "react";
import  { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
    const { loginWithRedirect, user } = useAuth0();

    return <button className="text-base mr-5 transition ease-in-out duration-300 hover:border-b-sky-500 border-b-transparent hover:border-b-2 pt-1" onClick={() => loginWithRedirect()}>Log in or Sign up</button>
};
