const ActionButton = ({ icon, color, hover, title, click }) => (
  <button
    onClick={click}
    className={`p-2 rounded-lg transition-all ${color} ${hover}`}
    title={title}
  >
    {icon}
  </button>
);
 export default ActionButton;