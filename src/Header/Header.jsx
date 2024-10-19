import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="main bg-[rgb(242,242,242)] h-14 flex items-center justify-around">
      <div className="flex items-center">
        <div className="p-1 pr-3 bg-[rgb(255,255,255)] ml-5 shadow-sm border font-bold border-b-[rgb(182,173,173)] hover:text-[rgb(0,138,228)] text-[13px] flex gap-4 items-center">
          <span className="ml-2">←</span>
          <Link to="/">Back to JS Bin </Link>
        </div>
      </div>
      <div className="flex gap-10 items-center font-bold text-[13px] ">
        <Link to="/login" className="hover:text-blue-500">
          Account
        </Link>
        <Link to="/" className="hover:text-blue-500">
          Blog
        </Link>
        <Link to="/" className="hover:text-blue-500">
          Help
        </Link>
      </div>
    </div>
  );
};

export default Header;
