import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Save,
  DollarSign,
  Package,
  Layers,
  Plus,
  Pencil,
} from "lucide-react";

const EditProductModal = ({ isOpen, onClose, categories, product }) => {
  const [formData, setFormData] = useState({
    nom: "",
    category_id: "",
    description: "",
    stock: 0,
    prix_unitaire: "",
    prix_promo: "",
    vedette: 0,
    image: null,
  });

  // CRUCIAL : Met à jour le formulaire quand le produit change
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        nom: product.nom || "", // attention : vérifie si c'est .nom ou .nom dans ton objet
        category_id: product.category_id || "",
        description: product.description || "",
        prix_unitaire: product.prix_unitaire || "",
        prix_promo: product.prix_promo || "",
        stock: product.stock || "",
        vedette: product.vedette || 0,
        image: product.image || null,
      });
    }
  }, [product, isOpen]);
  // Fonction pour gérer les changements de saisie
  const [errors, setErrors] = useState({});

  // Correction du handleChange pour supporter les fichiers et les nombres
  const handleChange = (e) => {
    const { nom, value, type, checked, files } = e.target;

    let finalValue = value;
    if (type === "checkbox") finalValue = checked ? 1 : 0;
    if (type === "file") finalValue = files[0]; // Stocke l'objet File
    if (type === "number") finalValue = value === "" ? "" : Number(value);

    setFormData((prev) => ({ ...prev, [nom]: finalValue }));
    // Nettoyer l'erreur quand l'utilisateur tape
    if (errors[nom]) setErrors((prev) => ({ ...prev, [nom]: null }));
  };

  // Fonction de validation
  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Le nom est obligatoire";
    if (!formData.category_id)
      newErrors.category_id = "Choisissez une catégorie";
    if (formData.prix_unitaire <= 0) newErrors.prix_unitaire = "Prix invalide";
    if (formData.stock < 0) newErrors.stock = "Le stock ne peut être négatif";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isOpen || !product) return null;

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
              <Pencil className="text-blue-500" /> Modification du Produit
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          <form className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Nom & Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Nom du produit
                </label>
                <input
                  name="nom"
                  type="text"
                  className={`form-input-tech ${errors.nom ? "border-red-500 ring-1 ring-red-500/20" : ""}`}
                  value={formData.nom}
                  onChange={handleChange}
                />
                {errors.nom && (
                  <p className="text-[10px] text-red-500 font-bold italic">
                    {errors.nom}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Catégorie
                </label>
                <select
                  name="category_id"
                  className={`form-input-tech ${errors.category_id ? "border-red-500" : ""}`}
                  value={formData.category_id}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner...</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-[10px] text-red-500 font-bold italic">
                    {errors.category_id}
                  </p>
                )}
              </div>
            </div>

            {/* Description - CORRECTION : Utiliser value et non children */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                rows="3"
                name="description"
                className="form-input-tech"
                placeholder="Détails techniques..."
                value={formData.description}
                onChange={handleChange}
              />
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
                  className={`form-input-tech ${errors.prix_unitaire ? "border-red-500" : ""}`}
                  value={formData.prix_unitaire}
                  onChange={handleChange}
                />
                {errors.prix_unitaire && (
                  <p className="text-[10px] text-red-500 font-bold italic">
                    {errors.prix_unitaire}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Prix Promo
                </label>
                <input
                  type="number"
                  name="prix_promo"
                  className="form-input-tech"
                  value={formData.prix_promo}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Layers size={12} /> Quantité en stock
              </label>
              <input
                type="number"
                name="stock"
                className={`form-input-tech ${errors.stock ? "border-red-500" : ""}`}
                value={formData.stock}
                onChange={handleChange}
              />
              {errors.stock && (
                <p className="text-[10px] text-red-500 font-bold italic">
                  {errors.stock}
                </p>
              )}
            </div>

            {/* Vedette & Image */}
            <div className="flex flex-col md:flex-row gap-8 items-center pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="vedette"
                    className="sr-only peer"
                    checked={formData.vedette === 1}
                    onChange={handleChange}
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Vedette
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
                </label>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Annuler
            </button>
            <button className="flex-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none">
              <Save size={20} /> Enregistrer le produit
            </button>
          </div>
          </form>

          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default EditProductModal;
