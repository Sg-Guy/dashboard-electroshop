import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus, Search, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import SideBar from "./SideBar";
import Header from "./header";
import ProductModal from "./ProductModal";
import EditProductModal from "./EditProduct";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { getCategories, getProducts } from "../ApiSevice/api";
import TechSpinner from "./TechSpinner";
import url from "../utils/url";

const ProductPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isDarkMode } = useTheme();

  const [apiStatus, setApiStatus] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const navigation = useNavigate();
  const NavigateToDetail = (id) => {
    navigation(`${url}/product/${id}`);
  };
  const NavigateToLogin = () => {
    navigation("/login" , { replace : true});
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    setApiStatus("");
    try {
      const responses = await getCategories();
      setCategories(responses.data.data);
      //console.log(responses.data.data);

      const response = await getProducts();
      setProductList(response.data.data || []);
      //console.log(response.data.data);
      setApiStatus("success");
    } catch (err) {
      if (!err.response) {
        setApiStatus("offline");
        setError("Le serveur ne répond pas. Vérifiez votre connexion.");
      } else if (err.response.status === 500) {
        setApiStatus("server_error");
        setError("Erreur interne du serveur.");
      } else if (err.response.status === 401) {
        setApiStatus("auth");
        setError("Non authentifié");
      } else if (err.response.status === 403) {
        setApiStatus("forbidden");
        setError("Accès Interdit");
      } else {
        setApiStatus("other_error");
        setError(
          `Erreur ${err.response.status}: ${err.response.data?.message || "Une erreur est survenue"}`,
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cats = fetchProducts && categories; /*[
    {
      id: 1,
      name: "Smartphones",
      description: "Téléphones intelligents",
      prod_number: 43,
    },
    {
      id: 2,
      name: "PC",
      description: "Ordinateurs portables",
      prod_number: 12,
    },
    {
      id: 3,
      name: "Ecouteur",
      description: "Accessoires audio",
      prod_number: 25,
    },
  ];
*/
  const filteredProducts = productList.filter(
    (p) =>
      p.nom?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      p.category_name?.toLowerCase().includes(searchItem?.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div
        className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isDarkMode ? "#334155" : "#e5e7eb"} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? "#334155" : "#e5e7eb"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

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

      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {isLoading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <TechSpinner />
          </div>
        ) : ["offline", "server_error", "auth", "forbidden"].includes(
            apiStatus,
          ) ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
            <h1 className="text-8xl font-black text-slate-200 dark:text-slate-800 absolute -z-10 uppercase">
              {apiStatus === "offline"
                ? <Wifi size={100} />
                : apiStatus === "server_error"
                  ? "500"
                  : apiStatus === "auth"
                    ? "401"
                    : "403"}
            </h1>
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl font-black text-red-500 uppercase tracking-widest">
                Erreur
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm italic">
                {error}
              </p>
              {apiStatus !== "forbidden" && (
                <button
                onClick={NavigateToLogin}
                className="px-8 py-3 bg-blue-600/20 text-white rounded-2xl font-black hover:scale-105 transition-all"
                >
                  S'authentifier
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="px-4 lg:px-8 py-3">
              <p className="dark:text-white text-3xl font-bold">Produits</p>
              <p className="text-slate-500">Gérez les produits efficacement.</p>
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
                    placeholder="Rechercher par nom ou catégorie..."
                    className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                  />
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                >
                  <Plus size={20} />{" "}
                  <span className="whitespace-nowrap">Nouveau produit</span>
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Produit</th>
                        <th className="px-6 py-4">Catégorie</th>
                        <th className="px-6 py-4">Prix</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4">Statut</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <TableRow
                            key={product.id}
                            product={product}
                            onEdit={handleEditClick}
                            nav={() => NavigateToDetail(product.id)}
                          />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-12 text-center text-slate-500 italic dark:text-slate-400"
                          >
                            Aucun produit ne correspond à "{searchItem}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <ProductModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              categories={cats}
            />
            <EditProductModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditModalOpen(false);
                setSelectedProduct(null);
              }}
              categories={cats}
              product={selectedProduct}
            />
          </div>
        )}
      </main>
    </div>
  );
};

const TableRow = ({ product, onEdit, nav }) => {
  const isLowStock = product.stock < 15;
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border dark:border-slate-200">
            <img
              src={`http://localhost:8000/storage/${product.image}`}
              alt={product.nom}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://ui-avatars.com/api/?name=" + product.name; // Génère un avatar si l'image crash
              }}
            />
          </div>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {product.nom}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
        {product.category_name}
      </td>
      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
        {product.prix_unitaire} €
      </td>
      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
        {product.stock} unités
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${isLowStock ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"}`}
        >
          {isLowStock ? "Stock faible" : "En stock"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">
          <ActionButton
            click={nav}
            icon={<Eye size={18} />}
            color="text-blue-500"
            hover="hover:bg-blue-50 dark:hover:bg-blue-900/30"
          />
          <ActionButton
            click={() => onEdit(product)}
            icon={<Pencil size={18} />}
            color="text-slate-500"
            hover="hover:bg-slate-100 dark:hover:bg-slate-800"
          />
          <ActionButton
            click={() => {}}
            icon={<Trash2 size={18} />}
            color="text-red-500"
            hover="hover:bg-red-50 dark:hover:bg-red-900/30"
          />
        </div>
      </td>
    </motion.tr>
  );
};

const ActionButton = ({ icon, color, hover, title, click }) => (
  <button
    onClick={click}
    className={`p-2 rounded-lg transition-all ${color} ${hover}`}
    title={title}
  >
    {icon}
  </button>
);

export default ProductPage;
