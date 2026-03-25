import React from "react";
import {
  LayoutDashboard,
  Package,
  Layers,
  LogOut,
  Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import url from "../utils/url";

const SideBar = ({ activePage, closeMobile }) => {
  const navigate = useNavigate();

  // Fonction utilitaire pour naviguer et fermer le menu mobile
  const handleNavigation = (path) => {
    navigate(path);
    if (closeMobile) closeMobile();
  };

  const NavigateToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
<aside className="h-full w-full flex flex-col border-r border-slate-200 dark:border-slate-800">      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          ElectroShop
        </h2>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
          Admin Dashboard
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Tableau de bord"
          active={activePage === "dashboard"}
          click={() => handleNavigation(`${url}`)}
        />
        <SidebarItem
          icon={<Package size={20} />}
          label="Produits"
          active={activePage === "products"}
          click={() => handleNavigation(`${url}/products`)}
        />
        <SidebarItem
          icon={<Layers size={20} />}
          label="Catégories"
          active={activePage === "categories"}
          click={() => handleNavigation(`${url}/categories`)}
        />
        <SidebarItem
          icon={<Database size={20} />}
          label="Commandes"
          active={activePage === "orders"}
          click={() => handleNavigation(`${url}/orders`)}
        />
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={NavigateToLogin}
          className="flex items-center gap-3 text-red-500 font-medium p-3 w-full hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
        >
          <LogOut size={20} /> Déconnexion
        </button>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, click }) => (
  <div
    onClick={click}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
    }`}
  >
    {icon} <span className="font-medium">{label}</span>
  </div>
);

export default SideBar;
