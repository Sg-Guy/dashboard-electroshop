import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Layers,
  LogOut,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
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
import { useTheme } from "../context/ThemeContext";
import SideBar from "./SideBar";
import Header from "./header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

 
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Simulation de données API
  const salesData = [
    { name: "Jan", ventes: 42000 },
    { name: "Fev", ventes: 50000 },
    { name: "Mar", ventes: 45000 },
    { name: "Avr", ventes: 61000 },
    { name: "Mai", ventes: 55000 },
    { name: "Juin", ventes: 68000 },
  ];

  const products = [
    {
      id : 1 ,
      name : "IPhone 17 pro" ,
      sales : 100,
      revenue : 287000
    } ,
    {
      id : 2 ,
      name : "IPhone 17 pro" ,
      sales : 100,
      revenue : 287000
    } ,
    {
      id : 3 ,
      name : "HP ProBook " ,
      sales : 10,
      revenue : 15709
    } ,
    {
      id : 4 ,
      name : "Casque Audio" ,
      sales : 1000,
      revenue : 200000
    } ,
  ]

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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={` fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <SideBar activePage="dashboard" closeMobile={() => setSidebarOpen(false)} />
      </div>
      
      <main className="z-10 flex-1 lg:ml-64 w-full overflow-x-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)}/>
          <div className=" lg:px-8 py-3">
          <p className="dark:text-white text-3xl font-bold">
            Tableau de Bord
          </p>
          <p className="text-slate-500">
            Vue d'ensemble de la boutique
          </p>
        </div>
        <div className="p-4 lg:p-8 space-y-8">
          {/* STATISTIQUES : Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"> {/*cols-1 (affche une colone
          
          sur mobile) , sm:grid-cols-2 (affiche 2) , lg:grid-cols-4 (affiche 4) */}
            <StatCard
              title="Revenus"
              value="67 000 €"
              trend="+12%"
              icon={<DollarSign />}
              color="bg-emerald-500"
            />
            <StatCard
              title="Commandes"
              value="185"
              trend="+8%"
              icon={<ShoppingCart />}
              color="bg-blue-500"
            />
            <StatCard
              title="Produits"
              value="127"
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

          {/*  Les gra^hiques . responsives  */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ChartContainer title="Évolution des ventes">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDarkMode ? "#1e293b" : "#f1f5f9"}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: isDarkMode ? "#1e293b" : "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ventes"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#colorSales)"
                    animationDuration={2000}
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
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                  />
                  <Bar
                    dataKey="ventes"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* TABLE : Horizontal scroll sur mobile */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold dark:text-white">Top Produits</h3>
            </div>
            <div className="overflow-x-auto"> {/* cette classe permet le scrool horizontal */}
              <table className="w-full text-left min-w-[500px]">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4 uppercase">Produit</th>
                    <th className="px-6 py-4 uppercase">Ventes</th>
                    <th className="px-6 py-4 uppercase text-right">Revenus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {

                    // Je consomme facilement mon API ici
                    products.map((product)=>(
                      <TableRow
                        key={product.id}
                        name={product.name}
                        sales={product.sales}
                        revenue={product.revenue}
                      />
                    ))
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

const SidebarItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
    }`}
  >
    {icon} <span className="font-medium">{label}</span>
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
