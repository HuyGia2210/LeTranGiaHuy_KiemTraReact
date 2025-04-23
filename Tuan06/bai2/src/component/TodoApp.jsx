import { useState } from "react"
import { useRef } from "react"

export default function TodoApp(){

    var todo = useRef("")
    const [data, setData] = useState([])

    function handleDelete(index){
        setData((data) => data.filter((_, i) => i !== index))
    }

    function handleEdit(index, val){
        setData((data) => {
            const current = [...data]
            current[index] = val
            return current
        })
    }

    return(
        <>
            <input ref={todo} type="text" name="" id="" 
            placeholder="Type todo activities"/>
            <button style={{marginLeft:"20px"}}
            onClick={()=>setData([...data, todo.current.value])} >Add Into Todo</button>
            <h3>Danh sach todo:</h3>
            <ul style={{display:"inline"}}>
                {data.map((item, index)=>(
                    <>
                        <li key={index}>{item}</li>
                        <button key={index}
                        onClick={()=>handleDelete(index)}
                        >delete</button>
                        <button key={index} style={{marginLeft:"20px"}}
                        onClick={()=>handleEdit(index, todo.current.value)}
                        >edit</button>
                    </>
                ))}
            </ul>

        </>
    )
}