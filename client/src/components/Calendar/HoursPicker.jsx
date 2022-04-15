import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

let date = new Date()
let date2 = new Date()

export default function HoursPicker() {
    const [startDate, setStartDate] = React.useState(date2);

    return (
        <DatePicker
            excludeTimes={[
                date.setHours(21, 0),
                date.setHours(21, 30),
                date.setHours(22, 0),
                date.setHours(22, 30),
                date.setHours(23, 0),
                date.setHours(23, 30),
                date.setHours(0, 0),
                date.setHours(0, 30),
                date.setHours(1, 0),
                date.setHours(1, 30),
                date.setHours(2, 0),
                date.setHours(2, 30),
                date.setHours(3, 0),
                date.setHours(3, 30),
                date.setHours(4, 0),
                date.setHours(4, 30),
                date.setHours(5, 0),
                date.setHours(5, 30),
                date.setHours(6, 0),
                date.setHours(6, 30),
                date.setHours(7, 0),
                date.setHours(7, 30),
                date.setHours(8, 0),
                date.setHours(8, 30)
            ]}
            inline
            selected={startDate}
            onChange={(date) => {
                console.log(date)
                setStartDate(date)
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
        />
    );
};


