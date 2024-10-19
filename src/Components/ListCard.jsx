import React, { useState } from "react";
import { api_url } from "../api_url";
import { useNavigate } from "react-router-dom";

const ListCard = ({ item }) => {
  console.log("Item in ListCard:", item);
  const [deleteShow, setDeleteShow] = useState(false);
  // const [search, setSearch] = useState("");
  const navigate = useNavigate();

  

  const deleteProject = async (id) => {
    console.log("Deleting project with ID:", id);

    try {
      const response = await fetch(api_url + "/deleteProject", {
        mode: "cors", // Optional depending on your setup
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: id, // Ensure this matches backend field name
          userId: localStorage.getItem("userId"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        alert("Project deleted successfully");
        window.location.reload();
      } else {
        alert(data.message || "Error deleting project");
      }
    } catch (error) {
      console.error("Error occurred while deleting project:", error);
      alert("Failed to delete the project");
    } finally {
      setDeleteShow(false);
    }
  };

  return (
    <>
      <div className="listcards w-full flex items-center justify-between bg-white border border-gray-300 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 mb-4">
        <div
          onClick={() => {
            navigate(`/${item._id}`);
          }}
          className="flex items-center gap-4"
        >
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.fqP5oZLC6De4KFXw8KdeygHaHa&pid=Api&P=0&h=220"
            alt="error"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">
              Created on {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
          onClick={() => setDeleteShow(true)}
        >
          Delete
        </button>
      </div>

      {/* Modal with Blur Effect */}
      {deleteShow && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black bg-opacity-50 z-50">
          <div className="maindelte w-[26vw] h-[25vh] bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-center text-xl font-bold text-gray-800">
              Do you want to delete this project?
            </h1>
            <div className="flex justify-around mt-6">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors duration-300"
                onClick={() => deleteProject(item._id)}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors duration-300"
                onClick={() => setDeleteShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListCard;
