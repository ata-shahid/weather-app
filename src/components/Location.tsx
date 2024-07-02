import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function LocationButton() {
    const router = useRouter();
    const [error, setError] = useState("");

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentQuery = { ...router.query };

                    // Fetch the city name based on the geolocation
                    try {
                        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
                        const data = await response.json();
                        if (data.length === 0) {
                            setError("Unable to retrieve city name");
                            return;
                        }

                        const city = data[0].name;
                        const newQuery = { ...currentQuery, lat: latitude, lon: longitude, city };
                        router.push({
                            pathname: '/forecast',
                            query: newQuery,
                        });
                    } catch (error) {
                        console.error("Error fetching city name: ", error);
                        setError("Unable to retrieve city name");
                    }
                },
                (error) => {
                    console.error("Error getting geolocation: ", error);
                    setError("Unable to retrieve location");
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setError("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <FaLocationDot className="text-3xl hover:opacity-50 cursor-pointer ml-2" onClick={getCurrentLocation} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
