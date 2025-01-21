const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_apiKey; // Fixed assignment


export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; // Return an empty array if an error occurs
  }
};

export const searchMovies = async (searchPara) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchPara}`
    );
    if (!response.ok) {
      throw new Error(`Failed to search movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching for movies:", error);
    return []; // Return an empty array if an error occurs
  }
};

export const getRandomObject = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

export function shuffleArray(array) {
  // Create a copy of the array to avoid mutating the original
  const newArray = [...array];
  
  // Fisher-Yates (aka Knuth) Shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // Swap the current element with the randomly chosen element
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }
  
  return newArray;
}


export const removeItem = (id) => {
  // Use the filter method to create a new array excluding the object with the given id
  const updatedItems = items.filter(item => item.id !== id);
  setItems(updatedItems);  // Update state with the new array
};