import React from "react";
import TechSpinner from "./TechSpinner";

const StateLayer = ({ isLoading, apiStatus, error, onRetry, children }) => {
  //État de chargement
  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <TechSpinner />
      </div>
    );
  }

  // Gestion des erreurs (Si on n'est pas en succès)
  if (apiStatus && apiStatus !== "success") {
    const isOffline = apiStatus === "offline";
    const isServerError = apiStatus === "server_error";
    const notFound = apiStatus === "not_found";

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 relative">
        {/* Background décoratif (Le gros numéro d'erreur en gris) */}
        <h1 className="text-8xl font-black text-slate-200 dark:text-slate-800 absolute z-0 select-none">
          {isOffline ? "OFF" : isServerError ? "500" : notFound ? "404" : "ERROR"}
        </h1>

        <div className="relative z-10 space-y-4">
          <div
            className={`w-12 h-12 ${isOffline ? "bg-amber-500/20" : "bg-red-500/20"} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <div
              className={`w-3 h-3 ${isOffline ? "bg-amber-500" : "bg-red-500"} rounded-full animate-ping`}
            />
        </div>

         

          <h2
            className={`text-2xl font-black uppercase tracking- ${isOffline ? "text-amber-600" : "text-red-500"}`}
          >
            {isOffline ? "" : notFound ? "" : "Erreur Serveur"}
          </h2>

          <h2
            className={`text-2xl font-black uppercase tracking- ${notFound ? "text-amber-600" : "text-red-500"}`}
          >
            {notFound ? "" : "Erreur Serveur"}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto italic">
            {error || "Une erreur inattendue est survenue."}
          </p>

          {isOffline && onRetry && (
            <button
              onClick={onRetry}
              className={`px-8 py-3 border-2 rounded-2xl font-black transition-all hover:scale-105 ${
                isOffline
                  ? "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                  : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
            >
              Réessayer la requête
            </button>
          )}
        </div>
      </div>
    );
  }

  //Si tout va bien, on affiche le contenu réel (Dashboard, Liste produits)
  return <>{children}</>;
};

export default StateLayer;
