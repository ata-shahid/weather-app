import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns'

import { SlCalender } from "react-icons/sl";
import { getDaysDifference } from '@/utils/dateUtils';


interface CalendarButtonProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function CalendarButton({ selectedDate, setSelectedDate }: CalendarButtonProps) {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const queryParams = new URLSearchParams(window.location.search);
      const lat = queryParams.get('lat');
      const lon = queryParams.get('lon');

      if (lat && lon) {
        const daysDifference = getDaysDifference(date,new Date());
        const index = -daysDifference

        router.push({
          pathname: '/forecast',
          query: { lat, lon, index }
        }, undefined, { shallow: false });
      }
    }
    //setShowDatePicker(false);
  };

  const today = new Date();
  const fourDaysLater = addDays(new Date(), 4);

  return (
    <>
      <SlCalender
        className={`text-3xl hover:opacity-50 cursor-pointer ml-2 ${!router.query.lat || !router.query.lon ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => router.query.lat && router.query.lon && setShowDatePicker(!showDatePicker)}
      />
      {showDatePicker && (
        <DatePicker className="text-center max-w-12" 
        selected={selectedDate} onChange={handleDateChange} 
        minDate={today} maxDate={fourDaysLater} 
        dateFormat="dd.MM" inline/> 
      )}
    </>
  );
}
