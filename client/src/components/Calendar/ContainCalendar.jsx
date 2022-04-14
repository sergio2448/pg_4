import React, { useState } from "react";
import CalendarOneDay from "./CalendarOneDay";
import HoursPicker from "./HoursPicker";
import MultipleDays from "./MultipleDays"

const ContainCalendar = () => {
  return (
    <div>
      <CalendarOneDay />
      <br />
      <MultipleDays />
      <br />
      <HoursPicker />
    </div>
  );
};

export default ContainCalendar;