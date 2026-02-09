import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 selection:bg-[#ff5722]/20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* COLUNA 1: IDENTIDADE */}
        <div className="col-span-1 md:col-span-2">
          <span className="text-3xl font-black text-[#ff5722]">
            𝙉𝙞𝙗𝙪𝙮
          </span>
          <p className="mt-4 text-gray-400 max-w-sm text-sm font-medium leading-relaxed">
            Sua vitrine inteligente de ofertas. Encontramos os melhores preços e você finaliza a compra com total segurança nas maiores lojas do Brasil.
          </p>
          
          {/* REDES SOCIAIS EM CÍRCULOS */}
          <div className="flex gap-4 mt-6">
                <a href="https://instagram.com/nibuyoficial" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/5 rounded-full hover:bg-[#ff5722] transition-all duration-300 border border-white/10 group flex items-center justify-center">
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                </a>
                
                {/* FACEBOOK */}
                <a href="https://www.facebook.com/profile.php?id=61583962855568" 
                  className="w-10 h-10 bg-white/5 rounded-full hover:bg-[#4267B2] transition-all duration-300 border border-white/10 group flex items-center justify-center">
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                </a>

                {/* PINTEREST */}
                <a href="https://pin.it/hFv1x89A5" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/5 rounded-full hover:bg-red-600 transition-all duration-300 border border-white/10 group flex items-center justify-center">
                  <i className="fa-brands fa-pinterest text-[18px] group-hover:scale-110 transition-transform"></i>
                </a>
              </div>
        </div>

        {/* COLUNA 2: NAVEGAÇÃO */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-white border-l-2 border-[#ff5722] pl-3">Navegação</h4>
          <ul className="space-y-4 text-gray-400 text-xs font-bold uppercase tracking-tighter">
            <li><a href="https://nibuy-home-page.vercel.app/" className="hover:text-white transition-colors">Início</a></li>
            <li><a href="https://sobre-nibuy.vercel.app/" className="hover:text-white transition-colors">Sobre a Nibuy</a></li>
            <li><a href="#" className="text-[#ff5722]">Central de Ajuda</a></li>
          </ul>
        </div>

        {/* COLUNA 3: SUPORTE */}
        <div>
          <h4 className="font-bold mb-6 uppercase text-[10px] tracking-[0.2em] text-white border-l-2 border-[#ff5722] pl-3">Suporte</h4>
          <div className="space-y-4">
            <p className="text-xs text-gray-400 font-bold uppercase">Segunda a Sexta<br/><span className="text-white">09h às 18h</span></p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nibuyoficial@gmail.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-xs text-[#ff5722] font-bold underline hover:text-orange-400 transition-colors block mt-2">
              nibuyoficial@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-[10px] uppercase tracking-widest font-bold">
        <p>© 2026 NIBUY OFERTAS. TODOS OS DIREITOS RESERVADOS.</p>
      </div>
    </footer>
  );
};

export default Footer;