import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, ShoppingBag, Filter } from "lucide-react";
import BackGround from "../components/background";
import { useTheme } from "../context/ThemeContext";
import SideBar from "../components/SideBar";
import Header from "../components/header";
import StateLayer from "../components/StateLayer";
import OrderRow from "../components/OrderRow";
import { getOrders, updateOrder } from "../ApiSevice/api";
import OrderDetailModal from "../components/OrderDetailsModal";

const OrdersPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const { isDarkMode } = useTheme();

  //pour les details
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  // Simulation de données / États (À lier à ton backend)
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("");

  //fonction pour ouvrir les details
  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };
  const fetchOrders = async () => {
    setIsLoading(true);
    setApiStatus(""); // Réinitialiser le statut avant l'appel API

    // Simuler un appel API
    try {
      const response = await getOrders();
      setOrders(response.data.sales);
    } catch (err) {
      // Gérer les erreurs ici
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toFilter = fetchOrders && orders;

  const filteredOrders = toFilter.filter(
    (order) =>
      order.reference?.toLowerCase().includes(searchItem.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchItem.toLowerCase()),
  );

  const handleStatusChange = async (reference, status) => {
    try {
      const response = await updateOrder(reference, status);

      setOrders((prevOrders) =>
        prevOrders.map((ord) =>
          ord.reference === reference ? { ...ord, status: status } : ord,
        ),
      );

      console.log(`Succès : Commande ${reference} passée en ${status}`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erreur de connexion";
      alert("Erreur lors du changement de statut : " + errorMsg);
    }
  };

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
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white dark:bg-slate-900`}
      >
        <SideBar
          activePage="commandes"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 lg:p-8">
          <StateLayer
            isLoading={isLoading}
            apiStatus={apiStatus}
            onRetry={() => {}}
          >
            <div className="px-4 lg:px-8 py-3">
              <h1 className="dark:text-white text-3xl font-bold">Commandes</h1>
              <p className="text-slate-500">
                Suivez et gérez les commandes clients.
              </p>
            </div>

            <div className="p-4 lg:p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    onChange={(e) => setSearchItem(e.target.value)}
                    type="text"
                    value={searchItem}
                    placeholder="Rechercher par client ou N° commande..."
                    className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                  />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl font-semibold dark:text-white hover:bg-slate-50 transition-all">
                    <Filter size={18} /> Filtrer
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[900px]">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Commande</th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4 text-center">Détails</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredOrders.map((ord) => {
                        return (
                          <OrderRow
                            key={ord.id}
                            order={{
                              id: `ORD-${ord.reference}`,
                              reference: ord.reference, //  pour onStatusChange
                              user: {
                                name: ord.user.name,
                                email: ord.user.email,
                              },
                              created_at: ord.date_commande,
                              total: ord.total,
                              status: ord.status,
                            }}
                            onStatusChange={handleStatusChange}
                            nav={() => handleViewDetail(ord)} // navidation details
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </StateLayer>
        </div>
        <OrderDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          order={selectedOrder}
        />
      </main>
    </div>
  );
};
export default OrdersPage;
