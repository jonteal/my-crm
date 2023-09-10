const EditButton = ({ children }) => {
  return (
    <button
      href="#_"
      className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm border"
    >
      {children}
    </button>
  );
};

export default EditButton;
