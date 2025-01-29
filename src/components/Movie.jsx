import React, { useContext } from "react";
const img_base_url = "https://image.tmdb.org/t/p";
import hero from "../assets/images/hero.jpg";
import netflixN from "../assets/images/netflixN.svg";
import top10 from "../assets/images/top10.png";
import { PiClockAfternoon } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

import { FaPlus } from "react-icons/fa6";
import { FaRegThumbsUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { movieContext } from "../context/MovieContext";
import DoughnutChart from "./DoughnutChart";

const Movie = ({ item, handleFavorite, idx }) => {
  const { myList, setMyList } = useContext(movieContext);

  // className="fade-in-item z-50"
  // style={{ animationDelay: `${idx * 0.1}s` }}

  return (
    <div className="relative         group rounded-lg transition-transform duration-300 hover:scale-125 hover:z-50">
      <div
        className="flex flex-col  justify-between h-[150px] fade-in-item    group-hover:gap-4 bg-cover bg-center group-hover:rounded-t-md "
        style={{
          backgroundImage: `url(${img_base_url}/original/${item?.backdrop_path})`,
          animationDelay: `${idx * 0.1}s`,
        }}
      >
        <div className="flex justify-between  items-center">
          <img
            className="w-5 group-hover:w-6 ml-2"
            src={netflixN}
            alt="Netflix Logo"
          />
          <img className="w-5 group-hover:w-6" src={top10} alt="Top 10 Icon" />
        </div>
        <p className="text-xl font-bold text-white p-2">{item?.title}</p>
        <p className="text-xs font-bold text-white bg-red-600 py-1 px-2 rounded-t-md mx-auto">
          Recently Added
        </p>
      </div>
      {/* Overlay */}
      <div className="opacity-0 absolute right-0 left-0 hidden group-hover:flex scale-95 group-hover:opacity-100 group-hover:scale-100 flex-col gap-3 p-3 bg-black rounded-b-md transition-all duration-300 ease-in-out">
        {/* <div> */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="w-5 h-5 bg-white flex items-center justify-center rounded-full hover:bg-white/80">
              <FaPlay color="black" size={9} />
            </span>
            <button
              onClick={() => handleFavorite(item)}
              className="w-5 h-5 border border-white/80 flex items-center justify-center rounded-full hover:bg-gray-500"
            >
              {myList.some((findItem) => findItem === item) ? (
                <FaCheck color="white" size={10} />
              ) : (
                <FaPlus color="white" />
              )}
            </button>

            <span className="w-5 h-5 border border-white/80 flex items-center justify-center rounded-full">
              <FaRegThumbsUp color="white" size={8} />
            </span>
          </div>
          <span className="w-5 h-5 border border-white/80 flex items-center justify-center rounded-full">
            <RiArrowDropDownLine color="white" size={20} />
          </span>
        </div>
        <div className="flex gap-2 text-xs text-gray-400 font-semibold items-center justify-between">
          <span className="border p-1">{item?.adult ? "18+" : "13+"}</span>
          <span>1h 38m</span>
          <span className="self-center mb-4 ">
            <DoughnutChart rating={item.vote_average} />
          </span>
        </div>
        <div className="text-xs text-white font-semibold flex flex-wrap gap-1 justify-between items-center">
          <span>Exciting</span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
