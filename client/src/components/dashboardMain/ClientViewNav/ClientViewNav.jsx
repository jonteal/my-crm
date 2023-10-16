import { useState } from "react";
import { FaTable, FaWindowMaximize, FaCreditCard } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { RiExpandRightLine } from "react-icons/ri";

export const ClientViewNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleNavCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      id="Main"
      className={`flex justify-start items-start h-screen border w-full  bg-slate-50 flex-col ml-2 rounded-xl ${
        !isOpen ? "sm:w-10" : "sm:w-64"
      }`}
    >
      <div
        onClick={handleNavCollapse}
        className={`${
          !isOpen ? "block" : "hidden"
        } w-full flex flex-row justify-center`}
      >
        <RiExpandRightLine className="mt-2 text-lg" />
      </div>
      <div
        className={`flex flex-col justify-start items-center px-6 w-full ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div
          id="menu1"
          className="flex justify-start flex-col w-full md:w-auto items-start pb-1 "
        >
          <div className="flex flex-row w-full justify-end">
            <AiOutlineClose
              onClick={handleNavCollapse}
              className="mt-2 text-lg"
            />
          </div>
          <NavLink
            to="dashboard"
            className="flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded px-3 py-3 w-full md:w-52"
          >
            <FaWindowMaximize className=" text-indigo-500" />
            <p className="text-base leading-4">Dashboard</p>
          </NavLink>
          <NavLink
            to="projects"
            className="flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded px-3 py-3 3w-full md:w-52"
          >
            <FaTable className="text-rose-500" />
            <p className="text-base leading-4">Projects</p>
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
