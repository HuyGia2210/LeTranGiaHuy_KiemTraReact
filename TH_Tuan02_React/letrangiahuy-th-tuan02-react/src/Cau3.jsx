import { useState } from "react"

export default function Calculator(){
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    const [opt, setOpt] = useState('')

    function calc(){
        if(opt === '+'){
            setC (a + b)
        }
        if(opt === '-'){
            setC (a - b)
        }
        if(opt === '*'){
            setC (a * b)
        }
        if(opt === '/'){
            setC (a / b)
        }
        if(opt==='')
            setC('Loi, vui long chon phep toan')
    }

    return (
        <>
        <input onChange={(e) => setA(Number(e.target.value))} 
        type="number" 
        name="a" 
        id="a" 
        placeholder="Nhap a"
        value={a}/>
        <br />
        <input onChange={(e) => setB(Number(e.target.value))} 
        type="number" 
        name="b" 
        id="b" 
        placeholder="Nhap b"
        value={b}/>
        <br />
        <div className="form-check">
            <input onChange={()=>setOpt('+')} className="form-check-input" type="radio" name="operator" id="plus" value='+'/>
            <label className="form-check-label" htmlFor="plus"> plus </label>

            <input onChange={()=>setOpt('-')} className="form-check-input" type="radio" name="operator" id="minus" value='-'/>
            <label className="form-check-label" htmlFor="minus"> minus </label>

            <input onChange={()=>setOpt('*')} className="form-check-input" type="radio" name="operator" id="multiply" value='*'/>
            <label className="form-check-label" htmlFor="multiply"> multiply </label>

            <input onChange={()=>setOpt('/')} className="form-check-input" type="radio" name="operator" id="divide" value='/'/>
            <label className="form-check-label" htmlFor="divide"> divide </label>
        </div>
        <button onClick={calc}>CLICK</button>
        <br />
        <span>Ket qua: {c}</span>
        </>
    )
}