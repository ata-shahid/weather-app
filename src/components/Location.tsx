import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from 'next/router';


export default function LocationButton() {

    const router = useRouter();

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentQuery = { ...router.query };
                    const newQuery = { ...currentQuery, lat: latitude, lon: longitude };
                    router.push({
                        pathname: '/forecast',
                        query: newQuery,
                    });
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <FaLocationDot className="text-3xl hover:opacity-50 cursor-pointer ml-2" onClick={getCurrentLocation} />
    );
}
