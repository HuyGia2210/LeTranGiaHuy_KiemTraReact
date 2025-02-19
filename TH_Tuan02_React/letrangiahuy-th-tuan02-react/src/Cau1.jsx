import { useState } from "react"

export default function InputAndShowToConsoleLog(){
    const [val, setVal] = useState('')

    return (
        <>
        <input onChange={(e) => setVal(e.target.value)} 
        type="text" 
        name="text" 
        id="text" 
        placeholder="Nhap van ban va nhan nut click de hien len console"
        value={val}/>
        <br />
        <button onClick={()=>console.log(val)}>CLICK</button>
        </>
    )
}