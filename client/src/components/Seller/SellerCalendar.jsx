import React, { useState } from "react";
import Nav from "../Nav"
import houseBackground from '../../styles/images/house-back.jpg';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Button from "@material-tailwind/react/Button";
import axios from "axios"
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const App = () => {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [showModal, setShowModal] = React.useState(false);
    const userDB = useSelector((state) => state.user);
    const navigate = useNavigate()

    console.log(selectedDayRange)
    return (
        <>
            <div >
    <div className='z-1 absolute bg-black w-full h-full shadow-black shadow-2xl '>
      <img className='opacity-60 z-2 object-cover w-full h-full ' src={houseBackground} />
    </div>
    
    <Nav />
            </div>
            <div className="relative flex flex-col items-center mt-12 ">
            <h3 className="text-5xl font-bold	text-white font-Poppins ">User Calendar</h3>
            </div>
            <div className="mt-16 flex justify-center">
                <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    minimumDate={utils().getToday()}
                    colorPrimary="#0fbcf9"
                    calendarClassName=""
                    shouldHighlightWeekends
                    renderFooter={() => (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 2rem' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedDayRange({
                                        from: null,
                                        to: null
                                    })
                                }}
                                style={{
                                    backgroundColor: '#0fbcf9',
                                    border: '#0fbcf9',
                                    color: '#000000',
                                    fontSize: '1.2em',
                                    borderRadius: '0.5rem',
                                    padding: '1rem 2rem',
                                }}
                            >
                                Reset Value!
                            </button>
                        </div>
                    )}
                />
            </div>
            <div className="text-white flex wrap justify-center my-4">
                {
                    selectedDayRange.from ? <p className="relative">From the {selectedDayRange.from.day}th day of the {selectedDayRange.from.month}th month</p> : ""
                }
            </div>
            <div className="text-white flex wrap justify-center my-4">
                {
                    selectedDayRange.to ? <p className="relative">From the {selectedDayRange.to.day}th day of the {selectedDayRange.to.month}th month</p> : ""
                }
            </div>
            <div className="relative mt-12 flex justify-center mb-12">
                <Button
                    color="lightBlue"
                    buttonType="filled"
                    size="lg"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="relative mx-1 text-black bold"
                    onClick={async (e) => {
                        e.preventDefault()
                        try {
                            if(selectedDayRange.from && selectedDayRange.to) {
                                let newRange = await axios.post('https://new-pg.herokuapp.com/calendar', {
                                    "dates": selectedDayRange,
                                    "type":"seller",
                                    "userId": userDB.user.id
                                })
                                navigate("/listProperties")
                            } else {
                                setShowModal(true)
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    Cargar 
                </Button>
                <Modal size="sm" active={showModal} toggler={() => {
                    setShowModal(false)
                    }} >
                    <ModalHeader toggler={() => {
                        setShowModal(false)
                    }} >
                        Select your available days
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-base leading-relaxed text-gray-600 font-normal italic">
                        Uuups! Select your available days, otherwise a buyer will book an appointment any day of the year
                        </p>
                    </ModalBody> 
                </Modal>

                
            </div>

            
            <Footer/>
        </>
    );
};

export default App;