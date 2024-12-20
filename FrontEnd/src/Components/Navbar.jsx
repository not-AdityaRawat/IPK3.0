import React, { useState } from "react";
import HamburgerPNG from "../icons/Hamburger Icon.png";
import dropdownBlackPNG from "../icons/dropdownWHite.png";
import { useNavigate} from "react-router-dom";
import { IoBuildOutline } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleclick = () => {
    navigate(`/Contribute`); // Append '/Contribute'
  };

  return (
    <nav className="bg-teal-700 text-white px-4 py-3 flex justify-between items-center">
      <h1
        className="sm:text-3xl text-2xl font-bold hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        IP Survivor's Kit{" "}
      </h1>
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <button
          className="font-bold hover:bg-neutral-700 hover:rounded px-2 py-2 "
          onClick={() => {
            alert("Under Construction 👷‍♂️");
          }}
        >
          Workplace <span className="inline-block"><IoBuildOutline size={20}/></span>{" "}
        </button>

        <button
          className="font-bold hover:bg-neutral-700 hover:rounded px-2 py-2 "
          onClick={() =>
            window.open("https://ip-survivors-kit.vercel.app/", "_blank")
          }
        >
          Previous Versions
        </button>

        <button
          className="font-bold hover:bg-neutral-700 hover:rounded px-2 py-2 "
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </button>
      </div>
      <div className="hidden md:flex space-x-6 items-center">
        <button
          className="font-bold bg-yellow-400 text-black px-4 py-2 rounded"
          onClick={handleclick}
        >
          Contribute{" "}
          <img
            src={dropdownBlackPNG}
            alt="DropDown icon"
            className="w-3.5 h-3 mx-auto inline-block "
          />
        </button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          <span className="material-icons">
            <img
              src={HamburgerPNG}
              alt="HamburgerPNG"
              className="w-5 h-5 mt-2"
            />
          </span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-12 bg-gray-100 text-black shadow-md w-48 rounded-md">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                alert("Under Construction 👷‍♂️");
              }}
            >
              WorkPlace <span className="inline-block"><IoBuildOutline size={20}/></span>
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() =>
                window.open("https://ip-survivors-kit.vercel.app/", "_blank")
              }
            >
              Previous Versions
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </button>
            <button
              className="font-bold w-full bg-yellow-400 text-black px-4 py-2 rounded"
              onClick={handleclick}
            >
              Contribute{" "}
              <img
                src={dropdownBlackPNG}
                alt="DropDown icon"
                className="w-4 h-3 ml-1 inline-block "
              />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
