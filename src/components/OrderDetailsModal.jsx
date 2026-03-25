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
} from "lucide-react";

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const statusConfig = {
    "en cours": {
      label: "En attente",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
    },
    expediee: {
      label: "Expédiée",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20",
    },
    remboursee: {
      label: "Remboursée",
      color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
    },
    annulee: {
      label: "Annulée",
      color: "bg-red-50 text-red-600 dark:bg-red-900/20",
    },
  };

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
        
                {/* Contenu du Formulaire */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="lg:ml-10 relative w-full max-w-3xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
            {/* Header Sticky */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black dark:text-white">
                    ORD-{order.reference}
                  </h2>
                  <span
                    className={`px-3 py-1   rounded-full text-[10px] font-bold uppercase tracking-wider ${statusConfig[order.status]?.color}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Détails complets de la transaction
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Section Gauche : Articles */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] font-bold uppercase">
                        <tr>
                          <th className="px-6 py-4">Article</th>
                          <th className="px-6 py-4 text-center">Prix</th>
                          <th className="px-6 py-4 text-center">Qté</th>
                          <th className="px-6 py-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {order.products?.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border dark:border-slate-700">
                                  <img
                                    src={`http://localhost:8000/storage/${product.image}`}
                                    alt={product.nom}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://ui-avatars.com/api/?name=" +
                                        product.name;
                                    }}
                                  />
                                </div>
                                <span className="font-bold text-sm dark:text-slate-200">
                                  {product.nom}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm dark:text-slate-400">
                                {product.prix_promo ? product.prix_promo.toLocaleString() : product.prix_unitaire.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm dark:text-slate-400">
                                x{product.pivot.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right dark:text-white text-sm">
                              {((product.prix_promo ? product.prix_promo : product.prix_unitaire) * product.pivot.quantity).toLocaleString()} F
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Résumé financier rapide */}
                  <div className="flex gap-10 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                    <div>
                      <p className="text-xs text-red-400 dark :text-blue-400 font-bold uppercase tracking-widest">
                        Date de la commande
                      </p>
                      <p className="pt-4 text-sm text-slate-900 dark:text-white">
                        {new Date(order.date_commande).toLocaleDateString(
                          "fr-Fr",
                          {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "numeric",
                            minute: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                        Total à régler
                      </p>
                      <p className="text-2xl text-slate-900 dark:text-white">
                        {order.total?.toLocaleString()} F
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Droite : Client & Livraison */}
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black text-slate-400 uppercase mb-4 flex items-center gap-2">
                      <User size={14} /> Client
                    </h3>
                    <p className="font-bold dark:text-white">
                      {order.user?.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {order.user?.email}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black text-slate-400 uppercase mb-4 flex items-center gap-2">
                      <MapPin size={14} /> Livraison
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Static
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300">
                      <Printer size={20} />
                      <span className="text-[10px] font-bold mt-2 uppercase">
                        Facture
                      </span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-500/20">
                      <Truck size={20} />
                      <span className="text-[10px] font-bold mt-2 uppercase">
                        Expédier
                      </span>
                    </button>
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

export default OrderDetailModal;
