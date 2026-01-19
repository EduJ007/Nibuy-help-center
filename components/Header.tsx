import React from 'react';

// Mudamos para não exigir mais 'props', assim ele aceita ser chamado puro
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          <a href="https://nibuy-home-page.vercel.app/" className="flex items-center gap-2 cursor-pointer transition-opacity active:opacity-80">
            <img src="/logovermelha.png" alt="Nibuy Logo" className="h-14 w-auto object-contain" />
            <span className="text-2xl font-black text-[#ff5722] tracking-tight">𝙉𝙞𝙗𝙪𝙮</span>
          </a>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.location.reload(); }}
              className="bg-[#ff5722] text-white px-5 py-2.5 rounded-full font-bold text-[11px] uppercase shadow-md transition-all duration-300 hover:bg-[#e64a19] active:scale-95 flex items-center justify-center"
            >
              Central de Ajuda    
            </a>

            <a href="https://nibuy-contato.vercel.app/" className="text-gray-600 hover:text-[#ff5722] transition-all duration-300 text-[11px] font-black uppercase tracking-widest px-3">
              Contato
            </a>

            <a href="https://sobre-nibuy.vercel.app/" className="text-gray-600 hover:text-[#ff5722] transition-all duration-300 text-[11px] font-black uppercase tracking-widest px-2">
              Sobre Nós
            </a>
          </div>

          <a href="https://nibuy-produtos.vercel.app/" className="bg-[#ff5722] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e64a19] transition-all shadow-md active:scale-95">
            Ver Ofertas
          </a> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;