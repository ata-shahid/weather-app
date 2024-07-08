import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { SlGlobe } from "react-icons/sl"
import LocationButton from './Location';
import CalendarButton from './Calendar';
import Searchfield from './SearchField';


export default function Searchbar() {
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    const index = parseInt(router.query.index as string, 10);
    if (!isNaN(index) && index >= 0 && index <= 4) {
      setSelectedDate(new Date(new Date().setDate(new Date().getDate() + index)));
    }
  }, [router.query.index]);

  const getMaps = () => {
    router.push({
      pathname: "/map",
      query: {
        lat: router.query.lat,
        lon: router.query.lon,
        city: router.query.city,
      },
    });
  };

  return (
    <div className="mt-4 flex flex-col md:flex-row w-full mx-2 ">
      <div className="flex flex-row gap-2 justify-center items-center">
        <Searchfield />
      </div>
      <div className="flex justify-center items-center gap-2 mt-4 md:justify-start md:flex-grow md:mt-0 ">
        <LocationButton />
        <SlGlobe data-testid="maps" title='See Maps' className={`text-3xl hover:opacity-50 cursor-pointer ${!router.query.lat || !router.query.lon ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => router.query.lat && router.query.lon && getMaps()} />
        <CalendarButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
    </div>
  );
}
