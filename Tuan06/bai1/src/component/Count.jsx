import { useReducer, useRef } from "react"

export default function Count(){

    var number = useRef(0);

    function reducer (state, action){
        switch(action.type){
            case "+" : return {... state, numb: state.numb + 1}
            case "-" : return {... state, numb: state.numb - 1}
            case "SET": return { ...state, numb: action.payload };
        }
    }

    const [state, dispatch] = useReducer(reducer, { numb : 0 });

    function handelClik(input){
        dispatch({type: input});
    }

    function handleInputChange() {
        const value = Number(number.current.value);
        dispatch({ type: "SET", payload: value });
      }


    return(<>
        <h3>Vui long nhap so</h3>
        <input ref={number} type="number" value={state.numb}
        onChange={handleInputChange}/>
        <br />
        <br />
        <button onClick={()=>handelClik("+")}>Increment (+)</button>
        <button onClick={()=>handelClik("-")} 
        style={{marginLeft: "10px"}}>Decrement (-)</button>
        <br />
        <span>{state.numb}</span>

    </>)
}