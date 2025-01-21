import React, { useEffect, useState } from "react";
import hero from "../assets/images/hero.jpg";
import { FaPlay } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { AiOutlineSound } from "react-icons/ai";
import { getPopularMovies, getRandomObject } from "../api/movieApi";
import Loader from "./Loader";
import DoughnutChart from "./DoughnutChart";

const img_base_url = "https://image.tmdb.org/t/p/";

const MovieDisplay = () => {
  const [randMovie, setRandMovie] = useState({});
  const [isLoading, setIsLoading] = useState("loading");

  const fetchMovieDisplay = async () => {
    setIsLoading("loading");
    const movieDisplay = await getPopularMovies();

    const randMov = await getRandomObject(movieDisplay);
    setIsLoading("complete");
    setRandMovie(randMov);
  };
  useEffect(() => {
    setIsLoading("loading");
    fetchMovieDisplay();
  }, []);

  const title = randMovie.title;
  const description = randMovie.overview;
  console.log(randMovie);
  

  return (
    <>
      {isLoading === "loading" && <Loader />}
      {isLoading === "complete" && (
        <div
          className="h-1/3 md:h-full  bg-cover bg-center bg-no-repeat text-white relative"
          style={{
            backgroundImage: `url(${
              img_base_url + "original" + randMovie.backdrop_path||poster_path
            })`,
          }}

          // ${img_base_url}original${randMovie.backdrop_path}
        >
          <div className="h-full  bg-black bg-opacity-50 px-3 md:px-10 xl:px-24">
            <div className="flex flex-col gap-5 sm:gap-10 xl:gap-20 ">
              {/* Title Section */}
              <p className="text-4xl md:text-5xl font-bold xl:text-[80px] max-w-[50%] xl:max-w-[60%]  italic mt-24 md:mt-40 2xl:mt-52">
                <span className="block">
                  {title?.split(" ").slice(0, 3).join(" ")}{" "}
                  {/* First 3 words */}
                </span>
                <span className="block">
                  {title?.split(" ").slice(3, 5).join(" ")} {/* Next 2 words */}
                </span>
                <span className="block text-right">
                  {title?.split(" ").slice(5).join(" ")} {/* Last words */}
                </span>
              </p>
              {/* Description */}
              <p className="max-w-[70%] text-xs sm:text-base md:text-2xl xl:max-w-[50f%] xl:text-3xl">
                {description}
              </p>
              {/* Buttons and Info */}
              <div className="flex justify-between mb-16 xl:mb-72">
                <div className="flex gap-2 xl:gap-6">
                  <button className="flex items-center xl:text-2xl text-xs sm:text-base gap-2 border py-1 px-5 xl:py-2 xl:px-10 text-black rounded-md bg-white font-semibold xl:font-bold hover:opacity-70">
                    <span>
                      <FaPlay />
                    </span>
                    <span className="-mt-1">Play</span>
                  </button>
                  <button className="flex items-center text-xs sm:text-base xl:text-2xl gap-2 border py-1 px-5 xl:py-2 xl:px-10 text-white rounded-md bg-gray-500/40 font-semibold xl:font-bold hover:opacity-70">
                    <span>
                      <CgDanger size={20} />
                    </span>
                    <span>More Info</span>
                  </button>
                </div>
                {/* Sound and Age Rating */}
                <div className="flex items-center gap-3 absolute right-0 ">
                  <span className="h-7 w-7 rounded-full flex items-center justify-center border">
                    <AiOutlineSound color="white" />
                  </span>
                  <span className=" border-l-4 flex text-xs sm:text-base xl:text-2xl items-center py-1 bg-gray-500/30 px-4">
                    {randMovie.adult ? "18+" : "16 +"}
                  </span>
                </div>
              </div>
            </div>
            Movie List
          </div>
          <DoughnutChart />
        </div>
      )}
    </>
  );
};

export default MovieDisplay;

