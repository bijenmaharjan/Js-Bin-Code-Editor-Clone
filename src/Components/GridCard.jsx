import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GridCard = ({ item }) => {
  const [gridCardShow, setGridCardShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/${item._id}`);
        }}
        className="gridcard bg-gray-400 w-[270px] h-[180px] cursor pointer hover:bg-slate-400 rounded-lg shadow-lg shadow-black/50 mx-10 p-2 mb-10"
      >
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.fqP5oZLC6De4KFXw8KdeygHaHa&pid=Api&P=0&h=220"
          alt="error"
          className="w-[80px] mix-blend-multiply ml-2"
        />
        <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-[14px] ">
            Created in {new Date(item.date).toDateString()}
          </p>
          <strong
            onClick={() => setGridCardShow(true)}
            className="bg-red-500 text-white cursor-pointer"
          >
            Delete
          </strong>
        </div>
      </div>

      {gridCardShow ? (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-5xl bg-zinc-800 bg-opacity-70 z-50">
          <div className="maindelte w-[26vw] h-[25vh] bg-gray-100 rounded-lg p-4 shadow-lg shadow-zinc-400">
            <h1 className="text-center text-2xl">
              Do you want to delete this project?
            </h1>
            <div className="flex gap-2 mt-[25px]">
              <button className="bg-red-500 min-w-[49%] cursor-pointer p-2 px-12 text-white">
                Delete
              </button>
              <button
                className="bg-gray-500 min-w-[49%] cursor-pointer p-2 px-12 text-white"
                onClick={() => setGridCardShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GridCard;
