import './Footer.css'
import { footer } from '../style.js'

export default function Footer(){
    return(
        <>
            <footer className={footer}>
            <h4>About us</h4>
                <p>Welcome to our website, a wonderful place to explore and learn how to cook like a pro.</p>
                <input type="email" id="" name=""
                style={{height: "35px", width: "400px", borderRadius: "10px"}} placeholder="Enter your email"/>
                <button style={{height: "35px", color: "white", 
                backgroundColor: "rgb(239, 104, 126)",
                borderColor: "transparent",
                borderRadius: "7px"}}>SEND</button>
            </footer>
        </>
    )
}