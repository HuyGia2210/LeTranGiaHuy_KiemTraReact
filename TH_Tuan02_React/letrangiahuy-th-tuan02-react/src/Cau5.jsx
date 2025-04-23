import { useState } from "react";

export default function TodoApp(){
    const [list, setList] = useState([
        'Hoc useState','Hoc useEffect','Hoc Java','Hoc Axios'
    ])

    const [activity, setActivity] = useState('')

    function handelAdd(){
        setList((prevList) => [...prevList, activity])
    }


    function handelRemove(removeIndex){
        setList((prevList)=> prevList.filter((_, index) => index !== removeIndex) )
    }


    return (
        <>
        <div>
            <input onChange={(e)=>setActivity(e.target.value)} 
            type="text" name="activity" id="activity" placeholder="add activity..."
            value={activity}/>
            <br />
            <button onClick={handelAdd}>Add</button>
        </div>
        <ul>
            {list.map((item, index)=>
                (<>
                    <li style={{paddingBottom : "20px"}} key={index}> {item} 
                        <button onClick={()=>handelRemove(index)} key={index}>Remove</button>
                    </li>
                    
                </>)
            )}
        </ul>
        </>
    )
}