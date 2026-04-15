import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/header";
import { Eye, Folder, Pencil, Trash2 } from "lucide-react";
import { getCategories } from "../ApiSevice/api";
import url from "../utils/url";
import { useNavigate } from "react-router-dom";
import StateLayer from "../components/StateLayer";
import BackGround from "../components/background";
import { useTheme } from "../context/themeContext";
import CategoryDetailModal from "../components/CategoryDetail";
import { select } from "framer-motion/client";

const Categorie = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(""); 
  const { isDarkMode } = useTheme();
  //pour les details
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);


     //fonction pour ouvrir les details
  const handleViewDetail = (category) => {
    setSelectedCategory(category);
    setDetailModalOpen(true);
  };

  //API
  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    setApiStatus(""); 
    try {
      const response = await getCategories();
      setCategories(response.data.data);
      setApiStatus("success");
    } catch (err) {
      setError(err);
      setApiStatus("error");
    } finally {
      setIsLoading(false);
    }
  }  

  useEffect(() => {
    fetchCategories();
  } , []) ;

  const cats = fetchCategories && categories /*[
    {
      id: 1,
      name: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
    {
      id: 2,
      name: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 0,
    },
    {
      id: 3,
      name: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
    {
      id: 3,
      name: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
  ]; */

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
          activePage="categories"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-3 lg:p-4">
          <StateLayer
            isLoading={isLoading}
            apiStatus={apiStatus}
            onRetry={() => {}}
          >
                    
        <div className=" lg:px-8 py-3">
          <p className="dark:text-white text-3xl font-bold">Catégories</p>
          <p className="text-slate-500">Gestion des catégories</p>
        </div>
        <div className=" lg:px-8 py-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {cats.map((cat) => (
            <CategorieCard
              key={cat.id}
              name={cat.name}
              description={cat.description}
              prod_number={cat.product.length}
              nav={() => handleViewDetail(cat)}
            />
          ))}
        </div>
          </StateLayer>
        </div>

          <CategoryDetailModal
          
            isOpen={isDetailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            category={selectedCategory}
          />
      </main>
    </div>
  );
};

const CategorieCard = ({ name, description, prod_number , nav }) => {
  
  return (
    <div className="max-w-sm p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm group">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <Folder size={24} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={()=>nav()} className="cursor-pointer p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
            <Eye size={18} />
          </button>
          <button className="cursor-pointer p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <Pencil size={18} />
          </button>
          {prod_number > 0 ? (
            <button disabled className="p-2 text-red-200 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
              <Trash2  size={18} />
            </button>
          ) : (
            <button className="cursor-pointer p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          {name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800 mb-4" />

      {/* Footer : Compteur de produits */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          {prod_number}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-500">
          produits liés
        </span>
      </div>
    </div>
  );
};
export default Categorie;
