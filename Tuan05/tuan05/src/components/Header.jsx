import './Header.css'
import { header, navBtn, allBtn, box, input } from '../style.js'

export default function Header({dataArray}){
    return (
        <>
            <header className={header}>
                <div>
                    <img src="./Group 15.png" alt="logo"
                    style={{height: "50px", marginLeft: "100px"}}/>
                </div>
                <div>
                    <input type="text" name="" id="" value="cakescascsa"
                    className={input}
                    style={{marginLeft: "-100px", marginRight: "-100px"}}/>
                </div>
                <div className={allBtn}>
                    {dataArray.map((item)=>{
                        return(
                            <>
                                <div>
                                    <button className={navBtn}>
                                        {item}
                                    </button>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div>
                    <button className={box}>Your Recipe Box</button>
                </div>
                <div>
                    <img src="./Avatar 35.png" alt="logo2"
                    style={{height: "60px", marginRight: "100px"}}/>
                </div>
            </header>
        </>
    )
}