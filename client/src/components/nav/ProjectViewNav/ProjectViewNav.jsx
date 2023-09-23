import { BsFillPersonVcardFill, BsActivity } from "react-icons/bs";
import { MdElectricalServices } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";

import { NavLink } from "react-router-dom";

const ProjectViewNav = () => {
  return (
    <div
      id="Main"
      className="transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-10 border w-full bg-slate-50 flex-row ml-2 pr-10 rounded-xl"
    >
      <div className="flex flex-row justify-start items-center px-6 w-full  ">
        <div
          id="menu1"
          className="flex flex-row w-full md:w-auto justify-start pb-1 "
        >
          <NavLink
            to="profile"
            className="flex justify-start items-center space-x-2 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded my-1 px-3 py-2 w-full md:w-30"
          >
            <BsFillPersonVcardFill className="text-lime-500" />
            <p className="text-base leading-4">Profile</p>
          </NavLink>
          <NavLink
            to="services"
            className="flex justify-start items-center space-x-2 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded my-1 px-3 py-2 3w-full md:w-30"
          >
            <MdElectricalServices className="text-rose-500" />
            <p className="text-base leading-4">Services</p>
          </NavLink>
          <NavLink
            to="activity"
            className="flex justify-start items-center space-x-2 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded my-1 px-3 py-2 w-full md:w-30"
          >
            <BsActivity className="text-orange-500" />
            <p className="text-base leading-4">Activity</p>
          </NavLink>
          <NavLink
            to="financials"
            className="flex justify-start items-center space-x-2 hover:text-white focus:bg-sky-600 focus:text-slate-100 hover:bg-sky-300 text-slate-600 rounded my-1 px-3 py-2 w-full md:w-30"
          >
            <GiMoneyStack className="text-green-500" />
            <p className="text-base leading-4">Financials</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewNav;
