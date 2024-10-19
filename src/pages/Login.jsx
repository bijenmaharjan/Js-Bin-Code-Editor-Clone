import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "../api_url";
import Header from "../header/Header";
import Footer from "../Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeLink, setActiveLink] = useState("login");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(api_url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Submitting form:", { email, password });
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/";
      } else {
        setError(data.message || "An error occurred during login.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
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

          <form onSubmit={submitForm}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Email address or username
              </label>
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
            <div className="flex justify-center mt-8 mb-8">
              <button
                type="submit"
                className="p-[3px] px-14 text-[14px] text-zinc-800 font-bold border border-zinc-600 hover:bg-[rgb(239,239,239)] bg-gray-50 shadow-md"
              >
                Login
              </button>
            </div>

            <p className="text-red-500 text-[14px] my-2">{error}</p>
            <div className="flex justify-center mt-7 mb-9">
              <Link
                to="https://google.com/recovery"
                className="underline underline-offset-1 text-gray-400 font-medium hover:text-black"
              >
                I've forgotten my password
              </Link>
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

export default Login;
