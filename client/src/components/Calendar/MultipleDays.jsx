import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

const MultipleDays = () => {
    const [selectedDays, setSelectedDays] = useState([]);
    return (
        <Calendar
            value={selectedDays}
            onChange={(e) => {
                console.log(e)
                setSelectedDays(e)
            }}
            shouldHighlightWeekends
            minimumDate={utils().getToday()}
            colorPrimary="#0fbcf9"
            renderFooter={() => (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDays([])
                    }}
                    style={{
                      border: '#0fbcf9',
                      color: '#000000',
                      backgroundColor: '#0fbcf9',
                      borderRadius: '0.5rem',
                      padding: '1rem 2rem',
                    }}
                  >
                    Reset Value!
                  </button>
                </div>
              )}
        />
    );
};

export default MultipleDays;
