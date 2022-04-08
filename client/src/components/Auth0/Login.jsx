import React from "react";
import  { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const login = async (e) => {
        e.preventDefault()
        loginWithRedirect()
        console.log("LOGIN")
    }

    React.useEffect(async () => {
        //Consultar a base de datos si existe
        //Si existe traer todo
        //Si no pues crealo
    }, [user])

    return <button className="text-base mr-5 transition ease-in-out duration-300 hover:border-b-sky-500 border-b-transparent hover:border-b-2 pt-1" onClick={(e)=> login(e)}>Log in or Sign up</button>
};
