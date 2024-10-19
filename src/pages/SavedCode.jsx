import React, { useState, useEffect } from "react";
import ListCard from "../Components/ListCard";
import GridCard from "../Components/GridCard";
import Toggle from "../Toggle";
import { api_url } from "../api_url";
import { useNavigate } from "react-router-dom";

const SavedCode = () => {
  const [gridLayout, setGridLayout] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");

  // Filtering the data based on searchquery

  const filterData = data
    ? data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
    window.location.reload();
  };

  const createProject = (e) => {
    if (projectTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setButtonClicked(false);
            setProjectTitle("");
            alert("Project Created Successfully");
            navigate(`/saved/${data.projectId}`);
            window.location.reload();
          }
        });
    }
  };

  const getProjects = () => {
    fetch(api_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    fetch(api_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
        } else {
          setUserError(data.message);
        }
      });
  }, []);

  const deleteProject = (id) => {
    fetch(api_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          getProjects(); // Refresh the project list after deletion
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-5 md:p-10">
        <Toggle />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Hi, {userData ? userData.username : ""} 👋
          </h2>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-blue-700"
              onClick={() => setGridLayout(!gridLayout)}
            >
              Toggle Layout
            </button>
            <button
              onClick={Logout}
              className="bg-red-500  p-1 rounded-md font-semibold py-2 px-4 hover:text-slate-300 hover:bg-pink-500 transition duration-300 "
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search Here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full md:w-1/3"
          />
          <button
            onClick={() => setButtonClicked(true)}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2 transition duration-300 hover:bg-blue-700"
          >
            +
          </button>
        </div>

        <div
          className={`grid gap-6 ${gridLayout ? "grid-cols-3" : "grid-cols-1"}`}
        >
          {filterData.length > 0 ? (
            filterData.map((item, index) =>
              gridLayout ? (
                <GridCard key={index} item={item} />
              ) : (
                <ListCard key={index} item={item} />
              )
            )
          ) : (
            <p className="text-gray-500">No projects available</p>
          )}
        </div>

        {buttonClicked && (
          <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-5">
              <h1 className="text-2xl font-bold text-center mb-4">
                Create a New Project
              </h1>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter a project title here..."
                className="w-full p-2 border border-gray-300 rounded mb-3"
              />
              <div className="flex items-center mb-5">
                <label htmlFor="isPublic" className="mr-2">
                  Is Public
                </label>
                <input type="checkbox" id="isPublic" className="h-5 w-5" />
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-green-500 min-w-[49%] cursor-pointer p-2 px-4 text-white rounded-md transition duration-300 hover:bg-green-600"
                  onClick={createProject}
                >
                  Create
                </button>
                <button
                  className="bg-red-500 min-w-[49%] cursor-pointer p-2 px-4 text-white rounded-md transition duration-300 hover:bg-red-600"
                  onClick={() => setButtonClicked(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedCode;
