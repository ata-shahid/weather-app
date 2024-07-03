'use client';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Dynamic import of the map component to avoid server-side rendering issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function MapPage() {
  const router = useRouter();
  const { lat, lon, city } = router.query;

  if (!lat || !lon || !city) {
    return <div>Error: Latitude, Longitude, and City are required to display the map.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center mt-5 px-4">
      <div className="mb-4 w-full max-w-3xl p-3 bg-gray-700 text-white text-center rounded-lg shadow-lg">
          <p className="text-base font-semibold">Map of {city}</p>
        </div>
     
        <div className="w-full max-w-3xl h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg shadow-lg overflow-hidden">
          <Map lat={parseFloat(lat as string)} lon={parseFloat(lon as string)} />
        </div>
        <div className="mb-4 mt-1 w-full max-w-3xl p-3 bg-gray-700 text-white text-center rounded-lg shadow-lg">
          <p className="text-base font-semibold">Zoom out to see more details</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
