import { FaTable, FaWindowMaximize, FaCreditCard } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ClientViewNav = ({ clientData }) => {
  // const { companyName } = clientData.client;
  return (
    <div
      id="Main"
      className="transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-screen border w-full sm:w-64 bg-slate-50 flex-col ml-10 rounded-xl"
    >
      <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
        {/* <p className="text-2xl leading-6 text-slate-700">
          {companyName} Dashboard
        </p> */}
      </div>
      <div className="flex flex-col justify-start items-center px-6 w-full  ">
        <div
          id="menu1"
          className="flex justify-start  flex-col w-full md:w-auto items-start pb-1 "
        >
          <NavLink
            to="dashboard"
            className="flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded px-3 py-3 w-full md:w-52"
          >
            <FaWindowMaximize className=" text-indigo-500" />
            <p className="text-base leading-4">Dashboard</p>
          </NavLink>
          <NavLink
            to="tables"
            className="flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded px-3 py-3 3w-full md:w-52"
          >
            <FaTable className="text-rose-500" />
            <p className="text-base leading-4">Tables</p>
          </NavLink>
          <NavLink
            to="billing"
            className="flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded px-3 py-3 w-full md:w-52"
          >
            <FaCreditCard className="text-green-500" />
            <p className="text-base leading-4">Billing</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ClientViewNav;
