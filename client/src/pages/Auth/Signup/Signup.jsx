// STATE
import { useContext, useState } from "react";
import { ThemeContext } from "../../../context";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";

export const Signup = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  return (
    <div className="flex flex-col items-center mt-20">
      <label
        className={`block uppercase tracking-wide ${
          darkMode ? "text-slate-50" : "text-gray-700"
        }  text-xs font-bold py-3`}
        htmlFor="username-input"
      >
        Username
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        id="username-input"
        type="text"
        placeholder="Username"
        className={`block rounded-md tracking-wide ${
          darkMode ? "text-slate-700" : "text-slate-700 border"
        }  text-base font-semibold py-2 px-3`}
      />
      <label
        className={`block uppercase tracking-wide ${
          darkMode ? "text-slate-50" : "text-gray-700"
        }  text-xs font-bold py-3`}
        htmlFor="password-input"
      >
        Password
      </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password-input"
        type="password"
        placeholder="Password"
        className={`block rounded-md tracking-wide ${
          darkMode ? "text-slate-700" : "text-slate-700 border"
        }  text-base font-semibold py-2 px-3`}
      />

      <label
        className={`block uppercase tracking-wide ${
          darkMode ? "text-slate-50" : "text-gray-700"
        }  text-xs font-bold py-3`}
        htmlFor="username-input"
      >
        Company Name
      </label>
      <input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        id="company-input"
        type="text"
        placeholder="Company Name"
        className={`block rounded-md tracking-wide ${
          darkMode ? "text-slate-700" : "text-slate-700 border"
        }  text-base font-semibold py-2 px-3`}
      />
      <DynamicButton className="mt-5" color="red" type="submit">
        Signup
      </DynamicButton>
    </div>
  );
};
