import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Searchfield from "./SearchField";
import LocationButton from './Location';
import CalendarButton from './Calendar';


export default function Searchbar() {
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const router = useRouter();
 
  return (
    <div className="mt-4 flex flex-row gap-2 justify-center items-center w-full max-w-2xl mx-auto">
      <Searchfield />
      <LocationButton />
      <CalendarButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
}
