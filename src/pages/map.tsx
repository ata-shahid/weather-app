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
      <main className="flex-grow flex flex-col items-center mt-5">
        <div className="w-full max-w-lg h-[500px]">
          <Map lat={parseFloat(lat as string)} lon={parseFloat(lon as string)} />
        </div>
        <div className="mt-4">
          <p>Map of {city}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
