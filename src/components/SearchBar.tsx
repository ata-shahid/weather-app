import React, { useState } from 'react';
import { useRouter } from 'next/router';


import LocationButton from './Location';
import CalendarButton from './Calendar';
import Searchfield from './SearchField';


export default function Searchbar() {
  console.log("This is Searchbar");
  

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const router = useRouter();

  return (
    <div className="mt-4 flex flex-col md:flex-row gap-2 w-full max-w-2xl mx-auto">
      <div className="flex flex-row gap-2 justify-center items-center">
        <Searchfield />
        <LocationButton />
      </div>
      <div className="flex justify-center items-center md:justify-start md:flex-grow">
        <CalendarButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
}
