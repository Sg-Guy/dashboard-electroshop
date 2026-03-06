import { motion } from "framer-motion";

const TechSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        {/* Anneau extérieur - Rotation lente */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Anneau intérieur - Rotation rapide inverse */}
        <motion.div
          className="absolute inset-2 border-4 border-transparent border-b-purple-500 rounded-full opacity-80"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Point central - Pulsation */}
        <motion.div
          className="absolute inset-[22px] bg-blue-400 rounded-full shadow-[0_0_15px_#3b82f6]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Texte de chargement stylé */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-xs font-black text-slate-500 dark:text-blue-400 uppercase tracking-[0.3em]"
      >
        Synchronisation...
      </motion.p>
    </div>
  );
};

export default TechSpinner;
