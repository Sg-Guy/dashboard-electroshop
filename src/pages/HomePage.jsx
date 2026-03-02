import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, 
  BarChart3, Layers, Settings, ArrowRight, Bell 
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SECTION HERO */}
      <section className="relative pt-20 pb-32 flex flex-col items-center text-center px-4 overflow-hidden">

        {/*  Fond avec grille (Grid Pattern) */}
        <div className="absolute inset-1 z-1 opacity-30" 
            style={{ backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} // Gere l'animation d'entrée de la div
          animate={{ opacity: 1, y: 0 }}
          className="z-10 flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-8 border border-blue-100 shadow-lg"
        >
          <Bell size={18} /> {/* icon de notification */}
          <span className="text-sm font-medium">Plateforme d'administration ElectroShop</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="z-10 text-6xl font-extrabold tracking-tight mb-6" // text-6xl pour la taille
        >
          Dashboard <span className="text-slate-800">Admin</span>
        </motion.h1>

        <motion.p 
          className="z-10 text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          Gérez votre boutique électronique avec puissance et simplicité.<br/>
          <span className="text-lg opacity-80">Interface complète pour la gestion des produits, catégories, commandes et statistiques en temps réel</span>
        </motion.p>

        <motion.button 
        onClick={() => {console.log('ddcvbn')}} //gestion du onclik
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
          className="z-10 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200"
        >
          Accéder au Dashboard <ArrowRight size={20} />
        </motion.button>
      </section>

      {/* SECTION STATISTIQUES  */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Package className="text-blue-600"/>} value="127" label="Produits en stock" color="bg-blue-50" />
        <StatCard icon={<ShoppingCart className="text-green-600"/>} value="185" label="Commandes ce mois" color="bg-green-50" />
        <StatCard icon={<Layers className="text-purple-600"/>} value="5" label="Catégories actives" color="bg-purple-50" />
        <StatCard icon={<BarChart3 className="text-orange-600"/>} value="67K €" label="Revenus (30j)" color="bg-orange-50" />
      </section>

      {/* SECTION FEATURES  */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Fonctionnalités d'administration</h2>
        <p className="text-slate-500 mb-16">Tous les outils dont vous avez besoin pour gérer efficacement votre boutique en ligne</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard icon={<Package/>} title="Gestion des Produits" desc="Ajoutez, modifiez et suivez vos produits en temps réel" />
          <FeatureCard icon={<BarChart3/>} title="Statistiques & Analyses" desc="Consultez les performances et les tendances de vente" />
          <FeatureCard icon={<Layers/>} title="Gestion des Catégories" desc="Organisez votre catalogue par catégories" />
          <FeatureCard icon={<Settings/>} title="Paramètres Avancés" desc="Configurez votre boutique selon vos besoins" />
        </div>
      </section>

      {/* SECTION CTA */}
      <section className="m-8 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-20 text-center text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6">Prêt à gérer votre boutique ?</h2>
          <p className="opacity-90 mb-10 text-lg">Connectez-vous dès maintenant et accédez à tous les outils d'administration</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto">
            Se connecter maintenant <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

// Petits composants internes pour la réutilisation
const StatCard = ({ icon, value, label, color }) => (
  <motion.div whileHover={{ y: -8 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <div className="text-3xl font-bold text-slate-800">{value}</div>
    <div className="text-sm text-slate-500">{label}</div>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-5 text-left hover:shadow-md transition-shadow">
    <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500 mb-4">{desc}</p>
      <button className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
        En savoir plus <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

export default HomePage;