
import React, { useState } from 'react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  items: FAQItem[];
  searchQuery: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ items, searchQuery }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  if (items.length === 0) {
    return (
      <section className="bg-white py-20 border-t border-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <i className="fa-solid fa-face-frown text-4xl text-gray-200 mb-4 block"></i>
          <p className="text-gray-500">Nenhum resultado encontrado para "{searchQuery}".</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 border-t border-gray-50" id="faq-section">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Dúvidas mais comuns'}
        </h2>

        <div className="divide-y divide-gray-100">
          {items.map((faq) => (
            <div key={faq.id} className="py-2">
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-medium text-gray-700 group-hover:text-[#ff5722] transition-colors">{faq.question}</span>
                <i className={`fa-solid fa-chevron-down text-[10px] text-gray-300 transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-[#ff5722]' : ''}`}></i>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'} overflow-hidden`}
              >
                <p className="text-gray-500 text-sm leading-relaxed pr-8 border-l-2 border-[#ff5722]/20 pl-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
