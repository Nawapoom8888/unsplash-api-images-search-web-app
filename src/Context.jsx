import React from "react";

const MyContext = React.createContext();

export const ContextProvider = (props) => {
  const [searchValue, setSearchValue] = React.useState("Vietnam");

  // State to manage the current theme
  const [theme, setTheme] = React.useState(() => {
    // Check if a theme is stored in localStorage, otherwise default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  // Function to toggle between light and dark theme
  const themeSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Effect to store the theme in localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply the current theme to the body class
  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // React.useEffect(() => {
  //   if (mode === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [mode]);

  return (
    <MyContext.Provider
      value={{
        searchValue,
        setSearchValue,
        themeSwitch,
        theme,
        setTheme,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export const useGlobalContext = () => React.useContext(MyContext);
