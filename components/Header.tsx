import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Importando ícone do lucide para combinar

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LADO ESQUERDO: Identidade */}
        <div className="flex items-center gap-2">
          <img 
            src="/logovermelha.png" 
            alt="Nibuy Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span className="text-2xl font-black text-gray-900 tracking-tighter">
            𝙉𝙞𝙗𝙪𝙮 <span className="text-[#ff5722] font-medium ml-1">Ajuda</span>
          </span>
        </div>
        
        {/* LADO DIREITO: Botão de Saída */}
        <a 
          href="https://nibuy-about-us.vercel.app/" // Link do seu site principal
          className="text-sm font-bold text-gray-600 hover:text-[#ff5722] transition-colors flex items-center gap-2 group"
        >
          Voltar para o site
          <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </a>

      </div>
    </header>
  );
};

export default Header;