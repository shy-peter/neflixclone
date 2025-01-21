import React, { useContext } from "react";
import { movieContext } from "../context/MovieContext";
import Movie from "./Movie";
import { FaPlus } from "react-icons/fa";

const MyList = () => {
  const { myList, handleFavorite } = useContext(movieContext);

  return (
    <div className="w-full h-screen bg-gradient-to-r pt-16 md:pt-20 text-white from-blue-500 via-green-500 via-yellow-500 via-red-500 to-purple-500 overflow-hidden">
      <p className="font-bold">My List</p>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 mt-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4">
        {myList.map((item) => {
          return (
            <Movie
              key={item.id}
              item={item}
              handleFavorite={handleFavorite}
              cardAction={<FaPlus />}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyList;
