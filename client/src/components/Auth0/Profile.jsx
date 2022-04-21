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
    const [showModal, setShowModal] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [firstTime, setFirstTime] = React.useState(false)
    const { isAuthenticated, isLoading, user} = useAuth0();
    const dispatch = useDispatch();

    if (isLoading) {
        return <div>Loading...</div>
    }

    React.useEffect(async () => {
        try {
            let userExist = await axios(
              `https://new-pg.herokuapp.com/optionUser/${user.email}`
            );
            setUserLoged(userExist.data)
            if(userExist.data.result === "Sin Registros") {
                let newUser = await axios.post(`https://new-pg.herokuapp.com/optionUser`, {
                    "firstName": user.given_name ? user.given_name : user.name,
                    "lastName": user.family_name ? user.family_name : user.name,
                    "nickName": user.nickname,
                    "email": user.email,
                    "image":user.picture,
                })
                userExist = await axios(`https://new-pg.herokuapp.com/optionUser/${user.email}`)
                dispatch(loadUser(userExist.data))
                setUserLoged(userExist.data)
                const notificationUser={
                    userid:userExist.data.user.id
                }
                setShowModal(true)
                await axios.post(`https://new-pg.herokuapp.com/send-email/welcome`,notificationUser)
            }
            dispatch(loadUser(userExist.data))
        } catch (error) {
            console.log(error.message)
        }
    }, [user, isAuthenticated])
   
    return (
        isAuthenticated && (
            <div className="flex relative justify-end mr-4">

                {
                    showModal ? <Modal size="sm" active={showModal} toggler={() => {
                        setShowModal(false)
                        }} >
                        <ModalHeader toggler={() => {
                            setShowModal(false)
                        }} >
                            Welcome
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-base text-gray-600 font-normal">
                            Welcome! Keep in mind that you start as a buyer. If you want to change roles, go to your profile on the top right.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <div className="flex justify-center flex-col items-center text-center">
                            <p className="text-base leading-relaxed text-gray-600 font-sm italic">Please enter your phone number so your buyers can contact you.</p>
                            <p className="text-base leading-relaxed text-gray-600 font-sm italic mt-4">With your country prefix.</p>
                            <input type="number" className="border-black border-solid border text-black" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                            <Button
                                color="lightBlue"
                                buttonType="filled"
                                size="regular"
                                className="mt-8"
                                rounded={false}
                                block={false}
                                iconOnly={false}
                                ripple="light"
                                onClick={async (e) => {
                                    e.preventDefault()
                                    try {
                                        let phone = await axios.post("https://new-pg.herokuapp.com/optionUser/phoneNumber", {
                                            phoneNumber: phoneNumber,
                                            id: userLoged.user.id
                                        })
                                        let userExist = await axios(`http://localhost:3001/optionUser/${user.email}`)
                                        dispatch(loadUser(userExist.data))
                                        setShowModal(false)
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                            >
                                Save number
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