import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminPage from './components/AdminPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdminPage></AdminPage>
    </>
  )
}

export default App
