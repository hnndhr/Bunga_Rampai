import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SurveyCard from '@/components/ui/SurveyPageCard';
import FilterBar from '../ui/FilterBar';

// Data survei bisa berasal dari API atau database
// Di sini kita gunakan data statis sebagai contoh
const surveyData = [
  { id: 1, title: "Survei Statistik Karyawan", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop" },
  { id: 2, title: "Survei Preferensi dan Minat", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop" },
  { id: 3, title: "Survei Preferensi dan Minat", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop" },
  { id: 4, title: "Survei Preferensi dan Minat", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop" },
  { id: 5, title: "Survei Preferensi dan Minat", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=500&fit=crop" },
];

export default function CataloguePage() {
  return (
    <main>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/bunga.png')" }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D1117] to-transparent"></div>
        </div>
        <Navbar />
        <div className="absolute bottom-16 left-44 px-2 max-w-2xl text-start">
          <h1 className="text-5xl font-bold text-white uppercase tracking-wider">Bunga Rampai</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Bunga Rampai menyajikan hasil riset dan survei Kementerian Riset dan Data selama satu periode. Informasi disajikan dalam bentuk desain infografis dan artikel yang akan memudahkan pembaca untuk memahami data secara cepat dan jelas.
          </p>
        </div>
      </header>

      {/* Catalog Section */}
      <section className="bg-gradient-to-b from-slate-800 via-gray-800 to-gray-900 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-8">Katalog Survei</h2>
          
          <FilterBar/>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {surveyData.map((survey) => (
              <SurveyCard 
                key={survey.id}
                title={survey.title}
                image={survey.image}
                altText={`Infografis ${survey.title}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}