import { useContext } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeContext } from "../../../context";

import "./toggle.css";

export const Toggle = () => {
  // const theme employs ThemeContext with useContext hook
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  return (
    <div className="toggle">
      <div
        className="toggle-button flex flex-row items-center"
        onClick={handleClick}
        style={{ left: theme.state.darkMode ? 0 : 25 }}
      >
        <BsFillSunFill className="toggle-icon" />
        <BsMoonFill className="toggle-icon" />
      </div>
    </div>
  );
};
