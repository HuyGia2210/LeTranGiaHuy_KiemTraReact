import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Count from './component/Count.jsx'
import Home from './component/Home.jsx';
import FetchAPI from './component/GetAPI.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/count" element={<Count/>} />
        <Route path="/useeffect" element={<FetchAPI/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
