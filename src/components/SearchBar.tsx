import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Searchfield from "./Searchfield";
import LocationButton from './Location';
import CalendarButton from './Calendar';


export default function Searchbar() {

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
