import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./header";
import { Eye, Folder, Pencil, Trash2 } from "lucide-react";

const Categorie = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const cats = [
    {
      id: 1,
      nom: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
    {
      id: 2,
      nom: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 0,
    },
    {
      id: 3,
      nom: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
    {
      id: 3,
      nom: "Smartphones",
      description: "Téléphones intelligents et accessoires",
      prod_number: 43,
    },
  ];

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
          activePage="categories"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className=" lg:px-8 py-3">
          <p className="dark:text-white text-3xl font-bold">Catégories</p>
          <p className="text-slate-500">Gestion des catégories</p>
        </div>

        <div className=" lg:px-8 py-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {cats.map((cat) => (
            <CategorieCard
              key={cat.id}
              nom={cat.nom}
              description={cat.description}
              prod_number={cat.prod_number}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const CategorieCard = ({ nom, description, prod_number }) => {
  return (
    <div className="max-w-sm p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm group">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <Folder size={24} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div className="flex items-center gap-2">
          <button className="cursor-pointer p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
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
          {nom}
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
