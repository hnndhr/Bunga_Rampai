import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Article from '@/components/sections/ArticlePage';

export default function HomePage() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Article/>
      <Footer />
    </main>
  );
}