export const DeleteButton = ({ children }) => {
  return (
    <a
      href="#_"
      className="px-5 py-2.5 font-medium bg-red-500 hover:bg-red-400 hover:text-slate-50 text-slate-50 rounded-lg text-sm"
    >
      {children}
    </a>
  );
};
