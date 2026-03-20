import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FAQSection from './components/FAQSection';
import SupportCards from './components/SupportCards';
import Footer from './components/footer';
import Loader from "./components/Loader";
import { FAQS } from './constants';

// IMPORTAÇÕES DO FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

const App: React.FC = () => {
  // O loading começa como TRUE para o Loader aparecer mal o site abre
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery] = useState(''); 

  useEffect(() => {
    // O Firebase verifica o estado da sessão
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      // Pequeno delay opcional de 500ms só para o Loader não sumir rápido demais e ficar elegante
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    return () => unsubscribe();
  }, []);

  const filteredFaqs = useMemo(() => (FAQS as any[]) || [], []);

  // --- ORDEM DE PRIORIDADE (IMPORTANTE) ---

  // 1. Se estiver a carregar, mostra APENAS o Loader
  if (loading) {
    return <Loader />;
  }

  // 3. Se terminou de carregar e TEM utilizador, mostra o Site
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col font-sans select-none cursor-default">
      <Header />
      
      <main className="flex-grow">
        <div className="pt-28">
          <FAQSection items={filteredFaqs} searchQuery={searchQuery} />
        </div>
        <SupportCards />
      </main>

      <Footer />
    </div>
  );
};

export default App;