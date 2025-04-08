import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Gán mặc định dựa trên URL hiện tại
  const [crtBtn, setCrtBtn] = useState("");

  useEffect(() => {
    // Xác định nút nào active từ URL path
    const path = location.pathname;
    if (path.startsWith("/dashboard")) setCrtBtn("dashboard");
    else if (path.startsWith("/projects")) setCrtBtn("projects");
    else if (path.startsWith("/teams")) setCrtBtn("teams");
    else if (path.startsWith("/analytics")) setCrtBtn("analytics");
    else if (path.startsWith("/messages")) setCrtBtn("messages");
    else if (path.startsWith("/integrations")) setCrtBtn("integrations");
  }, [location.pathname]); // Chạy mỗi khi URL đổi

  return (
    <>
      <div className="border-2 border-gray-200 col-span-1">
        <div className="inline-flex mx-3 my-3">
          <img src="./slack.svg" alt="" />
          <h1 className="font-sans ml-2 font-bold text-2xl">Logo</h1>
        </div>
        <div id="navBtn" className="my-1">
          <ul>
            <li className="my-2">
              <button
                type="button"
                onClick={() => {
                  setCrtBtn("dashboard");
                  navigate("/dashboard");
                }}
                className={`cursor-pointer flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                  crtBtn == "dashboard"
                    ? "bg-[#f44a85]"
                    : "bg-[#ffffff] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                <svg
                  style={{ marginInline: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={crtBtn == "dashboard" ? "#ffffff" : "#000000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span
                  className={`${
                    crtBtn == "dashboard"
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  Dashboard
                </span>
              </button>
            </li>
            <li className="my-2">
              <button
                type="button"
                onClick={() => {
                  setCrtBtn("projects");
                  navigate("/projects");
                }}
                className={`cursor-pointer flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                  crtBtn == "projects"
                    ? "bg-[#f44a85]"
                    : "bg-[#ffffff] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                <svg
                  style={{ marginInline: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={crtBtn == "projects" ? "#ffffff" : "#000000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-folder-icon lucide-folder"
                >
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                </svg>
                <span
                  className={`${
                    crtBtn === "projects"
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  Projects
                </span>
              </button>
            </li>
            <li className="my-2">
              <button
                type="button"
                onClick={() => {setCrtBtn("teams"); navigate("/teams");}}
                className={`cursor-pointer flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                  crtBtn == "teams"
                    ? "bg-[#f44a85]"
                    : "bg-[#ffffff] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                <svg
                  style={{ marginInline: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={crtBtn == "teams" ? "#ffffff" : "#000000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-boxes-icon lucide-boxes"
                >
                  <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
                  <path d="m7 16.5-4.74-2.85" />
                  <path d="m7 16.5 5-3" />
                  <path d="M7 16.5v5.17" />
                  <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
                  <path d="m17 16.5-5-3" />
                  <path d="m17 16.5 4.74-2.85" />
                  <path d="M17 16.5v5.17" />
                  <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
                  <path d="M12 8 7.26 5.15" />
                  <path d="m12 8 4.74-2.85" />
                  <path d="M12 13.5V8" />
                </svg>
                <span
                  className={`${
                    crtBtn == "teams"
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  Teams
                </span>
              </button>
            </li>
            <li className="my-2">
              <button
                type="button"
                onClick={() => {setCrtBtn("analytics"); navigate("/analytics")}}
                className={`cursor-pointer flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                  crtBtn == "analytics"
                    ? "bg-[#f44a85]"
                    : "bg-[#ffffff] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                <svg
                  style={{ marginInline: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={crtBtn == "analytics" ? "#ffffff" : "#000000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chart-pie-icon lucide-chart-pie"
                >
                  <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                </svg>
                <span
                  className={`${
                    crtBtn == "analytics"
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  Analytics
                </span>
              </button>
            </li>
            <li className="my-2">
              <button
                type="button"
                onClick={() => setCrtBtn("messages")}
                className={`cursor-pointer flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                  crtBtn == "messages"
                    ? "bg-[#f44a85]"
                    : "bg-[#ffffff] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                <svg
                  style={{ marginInline: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={crtBtn == "messages" ? "#ffffff" : "#000000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square-text-icon lucide-message-square-text"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M13 8H7" />
                  <path d="M17 12H7" />
                </svg>
                <span
                  className={`${
                    crtBtn == "messages"
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  Messages
                </span>
              </button>
            </li>
            <li className="my-2">
              <button
                type="button"
                onClick={() => setCrtBtn("integrations")}
                className={`cursor-pointer flex rounded-lg mx-2 w-65 h-10 justify-start items-center text-start  ${
                  crtBtn == "integrations"
                    ? "bg-[#f44a85]"
                    : "bg-[#ffffff] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                <svg
                  style={{ marginInline: "10px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={crtBtn == "integrations" ? "#ffffff" : "#000000"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-code-icon lucide-code"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span
                  className={`${
                    crtBtn == "integrations"
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  Integrations
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className="bg-[#eff6ff] mt-13 mb-4 mx-5 rounded-md flex flex-col justify-center items-center">
          <img className="h-65" src="./image.png" alt="" />
          <h2 className="text-2xl font-bold my-2">V2.0 is available</h2>
          <button className="text-[#2980ff] border-2 border-[#2980ff] w-60 h-9 bg-[#ffffff] rounded-lg mb-4 cursor-pointer ">
            Try now
          </button>
        </div>
      </div>
    </>
  );
}
