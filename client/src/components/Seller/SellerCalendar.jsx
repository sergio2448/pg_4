import React, { useState } from "react";
import Nav from "../Nav"
import houseBackground from '../../styles/images/house-back.jpg';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Button from "@material-tailwind/react/Button";
import axios from "axios"
import { useSelector } from "react-redux";

const App = () => {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });

    const userDB = useSelector((state) => state.user);

    return (
        <>
            <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
                <img className='opacity-60 z-2 object-cover w-full h-full blur-sm' src={houseBackground} />
            </div>
            <div className='relative z-6'>
                <div className=' relative z-20 '>
                    <Nav />
                </div>
            </div>
            <div className="mt-20 flex justify-center">
                <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    minimumDate={utils().getToday()}
                    colorPrimary="#0fbcf9"
                    calendarClassName=""
                    shouldHighlightWeekends
                    renderFooter={() => (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
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
                                    fontSize: '1.5em',
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
            <div>
                <p>From {}</p>
            </div>
            <div className="relative mt-12 flex justify-center">
                <Button
                    color="lightBlue"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="relative mx-1 bg-stone-800"
                    onClick={async (e) => {
                        e.preventDefault()
                        try {
                            let newRange = await axios.post('http://localhost:3001/calendar', {
                                "dates": selectedDayRange,
                                "type":"seller",
                                "userId": userDB.user.id
                            })
                            console.log(newRange)
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    Cargar 
                </Button>
            </div>
        </>
    );
};

export default App;