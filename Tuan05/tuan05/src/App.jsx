import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Body from './components/Body.jsx'
import Footer from './components/Footer.jsx'
import Info from './components/Info.jsx'

function App() {
  // const [count, setCount] = useState(0)

  let dataArray = ["What to cook","Recipes","Ingredients","Occasions","About us"]
  const url = "https://67c7c860c19eb8753e7ab9c2.mockapi.io/food"

  return (
    <>
      <Header dataArray={dataArray}> </Header>
      <Info></Info>
      <Body url={url}></Body>
      <br />
      <Footer></Footer>
    </>
  )
}

export default App
