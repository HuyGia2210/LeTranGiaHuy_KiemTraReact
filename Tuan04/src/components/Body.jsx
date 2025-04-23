import { useEffect, useState } from 'react'
import './Body.css'

export default function Body({url}){

    const [data, setData] = useState([])

    useEffect(()=>{
        fetch(url).then((response) =>{
            return response.json()
        }).then((dataItem) => setData(dataItem))
        .catch((error) => console.error("Fetch error:", error));
    }, [url])

    data.map((item)=>{
        console.log(item)
    })
    
    
    return(
        <>
            <section>
            {data.map((item)=>(
                        <div style={{border: "2px", borderColor:"green"}}>
                            <img src={item.img} alt="" />
                            <br />
                            <span>
                                {item.content}
                            </span>
                            <br />
                            <span>
                                Minute: {item.minutes}
                            </span>
                        </div>
                    ))}
            </section>
        </>
        
    )
}