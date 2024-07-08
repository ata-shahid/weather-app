import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

import { SlCalender } from "react-icons/sl";
import { getDaysDifference } from '@/utils/dateUtils';

interface CalendarButtonProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function CalendarButton({ selectedDate, setSelectedDate }: CalendarButtonProps) {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const today = new Date();
  const fourDaysLater = addDays(new Date(), 4);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const lat = router.query.lat
      const lon = router.query.lon
      const city = router.query.city

      if (lat && lon) {
        const daysDifference = getDaysDifference(date,new Date());
        const index = -daysDifference;
        
        router.push({
          pathname: '/forecast',
          query: { lat, lon, city, index }
        }, undefined, { shallow: false });
      }
      else {
        setShowDatePicker(false);
        console.error('Latitude and Longitude are required to fetch weather data');
      }
    }
    //setShowDatePicker(false); 
  };

  return (
    <>
      <SlCalender
        className={`text-2xl hover:opacity-50 cursor-pointer ml-2 ${!router.query.lat || !router.query.lon ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => router.query.lat && router.query.lon && setShowDatePicker(!showDatePicker)}
        data-testid="calendar-icon" title='Select Date'
      />
      {showDatePicker && (
        <div data-testid="date-picker">
          <DatePicker
            className="text-center max-w-12"
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={today}
            maxDate={fourDaysLater}
            dateFormat="dd.MM"
          />
        </div>
      )}
    </>
  );
}
