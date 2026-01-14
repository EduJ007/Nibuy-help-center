import React, { useState } from 'react';
import { CATEGORIES } from '../constants';

const CategoryGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
            className={`bg-white p-10 rounded-2xl border transition-all cursor-pointer group shadow-sm ${
              activeId === cat.id 
              ? 'border-[#ff5722] shadow-md ring-1 ring-[#ff5722]/10' 
              : 'border-gray-100 hover:shadow-md hover:border-[#ff5722]/20'
            }`}
          >
            <div className={`mb-6 transition-colors ${activeId === cat.id ? 'text-[#ff5722]' : 'text-gray-400 group-hover:text-[#ff5722]'}`}>
              <i className={`${cat.icon} text-3xl`}></i>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
            
            <p className="text-gray-500 text-sm leading-relaxed">
              {cat.description}
            </p>

            {/* Explicação que expande (SEM O "DICA:") */}
            <div className={`overflow-hidden transition-all duration-300 ${activeId === cat.id ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-4 border-t border-orange-50 text-sm text-gray-600 leading-relaxed">
                {(cat as any).details || "Informação em breve."} 
              </div>
            </div>

            <div className="mt-6 flex items-center text-[#ff5722] text-xs font-bold uppercase tracking-widest">
              {activeId === cat.id ? 'Fechar' : 'Ver explicação'}
              <i className={`fa-solid ${activeId === cat.id ? 'fa-chevron-up' : 'fa-chevron-down'} ml-2`}></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;