import { Link } from "react-router-dom";
// import useCustomHooks from "../Hooks/customHooks";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import "../App.css";
import { useParams } from "react-router-dom";
import { api_url } from "../api_url";

const options = [
  { value: "/new", label: "New" },
  { value: "/make-bin-private", label: "Make bin private", pro: "PRO" },
  { value: "/delete", label: "Delete" },
  { value: "/archive", label: "Archive", line: true },
  { value: "/add-description", label: "Add Description" },
  { value: "/save-snapshot", label: "Save snapshot" },
  { value: "/saved/:projectId", label: "Clone", line: true },
  {
    value: "/publish-homepage",
    label: "Publish to vanity homepage",
    pro: "PRO",
  },
  { value: "/export-gist", label: "Export as gist" },
  { value: "/download", label: "Download" },
  { value: "/save-template", label: "Save as template" },
];

const optionsHelp = [
  { value: "/new", label: "Keyboard shortcuts" },
  { value: "/make-bin-private", label: "Js Bin Urls", line: "line" },
  { name: "search" },
  { value: "/archive", label: "All help topics", line: "line" }, // Horizontal line
  { value: "/add-description", label: "Send feedback & file bugs" },
  { value: "/save-snapshot", label: "Support on opencollective" },
  { value: "/saved", label: "Follow @js_bin" }, // Horizontal line
  {
    value: "/publish-homepage",
    label: "Support JS Bin upgrade now",
  },
];

const Navbars = () => {
  const [open, setOpen] = useState(false);
  // const [tab, setTab] = useCustomHooks();
  const [tab, setTab] = useState("html");
  console.log(tab);
  const [openHelp, setOpenHelp] = useState(false);
  const [isExpanded, setIsExpanded] = useState();
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");
  const [activeButton, setActiveButton] = useState();
  let { projectId } = useParams();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setOpen(false); // Close dropdown when a button is clicked
  };

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };
  useEffect(() => {
    setIsExpanded();
  }, [setIsExpanded, isExpanded]);

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  // Fetch project code on mount
  useEffect(() => {
    fetch(api_url + "/getProjectCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projectId: projectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.project) {
          setHtmlCode(data.project.htmlCode);
          setCssCode(data.project.cssCode);
          setJsCode(data.project.jsCode);
        } else {
          alert(data.message || "Failed to fetch project code");
        }
      });
  }, [projectId]);

  // Save project code on Ctrl + S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default save file dialog

        fetch(api_url + "/updateProjectCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projectId: projectId,
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert(data.message || "Something went wrong while saving");
            }
          })
          .catch((err) => {
            console.error("Error saving project:", err);
            alert("Failed to save project. Please try again.");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectId, htmlCode, cssCode, jsCode]);

  return (
    <>
      <div className="main border-b border-gray-400 w-full h-[30px] bg-[rgb(237,237,237)]  ">
        <div className="navbar flex justify-between items-center mx-2 text-[10px]">
          <div className="flex gap-2">
            <div className="flex">
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.fqP5oZLC6De4KFXw8KdeygHaHa&pid=Api&P=0&h=220"
                alt=""
                className="w-[25px] h-[23px] mix-blend-multiply "
              />
            </div>

            <div className="flex gap-7 ">
              <button
                onClick={() => setOpen(!open)}
                className="flex gap-2 mt-1"
              >
                File
                <span className="text-[6px] flex items-center mb-1 mt-1">
                  ▼
                </span>
              </button>
              {open && (
                <div className="absolute top-[40px] left-0 w-[230px] bg-white border border-gray-300 shadow-md text-xs z-10">
                  {options.map((option, index) => (
                    <div key={index}>
                      {option.line && (
                        <div className="border-t border-gray-300 w-full mx-1"></div>
                      )}
                      <Link
                        to={option.value}
                        onClick={() => handleButtonClick(option.label)}
                        className="h-[29.6px] p-2 hover:bg-gray-200 flex justify-between items-center cursor-pointer"
                      >
                        <span>{option.label}</span>
                        {option.pro && (
                          <div className="bg-[rgb(52,193,62)] text-white rounded-[3px] px-1 text-[9px]">
                            {option.pro}
                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <button>Add to Library</button>
            </div>
          </div>

          {/* Here we handle the buttons for switching tabs */}
          <div className="flex my-1 text-[13px] items-center text-zinc-700">
            <div className="">
              <button
                className={`px-3  border border-[rgb(210,207,208)] rounded-l-md font-bold  ${
                  tab === "html" ? "bg-[rgb(221,243,252)] font-normal" : ""
                }`}
                onClick={() => setTab("html")}
              >
                Html
              </button>
              <button
                className={`px-3 border border-[rgb(210,207,208)] ${
                  tab === "css" ? "bg-[rgb(221,243,252)]" : ""
                }`}
                onClick={() => setTab("css")}
              >
                Css
              </button>
              <button
                className={`px-3 border border-[rgb(210,207,208)] ${
                  tab === "js" ? "bg-[rgb(221,243,252)]" : ""
                }`}
                onClick={() => setTab("js")}
              >
                Javascript
              </button>
              <Link
                to="/Console"
                className="px-3 border border-[rgb(210,207,208)]"
              >
                Console
              </Link>
              <button className="px-3 border border-[rgb(210,207,208)] rounded-r-md">
                Output
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-[rgb(255,235,59)] font-light text-[13px] px-3"
            >
              Login or Register
            </Link>
            <Link to="/Blog" className="my-1">
              Blog
            </Link>
            <div className=" flex items-center ">
              <div className="" onClick={() => setOpenHelp(!openHelp)}>
                <button className="flex gap-3">Help</button>
              </div>

              {openHelp && (
                <div className="absolute right-0 mt-[279px] w-[200px] bg-white border border-gray-300 shadow-md text-xs z-10 ">
                  {optionsHelp.map((option, index) => (
                    <div key={index}>
                      {option.line && (
                        <div className="border-t border-gray-300 w-full"></div>
                      )}
                      <Link
                        to={option.value}
                        onClick={() => handleButtonClick(option.label)}
                        className="h-[29.6px] p-2 hover:bg-gray-200 flex justify-between items-center cursor-pointer"
                      >
                        {option.name ? (
                          <input
                            placeholder="Search help..."
                            className="text-black w-full py-2 border-none bg-transparent bfocus:outline-none "
                          />
                        ) : (
                          ""
                        )}

                        <span>{option.label}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className={`left ${isExpanded ? "w-[200%]" : "w-[150%]"}`}>
          <div>
            <div className="tabs flex w-full h-[20px] ml-4 justify-between my-2">
              <div className="flex justify-start text-[11px] no text-blue-600 px-2 ">
                <select
                  name=""
                  id=""
                  className="bg-transparent appearance-none w-24   text-blue-600" // Adjust padding to minimize gap
                  style={{
                    backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27%23000000%27 viewBox=%270 0 24 24%27 width=%2718%27 height=%2718%27%3E%3Cpath d=%27M7 10l5 5 5-5z%27/%3E%3C/svg%3E')`, // Custom arrow
                    backgroundPosition: "right 0.5rem center", // Place arrow closer to the text
                    backgroundSize: "1rem", // Adjust arrow size
                    backgroundRepeat: "no-repeat", // Prevent arrow repetition
                  }}
                >
                  <option value="">HTMl</option>
                  <option value="" className="text-black ">
                    Markdown
                  </option>
                  <option value="" className="text-black">
                    Jade
                  </option>
                  <option value="" className="text-black">
                    Convert to HTML
                  </option>
                </select>
              </div>
              <AiOutlineExpandAlt
                className="text-[20px] cursor-pointer mr-3"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          </div>

          {/* Conditionally render the editor based on the selected tab */}
          {tab === "html" ? (
            <Editor
              onChange={(value) => setHtmlCode(value || "")}
              height="82vh"
              language="html"
              value={
                htmlCode ||
                '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>JS Bin</title>\n</head>\n<body>\n\n</body>\n</html>'
              }
            />
          ) : tab === "css" ? (
            <Editor
              onChange={(value) => setCssCode(value || "")}
              height="82vh"
              language="css"
              value={cssCode}
            />
          ) : tab === "js" ? (
            <Editor
              onChange={(value) => setJsCode(value || "")}
              height="82vh"
              language="javascript"
              value={jsCode}
            />
          ) : tab === "console" ? (
            <div className="console-output bg-black text-white p-4 min-h-[82vh]">
              <p>Console logs will appear here.</p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex bg-zinc-100 justify-end  mx-3 ">
            <button className="bg-gray-200  px-1 rounded-sm border border-zinc-400 mx-5 text-[11px] mt-2 hover:bg-zinc-300">
              Run with js
            </button>
            <div className="flex text-[11px] mt-2 gap-1">
              <label htmlFor="run">Auto-run JS</label>
              <input type="checkbox" id="run" />
            </div>
          </div>
          {/* Output iframe displayed when "Output" tab is selected */}

          {!isExpanded && (
            <iframe
              id="iframe"
              className="w-[225%] min-h-[82vh] bg-[#fff] text-black"
              title="output"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbars;
