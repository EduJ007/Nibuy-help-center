import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FAQSection from './components/FAQSection';
import SupportCards from './components/SupportCards'; // Novo componente
import Footer from './components/footer'; 
import { FAQS } from './constants';

const App: React.FC = () => {
  const [searchQuery] = useState('');

  const filteredFaqs = useMemo(() => (FAQS as any[]) || [], []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col font-sans select-none cursor-default">
      
      <Header />
      
      <main className="flex-grow">
        {/* Espaçamento controlado para o FAQ não ficar colado no topo */}
        <div className="pt-16">
          <FAQSection items={filteredFaqs} searchQuery={searchQuery} />
        </div>

        {/* Seção de Contato que funciona em conjunto com o FAQ */}
        <SupportCards />
      </main>

      <Footer />
    </div>
  );
};

export default App;