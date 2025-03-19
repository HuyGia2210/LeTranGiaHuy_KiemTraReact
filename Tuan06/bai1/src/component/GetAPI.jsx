import { useEffect, useState } from "react"

export default function FetchAPI(){
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch("https://67c7c860c19eb8753e7ab9c2.mockapi.io/food")
        .then((respone) => {return respone.json()})
        .then((data) => {setData(data)})
    }, [])

    return (
        <>
            {data.length == 0? <h1>Loading</h1>:
            data.map((item) => (
                <img src={item.img} alt="" />
            ))}
        </>
    )
}