// import { useState } from 'react'
import './App.css'
import InputAndShowToConsoleLog from './Cau1.jsx'
import SumCalc from './Cau2.jsx'
import Calculator from './Cau3.jsx'
import TodoApp from './Cau5.jsx'
import TabButton from './Cau4.jsx'

function App() {
  

  return (
    <>
      <div>
        <h3>
          Cau 1
        </h3>
        <span>------------------------------------------------------</span>
        <br />
        <InputAndShowToConsoleLog></InputAndShowToConsoleLog>
        <br />
        <h3>
          Cau 2
        </h3>
        <span>------------------------------------------------------</span>
        <br />
        <SumCalc></SumCalc>
      
        <h3>
          Cau 3
        </h3>
        <span>------------------------------------------------------</span>
        <br />
        <Calculator></Calculator>
        <br />
        <h3>
          Cau 4
        </h3>
        <span>------------------------------------------------------</span>
        <br />
        <TodoApp></TodoApp>
        <br />
        <h3>
          Cau 5
        </h3>
        <span>------------------------------------------------------</span>
        <br />
        <TabButton></TabButton>


      </div>
    </>
  )
}

export default App
