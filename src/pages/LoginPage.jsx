import React, { useState } from "react";
import { LogIn, Mail, Lock, Sun, Moon, Computer, Phone } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const LoginPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données prêtes pour l'API :", formData);
    // axios.post('/login', formData)...
  };

  return (
    <div className="flex min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950">
      {/* BOUTON THÈME  */}
      <button
        onClick={toggleTheme}
        className="fixed z-50 p-3 rounded-full top-6 right-6 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 border border-slate-200 dark:border-slate-700"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* FORMULAIRE */}
      <div className="flex flex-col justify-center w-full px-8 md:w-1/2 lg:px-24">
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-6 text-white rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 dark:shadow-none">
            <LogIn size={28} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Connexion Admin
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Accédez à votre espace d'administration ElectroShop
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Adresse Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 dark:bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="admin@electroshop.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none active:scale-95"
          >
            Se connecter
          </button>
        </form>
      </div>

      <div className="relative hidden w-1/2 overflow-hidden md:flex bg-[#030712] items-center justify-center">
        {/* Fond : Effet de Grille Tech & Néon */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Cercles d'énergie animés en fond */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 text-center text-white px-12">
          {/* Titre avec effet de lueur (Glow) */}
          <h2 className="text-7xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            ElectroShop
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto mb-6 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-md mx-auto">
            L'écosystème{" "}
            <span className="text-blue-400 font-medium">Electroshop</span> pour la
            gestion de votre inventaire d'articles technologiques.
          </p>
        </div>


        {/* Card 1 : MacBook */}
        <div className="absolute top-24 right-16 p-5 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-[float_6s_ease-in-out_infinite]">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3 border border-blue-500/30">
            <span className="text-2xl"><Computer className="bg-blue-600" /></span>
            
          </div>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
            Performance
          </p>
        </div>

        {/* Card 2 : iPhone - Flotte en bas à gauche */}
        <div className="absolute bottom-24 left-16 p-5 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-[float_8s_ease-in-out_infinite_1s]">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3 border border-purple-500/30">
            <span className="text-2xl"><Phone className="bg-purpule-600" /></span>
          </div>
          <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">
            Mobilité
          </p>
        </div>

        {/* Petit badge Statistique flottant au milieu */}
        <div className="absolute bottom-1/4 right-20 p-3 bg-green-500/10 backdrop-blur-md rounded-full border border-green-500/20 animate-pulse">
          <div className="flex items-center gap-2 px-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-400 font-mono tracking-tighter">
              Actif
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
