import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Complete from "./pages/Complete";
import Error from "./pages/Error";

function App() {
  return (
    <Routes>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/complate" element={<Complete />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default App;
