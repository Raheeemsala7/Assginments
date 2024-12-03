import React from "react";
import { Routes, Route } from "react-router-dom";
import PostDetails from "./pages/PostDetails";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default App;
