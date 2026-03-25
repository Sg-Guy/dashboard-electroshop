import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Truck,
  User,
  MapPin,
  Package,
  CreditCard,
  Calendar,
  Edit2Icon,
} from "lucide-react";

const CategoryDetailModal = ({ isOpen, onClose, category }) => {
  if (!category) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="lg:ml-64 fixed inset-0 z-[100] flex items-center justify-center p-8">
                {/* Overlay sombre */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                />
        
                {/* Contenu */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="lg:ml-10 relative w-full max-w-3xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black dark:text-white">
                    {category.name}
                  </h2>
                  <span
                    className={`px-3 py-1   rounded-full text-[10px] font-bold uppercase tracking-wider ${category.product != null ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {category.product != null ? `-${category.product.length} produits` : "0 produit"}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Plus d'info sur la catégorie
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 lg:p-8">
              <div>
                <p>
                  {category.description || "Aucune description disponible pour cette catégorie."}
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black text-slate-400 uppercase mb-4 flex items-center gap-2">
                      <Calendar size={14} /> Créée le <br /> 
                    </h3>
                    <p className="font-bold dark:text-white">
                      {new Date(category.created_at).toLocaleDateString(
                      
                      'fr-FR' , {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'  
                      }
                      
                    )}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black text-slate-400 uppercase mb-4 flex items-center gap-2">
                      <Edit2Icon size={12} /> Modifiée le   
                    </h3>
                    <p className="font-bold dark:text-white">
                      {new Date(category.updated_at).toLocaleDateString(
                      
                      'fr-FR' , {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'  
                      }
                      
                    )}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300">
                      <Package size={20} />
                      <span className="text-[10px] font-bold mt-2 uppercase">
                        {category.product.length} produits liés
                      </span>
                    </div>
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-500/20">
                      <Truck size={20} />
                      <span className="text-[10px] font-bold mt-2 uppercase">
                        Modifier
                      </span>
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                  <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                    Quelques produits de cette catégorie 
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-bold uppercase">
                        <tr>
                          <th className="px-6 py-4">Produit</th>
                          <th className="px-6 py-4 text-center">Prix</th>
                          <th className="px-6 py-4 text-center">Associé le</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {category.product?.map((prod) => (
                          <tr key={prod.id}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border dark:border-slate-700">
                                  <img
                                    src={`http://localhost:8000/storage/${prod.image}`}
                                    alt={prod.nom}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://ui-avatars.com/api/?name=" +
                                        prod.name;
                                    }}
                                  />
                                </div>
                                <span className="font-bold text-sm dark:text-slate-200">
                                  {prod.nom}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm dark:text-slate-400">
                                {prod.prix_promo ? prod.prix_promo.toLocaleString() : prod.prix_unitaire.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm dark:text-slate-400">
                                {new Date(prod.created_at).toLocaleDateString(
                                  'fr-FR' , {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'  
                                  }
                                )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CategoryDetailModal;
