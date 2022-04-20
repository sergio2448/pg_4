import React, { useEffect, useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

const CalendarOneDay = ({defaultFrom, defaultTo, setSelectedDay, selectedDay}) => {

  useEffect(() => {
    setSelectedDay(defaultFrom);
  }, []);

  return (
    <Calendar
      value={selectedDay}
      onChange={(e) => {
        console.log(e)
        setSelectedDay(e)
      }}
      minimumDate={defaultFrom}
      maximumDate={defaultTo}
      shouldHighlightWeekends
      colorPrimary="#0fbcf9"
    />
  );
};

export default CalendarOneDay;