import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Save, DollarSign, Layers, Plus } from "lucide-react";
import { postProduct } from "../ApiSevice/api";
import successDiv from "./succesDiv";

const ProductModal = ({ isOpen, onClose, categories }) => {
  const [validationErrors , setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    category_id: "",
    description: "",
    quantite: "",
    stock: "",
    prix_unitaire: "",
    prix_promo: "",
    vedette: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
      return;
    }
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "number"
            ? Number(value)
            : value,
    });
  };
  // Au clic du bouton submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Utilisation de FormData pour supporter l'envoi d'image
    const data = new FormData();
    data.append("category_id", formData.category_id);
    data.append("nom", formData.nom);
    data.append("description", formData.description);
    data.append("stock", formData.stock);
    data.append("prix_unitaire", formData.prix_unitaire);
    data.append("prix_promo", formData.prix_promo);
    data.append("vedette", formData.vedette);
    if (formData.image) {
      data.append("image", formData.image); // Ajoute le fichier
    }

    try {
      const response = await postProduct(data);

      alert ("Le produit a bien été enregistré");
      
      formData.clear ;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // erroreurs de validation Laravel
        const apiErrors = error.response.data.errors;
        const formattedErrors = {};
        Object.keys(apiErrors).forEach(key => {
          formattedErrors[key] = apiErrors[key][0];
        });

        //console.log (formattedErrors) ;
        setValidationErrors(formattedErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="lg:ml-64 fixed inset-0 z-[100] flex items-center justify-center p-4">
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
          className="lg:ml-10 relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="text-blue-500" /> Nouveau Produit
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Nom & Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Nom du produit
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="ex: iPhone 15 Pro"
                  className="form-input-tech"
                  required
                />
                {validationErrors.nom && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.nom}</span>}

              </div>
                
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Catégorie
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="form-input-tech"
                  required
                >
                  <option value="">Sélectionner...</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {validationErrors.category_id && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.category_id}</span>}

              </div>
                
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input-tech"
                placeholder="Détails techniques..."
              ></textarea>
                {validationErrors.description && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.description}</span>}

            </div>
              

            {/* Prix & Promo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <DollarSign size={12} /> Prix Unitaire
                </label>
                <input
                  type="number"
                  name="prix_unitaire"
                  value={formData.prix_unitaire}
                  onChange={handleChange}
                  className="form-input-tech"
                  placeholder="0.00"
                  required
                />
                {validationErrors.prix_unitaire && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.prix_unitaire}</span>}

              </div>
                
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Prix Promo (Optionnel)
                </label>
                <input
                  type="number"
                  name="prix_promo"
                  value={formData.prix_promo}
                  onChange={handleChange}
                  className="form-input-tech"
                  placeholder="0.00"
                />
                {validationErrors.prix_promo && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.prix_promo}</span>}

              </div>
                
            </div>

            {/* Quantité & Stock */}
            <div className="">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Layers size={12} /> Quantité
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="form-input-tech"
                  required
                />
                {validationErrors.stock && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.stock}</span>}

              </div>
                
            </div>

            {/* Vedette & Image */}
            <div className="flex flex-col md:flex-row gap-8 items-center pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="vedette"
                    checked={formData.vedette}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Mettre en vedette
                </span>
              </label>

              <div className="flex-1 w-full">
                <label className="flex flex-col items-center justify-center w-50 h-50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all overflow-hidden">
                  {formData.image ? (
                    <img
                      src={
                        typeof formData.image === "string"
                          ? `http://localhost:8000/storage/${formData.image}`
                          : URL.createObjectURL(formData.image)
                      }
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload
                        className="text-slate-400 mx-auto mb-2"
                        size={24}
                      />
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                        Uploader l'image
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                {validationErrors.image && <span className="text-[10px] font-bold text-red-500 ml-2 italic tracking-tighter">{validationErrors.image}</span>}

                </label>
                  
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 cursor-pointer rounded-2xl font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Annuler
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled = {isLoading}
                className={`flex-2  flex items-center ${isLoading ? '' : "cursor-pointer"}  justify-center gap-2 ${isLoading ? "bg-slate-600 hover:bg-slate-700": "bg-blue-600 hover:bg-blue-700"} text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none `}
              >
                {
                  isLoading ? "En Cours..." : "Enregistrer"
 
                }
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default ProductModal;
