
import React from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="bg-[#f9fafb] pt-20 pb-24 border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Como podemos ajudar?
        </h1>
        <p className="text-gray-500 text-lg mb-10 font-light">
          Busque por pedidos, entregas, pagamentos e muito mais.
        </p>
        
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-gray-300 group-focus-within:text-[#ff5722] transition-colors"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-16 pr-6 py-5 border border-gray-200 rounded-full bg-white shadow-sm focus:ring-4 focus:ring-[#ff5722]/5 focus:border-[#ff5722] focus:outline-none text-gray-700 text-lg transition-all"
            placeholder="Digite sua dúvida..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span className="font-medium text-gray-500">Sugestões:</span>
          <button onClick={() => onSearch('rastreio')} className="hover:text-[#ff5722] transition-colors">Rastreio</button>
          <button onClick={() => onSearch('pix')} className="hover:text-[#ff5722] transition-colors">Pagar com Pix</button>
          <button onClick={() => onSearch('devolução')} className="hover:text-[#ff5722] transition-colors">Devolução</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
