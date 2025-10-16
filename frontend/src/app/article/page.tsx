import React from 'react';
import Footer from '@/components/layout/Footer';
import Title from '@/components/sections/TittleSection';

export default function HomePage() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Title/>
      <Footer />
    </main>
  );
}