import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SurveyCard from '@/components/ui/SurveyPageCard';
import FilterBar from '../ui/FilterBar';

//Catalogue -> Katalog survey

const surveyData = [
  { id: 1, title: "Survei Statistik Karyawan", image: "https://images.unsplash.com/photo-1520176501380-9a174bf7c783?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
  { id: 2, title: "Survei Preferensi dan Minat ", image: "https://images.unsplash.com/photo-1627375871606-69a5d05b6bdd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736" },
  { id: 3, title: "Survei Preferensi dan Minat Mahasiswa UNS 2025", image: "https://images.unsplash.com/photo-1508793382608-aed8824a0743?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" },
  { id: 4, title: "Survei Preferensi dan Minat", image: "https://images.unsplash.com/photo-1610005908273-cf9e5b615076?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735" },
  { id: 5, title: "Survei Preferensi dan Minat", image: "https://images.unsplash.com/photo-1662408565892-e918d336482d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=717" },
];

export default function CataloguePage() {
  return (
    <main>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530533718754-001d2668365a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')" }}
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
      <section className="bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 py-16 px-6">
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