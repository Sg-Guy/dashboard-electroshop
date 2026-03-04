import { Package, DollarSign, TrendingUp, Calendar, Clock, Backpack, ArrowBigLeft } from "lucide-react";
import Header from "./header";
import SideBar from "./SideBar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ordinateur from "../assets/ordinateur.jpg";
import { useNavigate, useParams } from "react-router-dom";
import url from "../utils/url";

const ProductDetail = () => {
  // Navigation 
  const navigation = useNavigate() ;
  const toProducts = ()=> {
    navigation(`${url}/products`) 
  }
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const product = {
    id: 1,
    name: "iPhone 15 Pro",
    categorie: "Smartphones",
    image: ordinateur,
    prix_unitaire: 1199,
    prix_promo: 1000,
    description:
      "Le dernier iPhone avec puce A17 Pro, écran Super Retina XDR de 6.1 pouces, et système de caméra triple avancé.",
    stock: 3,
    vedette: 1,
  } ;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <SideBar
          activePage="products"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex ml-4 gap-2 p-3 dark:text-white">
            <button onClick={toProducts}  className="cursor-pointer ">
                <ArrowBigLeft size={24}/> 
            </button> Retour
        </div>

        <div className="flex ml-4 gap-2 p-3">
            <p className="font-bold text-slate-500 dark:text-white">
                Détails du Produit
            </p>
        </div>
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/*SECTION GAUCHE : HEADER & INFOS*/}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Carte Produit */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-8">
              <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                      {product.name}
                    </h1>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-bold rounded-full">
                      {product.stock < 15 ? "En rupture" : " En stock"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-blue-600">
                      {product.prix_unitaire}
                    </p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest">
                      Prix public
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Grille d'Informations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoBlock title="INFORMATIONS PRODUIT">
                <InfoRow label="Catégorie" value={product.categorie} />
                <InfoRow label="Stock" value={product.stock} />
                <InfoRow
                  label="En vedette ?"
                  value={product.vedette == 1 ? "Oui" : "Non"}
                />
              </InfoBlock>

              <InfoBlock title="INFORMATIONS FINANCIÈRES">
                <InfoRow label="Prix Unitaire" value={product.prix_unitaire} />
                <InfoRow
                  label="Prix Promo"
                  value={product.prix_promo}
                  color="text-emerald-500"
                />
              </InfoBlock>
            </div>
          </div>

          {/*SECTION DROITE : STATS & DATES  */}
          <div className="space-y-6">

            {/* Statistiques Rapides */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Statistiques rapides
              </h3>
              <StatRow
                icon={<Package className="text-blue-500" />}
                label="234"
                sub="Ventes totales"
                bg="bg-blue-50 dark:bg-blue-900/20"
              />
              <StatRow
                icon={<DollarSign className="text-emerald-500" />}
                label="280.8K €"
                sub="Revenus générés"
                bg="bg-emerald-50 dark:bg-emerald-900/20"
              />
              <StatRow
                icon={<TrendingUp className="text-purple-500" />}
                label="+15%"
                sub="vs mois dernier"
                bg="bg-purple-50 dark:bg-purple-900/20"
              />
            </div>

            {/* Dates Importantes */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Dates importantes
              </h3>
              <DateRow
                icon={<Calendar size={18} />}
                label="Créé le"
                date="15/01/2024"
              />
              <DateRow
                icon={<Clock size={18} />}
                label="Dernière modification"
                date="28/02/2024"
              />
            </div>
          </div>
        </div>
        
      </main>
    </div>
  );
};


const InfoBlock = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const InfoRow = ({
  label,
  value,
  color = "text-slate-900 dark:text-white",
}) => (
  <div>
    <p className="text-xs text-slate-400 mb-1">{label}</p>
    <p className={`font-bold ${color}`}>{value}</p>
  </div>
);

const StatRow = ({ icon, label, sub, bg }) => (
  <div className="flex items-center gap-4">
    <div className={`p-3 ${bg} rounded-xl`}>{icon}</div>
    <div>
      <p className="text-xl font-black dark:text-white">{label}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  </div>
);

const DateRow = ({ icon, label, date }) => (
  <div className="flex items-start gap-3">
    <div className="text-slate-300 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-bold dark:text-white">{date}</p>
    </div>
  </div>
);

export default ProductDetail;
