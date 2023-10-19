import { Link } from "react-router-dom";
import { MenuDrawer } from "../nav/MenuDrawer/MenuDrawer";
import { Toggle } from "../reusable/Toggle/Toggle";

export const Navigation = () => {
  return (
    <div className="flex flex-row justify-between navigation__main-container bg-gradient-to-r from-sky-400 to-sky-600 px-20">
      <div className="w-48 bg-sky-700 pt-10 pb-2">
        <Link
          className="mx-3 flex-wrap flex text-2xl text-zinc-100 font-bold italic"
          to="/"
        >
          FlowSwift
        </Link>
      </div>
      <Toggle />

      <MenuDrawer placement="end" />
    </div>
  );
};
