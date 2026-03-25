const BackGround = ({ isDarkMode }) => {
  return (
    <div
      className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(${isDarkMode ? "#334155" : "#e5e7eb"} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? "#334155" : "#e5e7eb"} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    ></div>
  );
};
export default BackGround;
