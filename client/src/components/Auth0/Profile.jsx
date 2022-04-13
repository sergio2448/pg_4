import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import DropDown from "../Auth0/DropDown"
import axios from "axios";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { useDispatch } from 'react-redux';
import { loadUser } from "../../redux/actions";

export const Profile = () => {

    const [userLoged, setUserLoged] = React.useState("")
    const [showModal, setShowModal] = React.useState(true);
    const { isAuthenticated, isLoading, user} = useAuth0();
    const dispatch = useDispatch();

    if (isLoading) {
        return <div>Loading...</div>
    }

    React.useEffect(async () => {
        try {
            let userExist = await axios(`http://localhost:3001/optionUser/${user.email}`)
            setUserLoged(userExist.data)
            if(userExist.data.result === "Existente") {
                dispatch(loadUser(userExist.data))
            }
        } catch (error) {
            console.log(error)
        }
    }, [user])


    const userSubmit = async () => {
        let newUser = await axios.post(`http://localhost:3001/optionUser`, {
            "firstName": user.given_name,
            "lastName": user.family_name,
            "nickName": user.nickname,
            "email": user.email,
            "image":user.picture,
        })
        let userExist = await axios(`http://localhost:3001/optionUser/${user.email}`)
        dispatch(loadUser(userExist.data))
        setShowModal(false)
        const notificationUser={
            userid:userExist.data.user.id
        }
        await axios.post(`http://localhost:3001/send-email/welcome`,notificationUser)
    }
   
    return (
        isAuthenticated && (
            <div className="flex relative justify-end mr-4">
                
                

                {
                    userLoged.result === "Sin Registros" ? <Modal size="sm" active={showModal} toggler={() => {
                        userSubmit()
                        setShowModal(false)
                        }} >
                        <ModalHeader toggler={() => {
                            userSubmit()
                            setShowModal(false)
                        }} >
                            Welcome
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-base leading-relaxed text-gray-600 font-normal">
                            Welcome! Keep in mind that you start as a buyer, if you want to change roles, go to...Welcome! Keep in mind that you start as a buyer, if you want to change roles, go to...
                            </p>
                        </ModalBody>
                            
                    </Modal>
                 : ""
                }

                <DropDown />
            </div>
        )
    )
}