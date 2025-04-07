import { useState } from 'react'
import './App.css'
import AdminPage from './components/AdminPage.jsx'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';

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
          </Routes>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App
