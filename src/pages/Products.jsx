import React, { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Search,
  Menu,
  X,
  Bell,
  Upload,
  Save,
  DollarSign,
  Package,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ordinateur from "../assets/ordinateur.jpg";
import SideBar from "./SideBar";
import Header from "./header";
import ProductModal from "./ProductModal";
import EditProductModal from "./EditProduct";
import { useNavigate } from "react-router-dom";
import url from "../utils/url";

const ProductPage = () => {
  // const { isDarkMode  } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isDarkMode } = useTheme;

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  //Navigation 

  const navigation = useNavigate() ;
  const NavigateToDetail = ()=>{
    navigation(`${url}/product/1`) ;
  }
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      categorie: "Smartphones",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta nulla mollitia dolores error laborum, porro doloremque voluptatem id excepturi debitis consequatur distinctio magnam minus ducimus, alias unde accusamus sed." ,
      image: ordinateur,
      prix_promo: 899,
      prix_unitaire: 1199,
      stock: 45,
    },
    {
      id: 2,
      name: "MacBook Air M3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta nulla mollitia dolores error laborum, porro doloremque voluptatem id excepturi debitis consequatur distinctio magnam minus ducimus, alias unde accusamus sed." ,
      categorie: "Ordinateurs",
      image: ordinateur,
      prix_promo: 899,
      prix_unitaire: 1399,
      stock: 23,
    },
    {
      id: 3,
      name: "AirPods Pro",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta nulla mollitia dolores error laborum, porro doloremque voluptatem id excepturi debitis consequatur distinctio magnam minus ducimus, alias unde accusamus sed." ,
      categorie: "Audio",
      image: ordinateur,
      prix_unitaire: 250,
      prix_promo: 899,
      stock: 89,
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta nulla mollitia dolores error laborum, porro doloremque voluptatem id excepturi debitis consequatur distinctio magnam minus ducimus, alias unde accusamus sed." ,
      categorie: "Smartphones",
      image: ordinateur,
      prix_unitaire: 899,
      prix_promo: 899,
      stock: 8,
    },
  ];

  const cats = [
    {
      id: 1,
      name: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
    {
      id: 2,
      name: "PC",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
    {
      id: 3,
      name: "Ecouteur",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
  ];

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()) ||
      p.categorie.toLowerCase().includes(searchItem.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div
        className="absolute inset-0 z-0 opacity-30 dark:opacity-10"
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

      {/* CONTENU PRINCIPAL */}
      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        {/* TOPBAR MOBILE & DESKTOP */}

        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className=" lg:px-8 py-3">
          <p className="dark:text-white text-3xl font-bold">Produits</p>
          <p className="text-slate-500">Gérez les produits efficacement.</p>
        </div>

        <div className="p-4 lg:p-8 space-y-6">
          {/* ACTIONS & RECHERCHE */}
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
              className="cursor-pointer w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              <Plus size={20} />{" "}
              <span className="whitespace-nowrap">Nouveau produit</span>
            </button>
          </div>

          {/* TABLEAU AVEC SCROLL HORIZONTAL MOBILE */}
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
                      <TableRow key={product.id} product={product} onEdit = {handleEditClick}  nav={NavigateToDetail}/>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-slate-500 italic dark:text-slate-400"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Search size={40} className="opacity-20" />
                          <p>Aucun produit ne correspond à "{searchItem}"</p>
                        </div>
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
      </main>
    </div>
  );
};

const TableRow = ({ product , onEdit , nav }) => {
  const isLowStock = product.stock < 15;

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
    >
      {/* PRODUIT AVEC IMAGE */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-100 dark:border-slate-700">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {product.name}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
        {product.categorie}
      </td>

      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
        {product.prix_unitaire} €
      </td>

      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
        {product.stock} unités
      </td>

      {/* STATUT AVEC BADGE */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            isLowStock
              ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
              : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
          }`}
        >
          {isLowStock ? "Stock faible" : "En stock"}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4">
        <div className="flex justify-center items-center gap-2">
          <ActionButton
            click={nav}
            icon={<Eye size={18} />}
            color="text-blue-500"
            hover="hover:bg-blue-50 dark:hover:bg-blue-900/30"
            title="Voir"
          />
          <ActionButton
            click={() => onEdit(product)}
            icon={<Pencil size={18} />}
            color="text-slate-500"
            hover="hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Editer"
          />
          <ActionButton
            click={() => setEditModalOpen(true)}
            icon={<Trash2 size={18} />}
            color="text-red-500"
            hover="hover:bg-red-50 dark:hover:bg-red-900/30"
            title="Supprimer"
          />
        </div>
      </td>
    </motion.tr>
  );
};

// Petit composant interne pour les boutons d'action
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
