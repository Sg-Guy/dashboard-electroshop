import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Save, DollarSign, Package, Layers ,Plus } from "lucide-react";

const ProductModal = ({ isOpen, onClose, categories }) => {
  const [formData, setFormData] = useState({
    nom: "",
    category_id: "",
    description: "",
    quantite: 0,
    stock: 0,
    prix_unitaire: "",
    prix_promo: "",
    vedette: 0,
    image: null
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay sombre */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Contenu du Formulaire */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="text-blue-500" /> Nouveau Produit
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Nom & Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nom du produit</label>
                <input type="text" placeholder="ex: iPhone 15 Pro" className="form-input-tech" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Catégorie</label>
                <select className="form-input-tech">
                  <option value="">Sélectionner...</option>
                  {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
              <textarea rows="3" className="form-input-tech" placeholder="Détails techniques..."></textarea>
            </div>

            {/* Prix & Promo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <DollarSign size={12}/> Prix Unitaire
                </label>
                <input type="number" className="form-input-tech" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                   Prix Promo (Optionnel)
                </label>
                <input type="number" className="form-input-tech" placeholder="0.00" />
              </div>
            </div>

            {/* Quantité & Stock */}
            <div className="">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                   <Layers size={12}/> Quantité
                </label>
                <input type="number" className="form-input-tech" />
              </div>
              
            </div>

            {/* Vedette & Image */}
            <div className="flex flex-col md:flex-row gap-8 items-center pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Mettre en vedette</span>
              </label>

              <div className="flex-1 w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="text-slate-400 mb-2" size={24} />
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Cliquez pour uploader l'image</p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex gap-4">
            <button onClick={onClose} className="flex-1 py-3 px-6 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              Annuler
            </button>
            <button className="flex-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none">
              <Save size={20} /> Enregistrer le produit
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default ProductModal ;