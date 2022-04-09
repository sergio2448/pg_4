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
                console.log("Existe o no??", userLoged)
                dispatch(loadUser(userExist.data))
            }
        } catch (error) {
            console.log(error)
        }
    }, [user])


    const userSubmit = async (e) => {
        let newUser = await axios.post(`http://localhost:3001/optionUser`, {
            "firstName": user.given_name,
            "lastName": user.family_name,
            "nickName": user.nickname,
            "email": user.email,
            "image":user.picture,
            "role": e.target.name
        })
        let userExist = await axios(`http://localhost:3001/optionUser/${user.email}`)
        console.log(newUser.data)
        dispatch(loadUser(userExist.data))
        setShowModal(false)
    }

    console.log(user)
   
    return (
        isAuthenticated && (
            <div className="flex relative justify-end mr-4">
                
                

                {
                    userLoged.result === "Sin Registros" ? <Modal size="sm" active={showModal}>
                        <ModalHeader toggler={() => setShowModal(false)} >
                            What do you want to do?
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-base leading-relaxed text-gray-600 font-normal">
                            Select what you want to do on our site. If you want to change it, you can do it later from the my profile tab.
                            </p>
                        </ModalBody>
                            <ModalFooter>
                                <div className="flex justify-around w-full">
                                    <Button 
                                        color="lightBlue"
                                        name="seller"
                                        buttonType="filled"
                                        onClick={(e) => userSubmit(e)}
                                        ripple="dark"
                                    >
                                        Buy
                                    </Button>
            
                                    <Button
                                        color="lightBlue"
                                        name="buyer"
                                        onClick={(e) => userSubmit(e)}
                                        ripple="light"
                                    >
                                        Sell
                                    </Button>
                                </div>
                            </ModalFooter>
                    </Modal>
                 : ""
                }

                <DropDown />
            </div>
        )
    )
}