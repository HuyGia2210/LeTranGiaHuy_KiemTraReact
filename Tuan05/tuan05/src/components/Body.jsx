import { useEffect, useState } from 'react'
import './Body.css'
import { section } from '../style.js'

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
            <section className={section}>
            {data.map((item)=>(
                        <div className='border-solid border-2 border-gray-200 rounded-lg shadow-md'>
                            <img src={item.img} alt="" />
                            <span className='text-xl font-bold flex'>
                                <p className='px-4 flex-11/12'>
                                    {item.content}
                                </p>
                                <button className='border-solid border-pink-300 flex-1/12 text-pink-400 '>
                                    Save
                                </button>
                            </span>
                            <br />
                            <span className='px-4 text-pink-500'>
                                Minute: {item.minutes}
                            </span>
                        </div>
                    ))}
            </section>
        </>
        
    )
}