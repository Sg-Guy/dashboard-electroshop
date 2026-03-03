import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Header = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className="">
      <div className="sticky top-0 z-30 flex items-center justify-between p-4 dark:bg-slate-900/20 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:px-8 lg:py-6 lg:bg-transparent lg:border-1">
        <button className="p-2 lg:hidden dark:text-white" onClick={onMenuClick}>
        <Menu size={24} />
      </button>

      <div className="hidden lg:block">
        <h1 className="text-2xl font-bold dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm">
          Le suivi de votre activité en temps réel
        </p>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="relative inline-block cursor-pointer p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 ">
          <Bell size={20} className="text-slate-600 dark:text-slate-300"/>

          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-cennter justify-center
           rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white 
           dark:ring-slate-900">
            3
           </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
            AD
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-100  flex items-center justify-center  font-bold">
          <button
            className="cursor-pointer"
            onClick={toggleTheme}
            title={
              isDarkMode ? "passer en mode claire" : "passer en mode sombre"
            }
          >
            {isDarkMode ? (
              <Sun className="" size={25} /> // soleil
            ) : (
              <Moon className="" size={25} /> // lune
            )}
          </button>
        </div>
      </div>
      </div>
    </header>
  );
};
export default Header;
