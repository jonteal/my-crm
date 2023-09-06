const EditButton = ({ children }) => {
  return (
    <button
      href="#_"
      className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
    >
      {children}
    </button>
  );
};

export default EditButton;
