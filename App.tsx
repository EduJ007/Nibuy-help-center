import React, { useState, useMemo } from 'react';
import Header from './components/Header'; // IMPORTAÇÃO DO HEADER (O que faltava)
import FAQSection from './components/FAQSection'; // IMPORTAÇÃO DO FAQ
import AIChatBot from './components/AIChatBot';
import Footer from './components/footer'; 
import { FAQS } from './constants';

const App: React.FC = () => {
  // Estado para não dar erro no FAQSection
  const [searchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    const listaFaqs = (FAQS as any[]) || []; 
    return listaFaqs; // Mostra todas as perguntas
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans selection:bg-[#ff5722]/10 selection:text-[#ff5722]">
      
      {/* 1. O HEADER (Aquele com "Voltar para o site") */}
      <Header />
      
      <main className="flex-grow">
        {/* 2. AS PERGUNTAS (FAQSection) */}
        <div className="pt-10 bg-gray-100">
          <FAQSection items={filteredFaqs} searchQuery={searchQuery} />
        </div>

        {/* 3. BOTÃO WHATSAPP */}
        <section className="bg-[#f9fafb] py-20 text-center border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas sobre um produto?</h2>
            <a 
              href="https://wa.me/558193611017" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold hover:shadow-lg transition-all"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i>
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* 4. FOOTER */}
      <Footer />

      <AIChatBot />
    </div>
  );
};

export default App;