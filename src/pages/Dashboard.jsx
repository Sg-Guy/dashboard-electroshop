import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "../context/themeContext";
import SideBar from "../components/SideBar";
import Header from "../components/header";
import { getDashboard } from "../ApiSevice/api";
import StateLayer from "../components/StateLayer";
import BackGround from "../components/background";

const Dashboard = () => {
  const [dashData, setDashData] = useState(null); // Changé à null pour mieux gérer le chargement
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);

  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchDash = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getDashboard();

      setDashData(response.data);
      setApiStatus("success");
    } catch (err) {

      if (!err.response) {
        setApiStatus("offline");
        setError("Le serveur est injoignable. Vérifiez votre connexion.");
      } else if (err.response.status === 500) {
        setApiStatus("server_error");
        setError("Le serveur a rencontré un problème technique.");
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

  useEffect(() => {
    fetchDash();
  }, []);

  // On garde la logique de données pour Recharts comme demandé
  const salesData = dashData?.commandes_mois || [];
  const products = dashData?.top_products || [];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <BackGround isDarkMode={isDarkMode} />
     
      {/* Overlay Mobile */}
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

      {/* Sidebar avec gestion du toggle mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white dark:bg-slate-900`}
      >
        <SideBar
          activePage="dashboard"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />


        {
          products.length == 0 ? <div>
            Aucun produit enrégistré
          </div> : <div className="p-4 lg:p-8">
          {/* ON UTILISE LE COMPOSANT ICI */}
          <StateLayer 
            isLoading={isLoading} 
            apiStatus={apiStatus} 
            error={error} 
            onRetry={fetchDash}
          >
            <div className="p-4 lg:p-8 space-y-8">
            <header className="mb-8">
              <p className="dark:text-white text-3xl font-bold">
                Tableau de Bord
              </p>
              <p className="text-slate-500">Vue d'ensemble de la boutique</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard
                title="Revenus"
                value={`${dashData?.revenu || 0} F cfa`}
                trend="+12%"
                icon={<DollarSign />}
                color="bg-emerald-500"
              />
              <StatCard
                title="Commandes"
                value={dashData?.commandes || 0}
                trend="+8%"
                icon={<ShoppingCart />}
                color="bg-blue-500"
              />
              <StatCard
                title="Produits"
                value={dashData?.products || 0}
                trend="+3"
                icon={<Package />}
                color="bg-purple-500"
              />
              <StatCard
                title="Conversion"
                value="3.2%"
                trend="+0.5%"
                icon={<TrendingUp />}
                color="bg-orange-500"
              />
            </div>

            {/* Section Graphiques*/}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ChartContainer title="Évolution des ventes">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDarkMode ? "#1e293b" : "#f1f5f9"}
                    />
                    <XAxis
                      dataKey="mois"
                      tick={{ fill: "#94a3b8", fontSize: 10 }}
                    />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      fillOpacity={0.3}
                      fill="#3b82f6"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer title="Commandes mensuelles">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDarkMode ? "#1e293b" : "#f1f5f9"}
                    />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Table Top Produits */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold dark:text-white">Top Produits</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">PRODUIT</th>
                      <th className="px-6 py-4">VENTES</th>
                      <th className="px-6 py-4 text-right">REVENUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {products.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-6 py-12 text-center text-slate-500 italic"
                        >
                          Aucune information
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <TableRow
                          key={product.id}
                          name={product.nom}
                          sales={product.sale_count}
                          revenue={`${product.sale_count * product.prix_unitaire} F`}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </StateLayer>
        </div>
        }

       
      </main>
    </div>
  );
};

// HELPERS
const ChartContainer = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
    <h3 className="font-bold mb-6 dark:text-white text-lg">{title}</h3>
    <div className="h-64 sm:h-80">{children}</div>
  </div>
);

const StatCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex justify-between items-center">
    <div>
      <p className="text-xs text-slate-500 font-medium uppercase mb-1">
        {title}
      </p>
      <h4 className="text-xl font-bold dark:text-white">{value}</h4>
      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
        {trend}
      </span>
    </div>
    <div className={`${color} p-3 rounded-2xl text-white`}>{icon}</div>
  </div>
);

const TableRow = ({ name, sales, revenue }) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <td className="px-6 py-4 font-medium dark:text-white text-sm">{name}</td>
    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
      {sales} unités
    </td>
    <td className="px-6 py-4 text-right font-bold text-emerald-500 text-sm">
      {revenue}
    </td>
  </tr>
);

export default Dashboard;
