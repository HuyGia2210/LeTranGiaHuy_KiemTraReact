import {useState } from "react"

export default function TabButton(){

    const buttonList = [
        {
            button: "Java",
            content: "Java is an OOP language"
        },
        {
            button: "JavaScript",
            content: "JavaScript can run on browser"
        },
        {
            button: "C++",
            content: "C++ is an programming language"
        },
        {
            button: "Rust",
            content: "Rust is Rust :) "
        },
        {
            button: "Ruby",
            content: "I don't even know about Ruby :/"
        },
        {
            button: "FUN FACT",
            content: "You can add a new button with new content by just adding button and content into the buttonList"
        }
    ]

    const [content, setContent] = useState('')

    function showContent(button){
        setContent(buttonList.find((item)=> item.button === button).content)
    }

    return (
        <>
            {buttonList.map((item, index)=>(
                    <button style={{margin: "5px"}} key={index} onClick={() => showContent(item.button)}>{item.button}</button>
            ))}
            <br />
            <div style={{border: "15px"}}>
                <span>
                    {content}
                </span>
            </div>
        </>
    )
}