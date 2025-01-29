import { createContext, useEffect, useState } from "react";

export const movieContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState(null);
  // const [myList, setMyList] = useState([]);

  // start
  const [myList, setMyList] = useState(()=>{
    const savedList = localStorage.getItem('myList');
    return savedList?JSON.parse(savedList): []
  });


  useEffect(()=>{
    localStorage.setItem('myList', JSON.stringify(myList))
  },[myList])
  // end
  
  const handleFavorite = (fav) => {
    const checkFav = myList.some((item) => item.id == fav.id);
    
    if (!checkFav) {
      setMyList((oldVal) => [...oldVal, fav]);
    } else {
      setMyList((oldVal) => oldVal.filter((item) => item.id !== fav.id));
    }
  };

  const contextVal = {
    searchQuery,
    setSearchQuery,
    movies,
    myList,
    setMyList,
    setMovies,
    handleFavorite
  };

  return (
    <movieContext.Provider value={contextVal}>{children}</movieContext.Provider>
  );
};
