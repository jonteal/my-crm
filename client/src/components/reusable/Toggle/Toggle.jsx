import { useContext } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeContext } from "../../../context";

export const Toggle = () => {
  // const theme employs ThemeContext with useContext hook
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  return (
    <div className="toggle w-12 h-6 rounded-2xl border-slate-300 bg-slate-50 fixed top-3 left-4 z-10 flex items-center justify-around">
      <div
        className="toggle-button w-6 h-6 rounded-full bg-sky-800 absolute cursor-pointer flex flex-row items-center"
        onClick={handleClick}
        style={{ left: theme.state.darkMode ? 0 : 25 }}
      >
        <BsFillSunFill className="w-4 h-4" />
        <BsMoonFill className="w-4 h-4" />
      </div>
    </div>
  );
};
