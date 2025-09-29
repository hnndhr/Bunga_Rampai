"use client";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-12 py-6 text-white">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-3">
        <img src="/rnd_logo.png" alt="Logo" className="w-[65.03px] h-[56.84px]" />
        <span className="text-lg font-semibold tracking-wider">BUNGA RAMPAI</span>
      </div>

      {/* Menu */}
      <ul className="flex space-x-10 text-sm">
        <li className="hover:text-gray-300 cursor-pointer">Home</li>
        <li className="hover:text-gray-300 cursor-pointer">Catalogue</li>
        <li className="hover:text-gray-300 cursor-pointer">About Us</li>
      </ul>
    </nav>
  );
}
