import {
  ArrowLeft,
  Folder,
  Package,
  CircleDollarSign,
  Calendar,
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import SideBar from "../components/SideBar";
import { AnimatePresence , motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/header";
import StateLayer from "../components/StateLayer";

const CategoryDetail = ({prod}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  /*const category = {
    id: 1,
    nom: "Smartphones",
    description: "Téléphones intelligents et accessoires",
    prod_number: 43,
    produits: [
      {
        id: 1,
        name: "iPhone 15 Pro",
        image: ordinateur,
        prix_unitaire: 1199,
        stock: 45,
      },
      {
        id: 2,
        name: "iPhone 15 Pro",
        image: ordinateur,
        prix_unitaire: 1199,
        stock: 45,
      },
      {
        id: 3,
        name: "iPhone 15 Pro",
        image: ordinateur,
        prix_unitaire: 1199,
        stock: 45,
      },
    ],
  };*/

  const filteredCat = category.product.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

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
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white dark:bg-slate-900`}
      >
        <SideBar
          activePage="categories"
          closeMobile={() => setSidebarOpen(false)}
        />
      </div>

      <main className="flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
<StateLayer>


        <div className="lg:px-8 py-3">
          {/* HEADER : Titre & Actions Principales */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                <ArrowLeft
                  size={20}
                  className="text-slate-600 dark:text-slate-400"
                />
              </button>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Folder
                  className="text-blue-600 dark:text-blue-400"
                  size={28}
                />
              </div>
              <div>
                <h1 className="text-3xl  text-slate-900 dark:text-white">
                  Smartphones
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Téléphones intelligents et accessoires
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none">
                <Pencil size={18} /> Modifier
              </button>
              <button className="cursor-pointer flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-200 dark:shadow-none">
                <Trash2 size={18} /> Supprimer
              </button>
            </div>
          </div>

          {/* STATS : */}
          <div className="m-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<Package className="text-blue-600" />}
              label="45"
              sub="Produits"
              bg="bg-blue-50 dark:bg-blue-900/20"
            />
            <StatCard
              icon={<CircleDollarSign className="text-orange-600" />}
              label="453K €"
              sub="Revenus totaux"
              bg="bg-orange-50 dark:bg-orange-900/20"
            />
            <StatCard
              icon={<Calendar className="text-purple-600" />}
              label="10/01/2024"
              sub="Date de création"
              bg="bg-purple-50 dark:bg-purple-900/20"
            />
          </div>

          {/* SECTION TABLEAU : Recherche & Liste */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Produits de la catégorie ({category.produits.length})
                </h2>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all">
                  <Plus size={20} /> Ajouter un produit
                </button>
              </div>

              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                />
              </div>
            </div>

            {/* TABLEAU */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-800">
                  <tr className="text-[10px]  text-slate-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-4">Produit</th>
                    <th className="px-8 py-4">Prix</th>
                    <th className="px-8 py-4">Stock</th>
                    <th className="px-8 py-4">Statut</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCat.length > 0 ? (
                    filteredCat.map((catp) => (
                      <ProductRow
                      key={catp.id}
                        name={catp.name}
                        image={catp.image}
                        price={catp.prix_unitaire}
                        stock={catp.stock}
                        status={catp.stock < 15 ? "En rupture" : "En stock"}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-slate-500 italic dark:text-slate-400"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Search size={40} className="opacity-20" />
                          <p>Aucun produit ne correspond à "{search}"</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
</StateLayer>
          
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, sub, bg }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6">
    <div className={`p-4 ${bg} rounded-xl`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-400 font-medium">{sub}</p>
      <p className="text-xl  text-slate-900 dark:text-white">{label}</p>
    </div>
  </div>
);

const ProductRow = ({ name, price, stock, status , image }) => (
  <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
    <td className="px-8 py-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="w-full h-full flex items-center justify-center text-xl">
            <img src={image} className="max-w-20 max-h-20" alt={name} />
          </div>
        </div>
        <span className="font-bold text-slate-700 dark:text-slate-200">
          {name}
        </span>
      </div>
    </td>
    <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">
      {price} €
    </td>
    <td className="px-8 py-5 text-slate-500 dark:text-slate-400 text-sm">
      {stock} unités
    </td>
    <td className="px-8 py-5">
      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-[10px]  uppercase rounded-lg">
        {status}
      </span>
    </td>
    <td className="px-8 py-5 text-right">
      <button className="cursor-pointer text-sm font-bold text-blue-500 hover:text-blue-700 transition-colors">
        Voir détails
      </button>
    </td>
  </tr>
);

export default CategoryDetail;
