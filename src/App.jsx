import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ContextProvider } from "./context/MovieContext";
import { Route, Routes } from "react-router-dom";
import MyList from "./components/MyList";

const App = () => {
  return (
    <div>
      <ContextProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mylist" element={<MyList />}></Route>
        </Routes>
      </ContextProvider>
    </div>
  );
};

export default App;
