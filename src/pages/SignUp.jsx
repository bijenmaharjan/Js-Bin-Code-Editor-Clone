import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "../api_url";
import Header from "../header/Header";
import Footer from "../Footer/Footer";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeLink, setActiveLink] = useState("register");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onsubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(api_url + "/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while signing up.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
        <div className="bg-white p-2 px-6 rounded shadow-md w-80 border border-zinc-500">
          <div className="flex justify-around">
            <Link to="/SignUp" onClick={() => setActiveLink("register")}>
              <div className="flex flex-col items-center">
                <h5 className="text-gray-400">New to JS Bin</h5>
                <h2
                  className={`text-xl text-center mb-6 ${
                    activeLink === "register" ? "text-blue-500" : "text-black"
                  }`}
                >
                  Register
                </h2>
              </div>
            </Link>
            <Link to="/login" onClick={() => setActiveLink("login")}>
              <div className="flex flex-col items-center">
                <h5 className="text-gray-400">Existing users</h5>
                <h2
                  className={`text-xl text-center mb-6 ${
                    activeLink === "login" ? "text-blue-500" : "text-black"
                  }`}
                >
                  Login
                </h2>
              </div>
            </Link>
          </div>

          <form onSubmit={onsubmitForm}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                className="w-full p-1 border border-black rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full p-1 border border-black rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="w-full p-1 border border-black rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-red-500 text-[14px] my-2">{error}</p>
            <div className="flex justify-center mt-7 mb-7">
              <button
                type="submit"
                className="p-[3px] px-14 text-[14px] text-zinc-800 font-bold border border-zinc-600 hover:bg-[rgb(239,239,239)] bg-gray-50 shadow-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-10 w-80">
          <Link
            to="https://github.com/login"
            className="p-3 w-[95%] text-[16px] font-light text-zinc-800 border border-zinc-600 hover:bg-[rgb(239,239,239)] bg-gray-100 shadow-md text-center"
          >
            <div className="flex justify-center">
              <img
                src="https://uploads-ssl.webflow.com/58e32bace1998d6e3fee8d74/5c05cf8d66f1b33e30c025ac_7TLbOp9QtTEz2kQjEosCv3wbUy3y9_B3ifzT6Bzba_VzwKThaKvQ8HGUbmJFq38DDE9syWuL3iTzmVunHWvuxCjGvYdG_3EDawYhElvvAXDxHNmHG-3w5Hy-t_2cAtR20yJSQkS1.jpeg"
                alt=""
                className="w-11 mix-blend-multiply"
              />
              Login or Register via GitHub
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
