import React from "react";
import { GoSearch } from "react-icons/go";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { useGlobalContext } from "../Context";
import headerBackground from "../assets/header-bg.jpg";

const Search = () => {
  const { setSearchValue, theme, themeSwitch } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.elements.search.value;

    if (!value) return;

    // console.log(value);

    setSearchValue(value);
  };
  return (
    <div
      className="h-[18rem] w-full"
      style={{
        backgroundImage: `url(${headerBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.35)",
      }}
    >
      <div className="border-test relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-12">
        <button
          className="absolute right-0 top-0 pe-5 pt-5 md:pe-12"
          onClick={themeSwitch}
        >
          {theme === "dark" ? (
            <IoMoon className="text-3xl text-gray-800" />
          ) : (
            <MdSunny className="text-3xl text-gray-100" />
          )}
        </button>

        <div className="border-test mx-5 mb-6">
          <h1 className="mb-2 text-center text-2xl font-semibold text-gray-100 sm:text-3xl">
            Free Images Search
          </h1>
          <p className="flex flex-wrap justify-center text-center text-sm text-gray-100 sm:text-base">
            Access to free and high-quality photos&nbsp;
            <span>(provided by the Unsplash API)</span>
          </p>
        </div>

        <form
          className="border-test duration-300border-gray-100 grid h-10 w-[20rem] grid-cols-[1fr_2.5rem] rounded-full border-2 bg-gray-100 transition-colors dark:bg-gray-900 sm:w-[24rem] md:w-[28rem]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="border-test h-full rounded-s-full bg-inherit px-4 text-sm outline-none dark:text-gray-100"
            name="search"
            autocomplete="off"
            placeholder="e.g. Vietnam"
          />
          <button
            type="submit"
            className="border-test flex items-center justify-center rounded-full bg-inherit"
          >
            <GoSearch className="text-xl text-gray-800 transition-colors duration-300 dark:text-gray-100" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
