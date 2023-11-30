import React from "react";

const MyContext = React.createContext();

export const ContextProvider = (props) => {
  const [mode, setMode] = React.useState("light");
  const [darkMode, setDarkMode] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("Vietnam");

  React.useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const modeSwitch = () => {
    setMode(mode === "dark" ? "light" : "dark");
    setDarkMode((prev) => !prev);
  };

  return (
    <MyContext.Provider
      value={{
        searchValue,
        setSearchValue,
        darkMode,
        setDarkMode,
        modeSwitch,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export const useGlobalContext = () => React.useContext(MyContext);
