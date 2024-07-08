import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
      <footer className="flex bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 py-4 text-center text-white shadow-inner justify-center items-center">
        <p className="text-xs font-bold tracking-wide">Powered by OpenWeatherMap API</p>
        <Link href="/contact">
        <p className="text-blue-500 hover:underline">Contact Us</p>
      </Link>
      </footer>
    );
  }
  