import React from "react";
import Home from "./Blurr";
import { useNavigate } from "react-router";
import Popup from "./Popup";

const Contribute = () => {
  const navigate = useNavigate();

  return (
    <>
      <Home />
      {/* Overlay and Popup */}
      <div className="fixed inset-0">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => navigate(-1)}
        ></div>
        <Popup onClose={() => navigate(-1)} />
      </div>
    </>
  );
};

export default Contribute;
