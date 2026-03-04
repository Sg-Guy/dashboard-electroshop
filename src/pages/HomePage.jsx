import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, ShoppingCart, BarChart3, 
  Layers, Settings, ArrowRight, Bell, Sun, Moon 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigation  = useNavigate();
    const NavigateToLogin = ()=>{
        navigation ('/login');
    } ;
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-yellow-400"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* SECTION HERO */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10" 
             style={{ backgroundImage: `linear-gradient(${isDarkMode ? '#334155' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? '#334155' : '#e5e7eb'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-8 border border-blue-100 dark:border-blue-800 shadow-sm"
        >
          <Bell size={18} />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Plateforme d'administration ElectroShop</span>
        </motion.div>

        <motion.h1 
          className="z-10 text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
        >
          Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Admin</span>
        </motion.h1>

        <motion.p 
          className="z-10 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Gérez votre boutique électronique avec puissance et simplicité.<br/>
          <span className="text-lg opacity-80">Interface complète pour la gestion des produits, catégories, commandes et statistiques en temps réel</span>
        </motion.p>

        <motion.button 
          onClick={NavigateToLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="z-10 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none"
        >
          Accéder au Dashboard <ArrowRight size={20} />
        </motion.button>
      </section>

      {/* SECTION STATISTIQUES*/}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Package/>} value="127" label="Produits en stock" color="blue" />
        <StatCard icon={<ShoppingCart/>} value="185" label="Commandes ce mois" color="green" />
        <StatCard icon={<Layers/>} value="5" label="Catégories actives" color="purple" />
        <StatCard icon={<BarChart3/>} value="67K €" label="Revenus (30j)" color="orange" />
      </section>

      {/* SECTION FEATURES */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Fonctionnalités d'administration</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-16">Tous les outils dont vous avez besoin pour gérer efficacement votre boutique</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard icon={<Package/>} title="Gestion des Produits" desc="Ajoutez, modifiez et suivez vos produits en temps réel" />
          <FeatureCard icon={<BarChart3/>} title="Statistiques & Analyses" desc="Consultez les performances et les tendances de vente" />
          <FeatureCard icon={<Layers/>} title="Gestion des Catégories" desc="Organisez votre catalogue par catégories" />
          <FeatureCard icon={<Settings/>} title="Paramètres Avancés" desc="Configurez votre boutique selon vos besoins" />
        </div>
      </section>

      {/* SECTION CTA */}
      <section className="m-8 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6">Prêt à gérer votre boutique ?</h2>
          <p className="opacity-90 mb-10 text-lg">Connectez-vous dès maintenant et accédez à tous les outils d'administration</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-xl">
            Se connecter maintenant <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

// Composant StatCard adapté au Dark Mode
const StatCard = ({ icon, value, label, color }) => {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
    >
      <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center mb-4`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="text-3xl font-bold text-slate-800 dark:text-white">{value}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </motion.div>
  );
};

// Composant FeatureCard adapté au Dark Mode
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-start gap-5 text-left group hover:shadow-md transition-all">
    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-4">{desc}</p>
      <button className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
        En savoir plus <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

export default HomePage;