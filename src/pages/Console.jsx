import React from "react";

import Navbars from "../Components/Navbars";

const Console = () => {
  return (
    <>
      <Navbars />
      <h1 className="">Console</h1>
      <iframe
        id="iframe"
        className="w-[50%] min-h-[82vh] bg-[#fff] text-black"
        title="output"
       
      />
    </>
  );
};

export default Console;
