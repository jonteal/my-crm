import { Link } from "react-router-dom";

export const DynamicButton = ({ link, type, children, className }) => {
  const renderButton = (type) => {
    switch (type) {
      case "submit":
        return (
          <button className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">{children}</span>
          </button>
        );
      case "add":
        return (
          <button className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              {children}
            </span>
          </button>
        );
      case "link":
        return (
          <Link
            to={link}
            className="px-4 py-2 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm border"
          >
            {children}
          </Link>
        );

      case "delete":
        return (
          <button className="px-3 py-2.5 font-medium bg-red-500 hover:bg-red-400 hover:text-slate-50 text-slate-50 rounded-lg text-sm">
            {children}
          </button>
        );

      default:
        break;
    }
  };
  return <div className={className}>{renderButton(type)}</div>;
};
