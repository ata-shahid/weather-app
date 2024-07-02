import { TiWeatherPartlySunny } from "react-icons/ti";
import Link from "next/link";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white">
      <div className="h-[100px] flex justify-center items-center px-3">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center">
            <TiWeatherPartlySunny className="text-3xl font-bold" />
          </div>
          <Link href="http://localhost:3000" className="text-3xl font-bold text-white">HSRM-Wetter-App</Link>
        </div>
      </div>
    </nav>
  );
}
