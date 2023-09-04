import { Link } from "react-router-dom";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

import "./navigation.css";

const Navigation = () => {
  return (
    <div className="flex flex-row justify-between navigation__main-container bg-sky-400 px-20">
      <div className="navigation__company-name bg-sky-700 pt-10 pb-2">
        <Link
          className="mx-3 flex-wrap flex text-2xl text-zinc-100 font-bold"
          to="/"
        >
          My CRM
        </Link>
      </div>

      <MenuDrawer placement="end" />
    </div>
  );
};

export default Navigation;
