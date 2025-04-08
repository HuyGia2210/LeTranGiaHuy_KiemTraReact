import { useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Projects from "./components/Projects.jsx";
import Teams from "./components/Teams.jsx";
import Analytics from "./components/Analytics.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="m-auto w-11/12 grid grid-cols-4 gap-0">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <div className="border-t-2 border-r-2 border-b-2 border-gray-200 col-span-3">
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <div className="border-t-2 border-r-2 border-b-2 border-gray-200 col-span-3">
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/projects"
              element={
                <div className="border-t-2 border-r-2 border-b-2 border-gray-200 col-span-3">
                  <Projects />
                </div>
              }
            />
            <Route
              path="/teams"
              element={
                <div className="border-t-2 border-r-2 border-b-2 border-gray-200 col-span-3">
                  <Teams />
                </div>
              }
            />
            <Route
              path="/analytics"
              element={
                <div className="border-t-2 border-r-2 border-b-2 border-gray-200 col-span-3">
                  <Analytics />
                </div>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
