import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center  justify-around h-[96px] w-full bg-[rgb(242,242,242)] ">
      <div className="flex mb-6">
        <div className="flex gap-4 text-[#999999] font-bold text-[13px]">
          <Link to="/" className="cursor-pointer">
            About
          </Link>
          <Link to="https://GitHub.com" className="cursor-pointer">
            Github
          </Link>
          <Link to="https://x.com" className="cursor-pointer">
            Twitter
          </Link>
          <Link to="https://Youtube.com" className="cursor-pointer">
            YouTube
          </Link>
          <Link
            to="https://opencollective.com/jsbin/contribute"
            className="cursor-pointer"
          >
            Donate
          </Link>
        </div>
      </div>
      <div className="flex  text-[13px] text-[#999999] mb-6">
        <i>Hack, Learn, Fix, Teach.</i>
      </div>
    </div>
  );
};

export default Footer;
