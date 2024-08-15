import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Business from "./iaAssistance/business";
import Home from "./iaAssistance/Home";
import HandControl from "./tensorhand/tensorflow";
import BodyDetection from "./tensorbody/tensorbody";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/tensor" element={<HandControl />} />
          <Route path="/tensorb" element={<BodyDetection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
