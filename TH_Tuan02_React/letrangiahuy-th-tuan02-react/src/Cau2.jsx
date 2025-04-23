import { useState } from "react";

export default function SumCalc(){
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)


    return (
        <>
            <input onChange={(e)=>setA(e.target.value)} type="text" name="a" id="a"  value={a} placeholder="Nhap a..."/>
            <br />
            <input onChange={(e)=>setB(e.target.value)} type="text" name="b" id="b"  value={b} placeholder="Nhap b..."/>
            <br />
            <button style={{marginTop:"15px"}} onClick={()=>setC(Number(a) + Number(b))}>
                Sum of a and b
            </button>
            <br />
            <span>Result: {c}</span>
        </>
    )
}