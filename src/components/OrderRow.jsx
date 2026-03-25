import { motion } from "framer-motion";
import ActionButton from "./ActionButton";
import { Eye, ShoppingBag } from "lucide-react";

const OrderRow = ({ order, onStatusChange, nav }) => {
  
  const statusConfig = {
    "en cours": { label: "En attente", color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20" },
    "expediee": { label: "Expédiée", color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20" },
    "remboursee": { label: "Remboursée", color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" },
    "annulee": { label: "Annulée", color: "bg-red-50 text-red-600 dark:bg-red-900/20" },
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
            <ShoppingBag size={20} />
          </div>
          <span className="font-bold text-slate-700 dark:text-slate-200">#{order.id}</span>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-700 dark:text-slate-200">{order.user.name}</span>
          <span className="text-xs text-slate-500">{order.user.email}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
        {order.created_at}
      </td>

      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
        {order.total.toLocaleString()} F
      </td>

      <td className="px-6 py-4">
        <select 
          value={order.status}
          onChange={(e) => onStatusChange(order.reference, e.target.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold border-none cursor-pointer outline-none ${statusConfig[order.status]?.color}`}
        >
          <option value="en cours">En attente</option>
          <option value="expediee">Expédiée</option>
          <option value="remboursee">Remboursée</option>
          <option value="annulee">Annulée</option>
        </select>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center">
          <ActionButton
            click={() => nav()}
            icon={<Eye size={18} />}
            color="text-blue-500"
            hover="hover:bg-blue-50 dark:hover:bg-blue-900/30"
          />
        </div>
      </td>
    </motion.tr>
  );
};
export default OrderRow;