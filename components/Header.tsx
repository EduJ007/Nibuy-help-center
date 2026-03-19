import React, { useState, useEffect } from 'react';
import { Search, Bell, HelpCircle, User, LogOut, Settings, Check, X } from 'lucide-react';
import { auth, db, googleProvider } from '../firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const Navbar: React.FC = () => {
  /* --- ESTADOS DO COMPONENTE (Toda a sua lógica original) --- */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginWarning, setLoginWarning] = useState(false);
  const [showAddPasswordModal, setShowAddPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addPassLoading, setAddPassLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; photo: string } | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [notifications] = useState([
    { id: 1, text: "Estamos Ajustando algumas coisas mas em caso de feedback só entrar em contato 👍" },
    { id: 2, text: "Façam Login para acessar tudo que a Nibuy tem a oferecer" },
    { id: 3, text: "No futuro vai ter produto de todo tipo de site, só aguardem" }
  ]);

  /* --- FUNÇÕES DE LÓGICA (Transportadas do seu Header) --- */
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    if (!user) {
      setLoginWarning(true);
      setTimeout(() => setLoginWarning(false), 3000);
      return;
    }
    window.location.href = `https://nibuy-produtos.vercel.app/?search=${encodeURIComponent(searchTerm.trim())}`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({ name: data.name || '', email: firebaseUser.email || '', photo: data.photo || '' });
        } else {
          setUser({ name: firebaseUser.displayName || '', email: firebaseUser.email || '', photo: firebaseUser.photoURL || '' });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName, email: result.user.email,
          photo: result.user.photoURL, createdAt: new Date().toISOString(),
        });
      }
      setShowLoginModal(false);
    } catch (err: any) { setError("Erro ao entrar com Google"); }
  };

  const handleAuthAction = async () => {
    setError("");
    if (!emailInput.trim() || !passwordInput.trim()) { setError("Preencha tudo."); return; }
    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput.trim());
        setShowLoginModal(false);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput.trim(), passwordInput.trim());
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: nameInput.trim(), email: emailInput.trim(), photo: "", createdAt: new Date().toISOString(),
        });
        setShowLoginModal(false);
      }
    } catch (err: any) { setError("Erro na autenticação."); }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowUserMenu(false);
    window.location.reload();
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setUpdateLoading(true);
    try {
      const userRef = doc(db, "users", auth.currentUser!.uid);
      await updateDoc(userRef, { name: editName.trim(), photo: editPhoto.trim() });
      setUser({ ...user, name: editName.trim(), photo: editPhoto.trim() });
      setShowProfileModal(false);
    } catch { setError("Erro ao atualizar"); } finally { setUpdateLoading(false); }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Aviso de Login */}
      {loginWarning && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white text-[#ff5722] px-6 py-3 rounded-full shadow-2xl border border-orange-100 z-[9999] font-bold text-sm animate-bounce">
          ⚠️ Você precisa estar logado para buscar.
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          
          {/* LOGO (Estilo Navbar Nova) */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logovermelha.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-2xl font-black text-[#ff5722] tracking-tighter hidden md:block">𝙉𝙞𝙗𝙪𝙮</span>
          </a>

          {/* BARRA DE BUSCA (Estilo Navbar Nova) */}
          <div className="flex-1 max-w-xl relative flex items-center">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full bg-gray-100 border-none rounded-full py-2.5 px-6 pr-12 text-sm focus:ring-2 focus:ring-[#ff5722] transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="absolute right-4 text-gray-400 hover:text-[#ff5722]">
              <Search size={18} />
            </button>
          </div>

          {/* LINKS E PERFIL */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <a href="https://nibuy-contact.vercel.app/" className="hidden lg:block text-gray-500 hover:text-[#ff5722] text-xs font-bold uppercase tracking-widest">Contato</a>
            
            {/* Notificações */}
            <div className="relative cursor-pointer" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
              <Bell size={20} className="text-gray-500" />
              {notifications.length > 0 && <span className="absolute -top-1 -right-1 bg-[#ff5722] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{notifications.length}</span>}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-2xl rounded-2xl border border-gray-50 p-2 z-50">
                  {notifications.map(n => <div key={n.id} className="p-3 text-[11px] text-gray-600 border-b last:border-0">{n.text}</div>)}
                </div>
              )}
            </div>

            {/* User Profile / Login Button */}
            {!user ? (
              <button onClick={() => setShowLoginModal(true)} className="bg-[#ff5722] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#e64a19] transition-all active:scale-95 shadow-md">
                Entrar
              </button>
            ) : (
              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 hover:opacity-80 transition-all">
                  <img src={user.photo || "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"} className="w-10 h-10 rounded-full border-2 border-[#ff5722] object-cover" alt="User" />
                </button>
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-[60] py-2">
                    <button onClick={() => { setEditName(user.name); setEditPhoto(user.photo); setShowProfileModal(true); setShowUserMenu(false); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-2">
                      <Settings size={16} /> Perfil
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 border-t mt-2">
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE LOGIN (ESTILO CLEAN) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black"><X /></button>
            <h2 className="text-2xl font-black text-[#ff5722] mb-6 text-center uppercase italic">{isLoginView ? 'Login' : 'Cadastro'}</h2>
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-xs font-bold mb-4 text-center">{error}</div>}
            <div className="space-y-4">
              {!isLoginView && <input type="text" placeholder="Nome" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200" />}
              <input type="email" placeholder="E-mail" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200" />
              <input type="password" placeholder="Senha" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-200" />
              <button onClick={handleAuthAction} className="w-full bg-[#ff5722] text-white font-bold py-4 rounded-2xl hover:brightness-110 transition-all shadow-lg uppercase tracking-widest text-sm">
                {isLoginView ? 'Entrar' : 'Cadastrar'}
              </button>
              <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-3 rounded-2xl font-bold text-sm hover:bg-gray-50">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" /> Google
              </button>
            </div>
            <button onClick={() => setIsLoginView(!isLoginView)} className="w-full mt-6 text-gray-400 text-xs font-bold text-center underline">
              {isLoginView ? 'Não tem conta? Crie agora' : 'Já tem conta? Entre aqui'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL PERFIL (ESTILO CLEAN) */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative text-gray-800 p-8">
            <h3 className="font-black uppercase italic text-[#ff5722] text-xl mb-6">Editar Perfil</h3>
            <div className="space-y-5">
              <div className="flex justify-center mb-4">
                <img src={editPhoto || "https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"} className="w-24 h-24 rounded-full border-4 border-orange-50 object-cover shadow-lg" alt="Preview" />
              </div>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Seu nome" className="w-full bg-gray-50 p-4 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#ff5722]" />
              <input type="text" value={editPhoto} onChange={(e) => setEditPhoto(e.target.value)} placeholder="Link da foto" className="w-full bg-gray-50 p-4 rounded-2xl text-xs text-blue-500 outline-none focus:ring-2 focus:ring-[#ff5722]" />
              <button onClick={handleUpdateProfile} disabled={updateLoading} className="w-full bg-[#ff5722] text-white font-black py-4 rounded-2xl shadow-lg hover:brightness-110 flex items-center justify-center gap-2">
                {updateLoading ? 'Salvando...' : <><Check size={20} /> Salvar</>}
              </button>
              <button onClick={() => setShowProfileModal(false)} className="w-full text-gray-400 font-bold text-sm">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;