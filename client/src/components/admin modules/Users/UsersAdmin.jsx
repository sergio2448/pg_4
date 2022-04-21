import React from 'react'
import Nav from "../../Nav"
import houseBackground from '../../../styles/images/house-back.jpg';
import axios from "axios"
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from '@material-tailwind/react/ModalFooter';
import { useSelector } from 'react-redux';
import Button from "@material-tailwind/react/Button";

export default function UsersAdmin() {

    const [allUsers, setAllUsers] = React.useState([])
    const userDB = useSelector((state) => state.user)
    const [showModal, setShowModal] = React.useState(false)
    const [render, setRender] = React.useState(1)

    React.useEffect(async () => {
        try {
            let axiosAllUser = await axios(`https://new-pg.herokuapp.com/admin/getUsers?adminEmail=${userDB.user.email}`)
            setAllUsers(axiosAllUser.data)
        } catch (error) {
            console.log(error)
        }
    }, [render])

    return (
        <div className='bg-sky-900'>
            <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
                <img className='opacity-60 z-2 object-cover w-full h-full blur-sm' src={houseBackground} />
            </div>
            <div className='relative z-6'>
                <div className=' relative z-20 '>
                    <Nav />
                </div>
            </div>
            <div className="flex flex-col relative">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center">
                    <div className="py-2 inline-block w-11/12 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl">
                            <table className="min-w-full text-center">
                                <thead className="border-b bg-gray-800 boder-gray-900">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                            Image
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                            Email
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                            Favourites
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                            Publications
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-4 py-2">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers?.map(user =>
                                            <tr className="border-b bg-blue-100 border-black">

                                                <td className="text-sm text-gray-900 font-medium h-full px-4 whitespace-nowrap">
                                                    <img src={user.image} alt="" className='w-8 my-auto mx-auto' />
                                                </td>
                                                <td className="text-sm text-gray-900 font-medium px-4 py-2 whitespace-nowrap">
                                                    {user.email}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                    Favorites
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap">
                                                    {user.sellers[0].properties.length}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap flex justify-center">
                                                    <Button
                                                        color="red"
                                                        buttonType="filled"
                                                        size="regular"
                                                        rounded={false}
                                                        block={false}
                                                        iconOnly={false}
                                                        ripple="light"
                                                        onClick={async (e) => {
                                                            e.preventDefault()
                                                            setShowModal(true)
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                                <Modal size="md" active={showModal} toggler={() => {
                                                    setShowModal(false)
                                                }} >
                                                    <ModalHeader className="text-red" toggler={() => {
                                                        setShowModal(false)
                                                    }} >
                                                        Warning!
                                                    </ModalHeader>
                                                    <ModalBody>
                                                        <p className="text-base text-gray-600 font-normal">
                                                            Warning! Keep in mind that you start as a buyer. If you want to change roles, go to your profile on the top right.
                                                        </p>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button
                                                            color="red"
                                                            buttonType="filled"
                                                            size="lg"
                                                            className="mt-8"
                                                            rounded={true}
                                                            block={false}
                                                            iconOnly={false}
                                                            ripple="light"
                                                            onClick={async (e) => {
                                                                setShowModal(false)
                                                                e.preventDefault()
                                                                try {
                                                                    let userDelete = await axios.delete(`https://new-pg.herokuapp.com/admin/deleteUser?adminEmail=${userDB.user.email}&userId=${user.id}`)
                                                                    setRender(render + 1)
                                                                    console.log(userDelete)
                                                                } catch (error) {
                                                                    console.log(error)
                                                                }
                                                            }}
                                                        >
                                                            DELETE/BAN USER
                                                        </Button>
                                                    </ModalFooter>

                                                </Modal>
                                            </tr>

                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}