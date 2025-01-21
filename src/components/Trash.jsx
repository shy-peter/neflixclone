import React from "react";
import hero from "../assets/images/hero.jpg";
import netflixN from "../assets/images/netflixN.svg";
import top10 from "../assets/images/top10.png";

const movies = [
  { title: "Orange is the New Black", img: "https://i.pravatar.cc/300" },
  { title: "Ugly Betty", img: "https://i.pravatar.cc/300" },
  { title: "Big", img: "https://i.pravatar.cc/300" },
  { title: "The Apprentice", img: "https://i.pravatar.cc/300" },
  { title: "Veep", img: "https://i.pravatar.cc/300" },
];

const Trash = () => {
  return (
    <div className="relative min-h-screen text-black border">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 z-50">
        <h1 className="text-center text-red-600 uppercase text-3xl font-bold py-5">
          Netflix
        </h1>
      </header>

      {/* Movie Items */}
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-8 pt-24">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative  border group  rounded-lg transition-transform duration-500 ease-in-out hover:scale-125 hover:z-50"
          >
            <div
              className="    text-center "
              style={{
                backgroundImage: `url(${hero})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                WebkitBackgroundSize: "cover",
              }}
            >
              <div className="flex justify-between items-center">
                <img className="w-7 ml-1" src={netflixN} alt="" />
                <img className="w-10" src={top10} alt="" />
              </div>
              <p className="text-xl font-bold text-wrap">cyborg</p>

              <p className="text-nowrap absolute bottom-0  font-bold text-xs py-1 rounded-t-md px-2 inline-block w-fit bg-red-600 text-white mx-auto mt-2">
                Recently Added
              </p>
            </div>
            {/* Overlay */}
            <div className=" border w-full hidden   flex-col text-black  duration-500">
              <div className="bg-gray-900 group-hover:flex flex-col gap-3 p-3 hidden ">
                <div className="flex justify-between ">
                  <div className="flex gap-2">
                    <span className="w-[25px] pl-[1px] bg-white hover:bg-white/80 flex items-center justify-center h-[25px] border border-white/80 rounded-full">
                      <FaPlay size={9} color="black" />
                    </span>
                    <span className="w-[25px] flex  items-center  hover:bg-gray-500 justify-center h-[25px] border border-white/80 rounded-full">
                      <FaPlus size={14} />
                    </span>
                    <span className="w-[25px] flex items-center justify-center h-[25px] border border-white/80 rounded-full">
                      <FaRegThumbsUp size={9} />
                    </span>
                  </div>
                  <div>
                    <span className="w-[25px] flex items-center justify-center h-[25px] border border-white/80 rounded-full">
                      <RiArrowDropDownLine size={20} />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 text-gray-400 font-semibold">
                  <span className="border px-2">13+</span>
                  <span>1h 38m</span>
                </div>
                <div className=" max-w-[60%] font-semibold flex flex-wrap gap-1">
                  <span>Exciting</span>
                  <span>Mystery</span>
                  <span>Race Against Time</span>
                </div>
              </div>
            </div>
            {/* extra Content */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trash;
