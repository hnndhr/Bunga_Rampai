import Navbar from "../layout/Navbar"
import VisionMissionSection from "./VisiMisiSection"

export default function AboutUsPage() {
  return (
    <main>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D1117] to-transparent"></div>
        </div>
        <Navbar />
        <div className="absolute bottom-16 left-44 px-2 max-w-2xl text-start">
          <h1 className="text-5xl font-bold text-white uppercase tracking-wider">Kementerian Riset dan Data</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
Kementerian Riset dan Data bertugas mengelola database BEM UNS melalui riset dan survei, serta menyajikan informasi akurat untuk mendukung isu strategis. Kementerian ini menjadi pusat edukasi dan publikasi data bagi mahasiswa UNS.          </p>
        </div>
      </header>
      </main>)}