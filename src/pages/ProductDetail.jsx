import {
  Package,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Backpack,
  ArrowBigLeft,
} from "lucide-react";
import Header from "../components/header";
import SideBar from "../components/SideBar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ordinateur from "../assets/ordinateur.jpg";
import { useNavigate, useParams } from "react-router-dom";
import url from "../utils/url";
import { getProductDetails } from "../ApiSevice/api";
import StateLayer from "../components/StateLayer";
import BackGround from "../components/background";
import { useTheme } from "../context/themeContext";

const ProductDetail = () => {
  // Navigation
  const navigation = useNavigate();
  const toProducts = () => {
    navigation(`${url}/products`);
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [object, setObject] = useState({});
  const [prod, setProd] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [apiStatus, setApiStatus] = useState(null); 
  const [error, setError] = useState(null);

  const {isDarkMode} = useTheme();

  const { id } = useParams();
  useEffect(() => {
    // AbortController permet d'annuler la requête si le composant est démonté
    const controller = new AbortController();

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getProductDetails(id, {
          signal: controller.signal,
        });
        setProd(response.data.data);
        setObject(response.data);
      } catch (err) {
        if (!err.response) {
        setApiStatus("offline");
        setError("Le serveur est injoignable. Vérifiez votre connexion.");
      } else if (err.response?.status === 500) {
        setApiStatus("server_error");
        setError("Le serveur a rencontré un problème technique.");
      }else if (err.response?.status === 404) {
        setApiStatus("not_found");
        setError("Produit Introuvable.");
      } else {
        setApiStatus("other_error");
        setError(
          err.response.data?.message || "Impossible de charger les données.",
        );
      }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();

    // Fonction de nettoyage (cleanup)
    return () => controller.abort();
  }, [id]);

  console.log(isLoading ? null : object.category_name);
  const product = isLoading ? {} : prod;
  //console.log(product) ;
  /*{
  
    id: 1,
    nom: "iPhone 15 Pro",
    categorie: "Smartphones",
    image: ordinateur,
    prix_unitaire: 1199,
    prix_promo: 1000,
    description:
      "Le dernier iPhone avec puce A17 Pro, écran Super Retina XDR de 6.1 pouces, et système de caméra triple avancé.",
    stock: 3,
    vedette: 1,
  } ; */
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <BackGround isDarkMode={isDarkMode} />

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-0 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white dark:bg-slate-900`}
      >
        <SideBar
          activePage="products"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 lg:p-8">
          <StateLayer
          
            isLoading={isLoading} 
            apiStatus={apiStatus} 
            error={error} 
            onRetry={null}>
            {
              product != undefined ? (
                  <div>
                <div className="flex ml-4 gap-2 p-3 dark:text-white">
              <button onClick={toProducts} className="cursor-pointer ">
                <ArrowBigLeft size={24} />
              </button>{" "}
              Retour
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
                      src={`http://localhost:8000/storage/${product.image}`}
                      alt={product.nom}
                      className="w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                          {product.nom}
                        </h1>
                        {product.stock < 15 ? (
                          <span className="px-3 py-1 bg-red-50 text-red-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-bold rounded-full">
                            En rupture
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-bold rounded-full">
                            En stock
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-blue-600">
                          {product.prix_unitaire} F
                        </p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">
                          Prix normal
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
                    <InfoRow label="Catégorie" value={object.category_name} />
                    <InfoRow label="Stock" value={product.stock} />
                    <InfoRow
                      label="En vedette ?"
                      value={product.vedette == 1 ? "Oui" : "Non"}
                    />
                  </InfoBlock>

                  <InfoBlock title="INFORMATIONS FINANCIÈRES">
                    <InfoRow
                      label="Prix Unitaire"
                      value={product.prix_unitaire}
                    />
                    <InfoRow
                      label="Prix Promo"
                      value={product.prix_promo ?? "-"}
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
                    label={object.ventes}
                    sub="Ventes totales"
                    bg="bg-blue-50 dark:bg-blue-900/20"
                  />
                  <StatRow
                    icon={<DollarSign className="text-emerald-500" />}
                    label={object.revenus}
                    sub={`Revenus générés ${product.prix_promo ? "--Sous Promotion" : ""}`}
                    bg="bg-emerald-50 dark:bg-emerald-900/20"
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
                    // Si date au format ISO "2025-12-16T16:00:32.000000Z" , formatage
                    date={new Date(product.created_at).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  />
                  <DateRow
                    icon={<Clock size={18} />}
                    label="Dernière modification"
                    date={new Date(product.updated_at).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
              ) : <p>ghjkl</p>
            }
          </StateLayer>
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
