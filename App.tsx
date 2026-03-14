import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FAQSection from './components/FAQSection';
import SupportCards from './components/SupportCards';
import Footer from './components/footer';
import Loader from "./components/Loader";
import { FAQS } from './constants';

const App: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [searchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFaqs = useMemo(() => (FAQS as any[]) || [], []);

  return (
    <>
      {loading && <Loader />}

      <div className="min-h-screen bg-gray-200 flex flex-col font-sans select-none cursor-default">
        
        <Header />
        
        <main className="flex-grow">
          
          <div className="pt-16">
            <FAQSection items={filteredFaqs} searchQuery={searchQuery} />
          </div>

          <SupportCards />

        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;