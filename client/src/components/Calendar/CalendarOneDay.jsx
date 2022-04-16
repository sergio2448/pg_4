import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

const CalendarOneDay = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  
  const disabledDays = [
    {
      year: 2022,
      month: 4,
      day: 15,
    },
    {
      year: 2022,
      month: 4,
      day: 16,
    },
    {
      year: 2022,
      month: 4,
      day: 17,
    }
  ];
  return (
    <Calendar
      disabledDays={disabledDays}
      value={selectedDay}
      onChange={(e) => {
        console.log(e)
        setSelectedDay(e)
      }}
      minimumDate={utils().getToday()}
      shouldHighlightWeekends
      colorPrimary="#0fbcf9"
    />
  );
};

export default CalendarOneDay;