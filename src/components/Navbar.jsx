import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { movieContext } from "../context/MovieContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(movieContext);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { myList, setMyList } = useContext(movieContext);

  const handleSearchTab = (e) => {
    e.stopPropagation();
    setSearchOpen(true);
  };

  const handleSearchQuery = (searchVal) => {
    setSearchQuery(searchVal);
  };

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        // Scrolling up
        setIsScrolledUp(true);
      } else {
        // Scrolling down
        setIsScrolledUp(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = () => {
      setSearchOpen(false);
      setSearchQuery("")
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex  justify-between  text-xs xl:text-base px-5 py-2 md:py-5 transition-all  duration-500 ${
        !isScrolledUp ? "bg-black/95" : "bg-transparent"
      } text-white items-center fixed left-0 right-0 z-50`}
    >
      <div className="flex gap-5 items-center relative group ">
        <ul>
          <li>Netflix</li>
        </ul>
        <ul className=" gap-3 hidden md:flex ">
          <Link to={'/'}>Home</Link>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <Link to={'/mylist'}  className="relative">
            <span>My List</span>
            {myList.length > 0 && (
              <span className="h-1 w-1 bg-green-400 absolute rounded-full">
                {" "}
              </span>
            )}
          </Link>
          <li>Browse by Language</li>
        </ul>
        <button
          className=" "
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdownButton"
        >
          <div className="flex items-center">
            <span>Browse</span>{" "}
            <span>
              <MdOutlineArrowDropDown size={30} />
            </span>
          </div>
        </button>
        <ul
          id="dropdownMenu"
          role="menu"
          aria-labelledby="dropdownButton"
          className=" hidden
           text-white border-t-white border-t-4 
            flex-col z-10 bg-black/80 absolute top-12
          "
        >
          <li
            role="menuitem"
            className=" text-center w-full text-nowrap py-5 px-14  hover:bg-black hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            Home
          </li>
          <li
            role="menuitem"
            className=" text-center w-full text-nowrap py-5 px-14  hover:bg-black hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            Tv Shows
          </li>
          <li
            role="menuitem"
            className=" text-center w-full text-nowrap py-5 px-14  hover:bg-black hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            Movies
          </li>
          <li
            role="menuitem"
            className=" text-center w-full text-nowrap py-5 px-14  hover:bg-black hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            New & Popular
          </li>
          <li
            role="menuitem"
            className=" text-center w-full text-nowrap py-5 px-14  hover:bg-black hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            My List
          </li>
          <li
            role="menuitem"
            className=" text-center w-full text-nowrap py-5 px-14  hover:bg-black hover:opacity-50 transition-opacity duration-300 ease-in-out"
          >
            Browse by Language
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <ul className="flex gap-2 items-center">
          {/* Search Bar */}
          <li
            className={`flex gap-2 items-center ${searchOpen && "border"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Icon */}
            <CiSearch onClick={handleSearchTab} size={30} />

            {/* Search Input with Animation */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                searchOpen ? "max-w-[200px]" : "max-w-0"
              }`}
            >
              <input
                type="text"
                value={searchQuery}
                placeholder="Title, people, genre"
                className="bg-inherit border-none outline-none w-full"
                onChange={(e) => handleSearchQuery(e.target.value)}
              />
            </div>

            {/* Clear Button */}
            {searchQuery.length > 0 && (
              <RxCross2 onClick={handleClearSearchQuery} size={25} />
            )}
          </li>

          {/* Notification Icon */}
          <li>
            <FaRegBell size={25} />
          </li>

          {/* Profile Icon */}
          <li className="flex items-center">
            <span className="border h-8 w-8 inline-block"></span>
            <MdOutlineArrowDropDown size={30} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
