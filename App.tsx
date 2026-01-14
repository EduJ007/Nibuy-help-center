
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FAQSection from './components/FAQSection';
import AIChatBot from './components/AIChatBot';
import { FAQS } from './constants';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredFaqs = useMemo(() => {
    // Forçamos o FAQS a ser tratado como uma lista comum (array)
    const listaFaqs = (FAQS as any[]) || []; 
    
    if (!searchQuery) return listaFaqs;
    
    return listaFaqs.filter((faq: any) => {
      // Verificamos se existem perguntas e respostas antes de comparar
      const pergunta = String(faq?.question || "").toLowerCase();
      const resposta = String(faq?.answer || "").toLowerCase();
      return pergunta.includes(searchQuery) || resposta.includes(searchQuery);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#ff5722]/10 selection:text-[#ff5722]">
      <Header />
      
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />
        
        {/* Banner: Como Funciona */}
        <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-50 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-cart-shopping text-[#ff5722] text-3xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Como a Nibuy funciona?</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                A Nibuy seleciona as melhores ofertas para você. Ao clicar em um produto, você será 
                <span className="font-semibold text-gray-800"> redirecionado para a loja oficial </span> 
                (ex: Shopee, Amazon) para finalizar a compra com segurança diretamente com o lojista.
              </p>
            </div>
          </div>
        </div>

        {/* Categories (Grid responsivo) */}
        <CategoryGrid />
        
        {/* FAQ com filtro real-time */}
        <FAQSection items={filteredFaqs} searchQuery={searchQuery} />

        {/* Support CTA Section */}
        <section className="bg-[#f9fafb] py-20 text-center border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas sobre um produto?</h2>
            <p className="text-gray-500 mb-8 font-light">
              Se você travou em alguma oferta ou quer saber mais sobre como comprar, chame a gente agora!
            </p>
            <a 
              href="https://wa.me/558193611017?text=" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i>
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </main>
<footer className="bg-[#f3f4f6] text-gray-700 pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* COLUNA 1: IDENTIDADE */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-black text-[#ff5722] italic uppercase tracking-tighter">
              𝙉𝙞𝙗𝙪𝙮
            </span>
            <p className="mt-4 text-gray-500 max-w-sm text-sm leading-relaxed font-medium">
              Sua vitrine inteligente de ofertas. Encontramos os melhores preços e você finaliza a compra com total segurança nas maiores lojas do Brasil.
            </p>
            
            {/* REDES SOCIAIS COM TIKTOK */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722] hover:shadow-md transition-all duration-300">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-[#ff5722] hover:border-[#ff5722] hover:shadow-md transition-all duration-300">
                <i className="fa-brands fa-tiktok text-lg"></i>
              </a>
            </div>
          </div>

          {/* COLUNA 2: NAVEGAÇÃO */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-gray-900">Navegação</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="https://nibuy-about-us.vercel.app/" className="hover:text-[#ff5722] transition-colors font-semibold">Sobre a Nibuy</a></li>
              <li><a href="#" className="hover:text-[#ff5722] transition-colors font-semibold">Central de Ajuda</a></li>
            </ul>
          </div>

          {/* COLUNA 3: CONTATO */}
          <div>
            <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-gray-900">Contato</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="mailto:nibuyoficial@nibuy.com.br" className="hover:text-[#ff5722] transition-colors break-all font-semibold">
                  nibuyoficial@nibuy.com.br
                </a>
              </li>
              <li>
                <a href="https://wa.me/558193611017" target="_blank" className="hover:text-[#ff5722] transition-colors font-semibold">
                  WhatsApp Suporte
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* LINHA FINAL */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Nibuy - Vitrine de Ofertas. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/558193611017?text=" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce"
        title="Dúvida rápida no WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-2xl"></i>
      </a>

      <AIChatBot />
    </div>
  );
};

export default App;
