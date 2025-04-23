import { useState } from 'react'
import './App.css'

function App() {
  const [invest, setInvest] = useState(0)
  const [rate, setRate] = useState(0)
  const [goal, setGoal] = useState(0)
  const [result, setResult] = useState(0)

  function handleClick(){
    let temp_count = 0
    let temp_invest = Number(invest);
    const target = Number(goal);
    const interestRate = Number(rate);

    while(temp_invest < target){
      temp_invest = temp_invest + temp_invest * (interestRate / 100);
      temp_count += 1;

      if (interestRate <= 0) {
        break;
      }
    }

    setResult(temp_count);
  }

  return (
    <>
      <form>
        <label htmlFor="invest">Initial Investment</label>
        <input onChange={(e) => setInvest(Number(e.target.value))} type="number" name="invest" id="invest" value={invest} />
        <br />
        <label htmlFor="rate">Annual Interest Rate (%)</label>
        <input onChange={(e) => setRate(Number(e.target.value))} type="number" name="rate" id="rate" value={rate} />
        <br />
        <label htmlFor="goal">Target Amount</label>
        <input onChange={(e) => setGoal(Number(e.target.value))} type="number" name="goal" id="goal" value={goal} />
        <br />
        <button type="button" onClick={handleClick}>CLICK</button>
        <br />
        <span>So nam: {result}</span>
      </form>
    </>
  )
}

export default App
