import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import AppContext from "./Context/AppContext";
import Explore from "./Pages/Explore/Explore";
import Details from "./Pages/Details/Details";

function App() {
  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore/:mediaType" element={<Explore />} />
            <Route path=":mediaType/:id" element={<Details />} />
            <Route path="search/:id" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext>
  );
}

export default App;
