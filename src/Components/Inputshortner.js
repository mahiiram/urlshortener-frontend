import React, { useState } from 'react'



function Inputshortner({setInputvalue}) {
    const [value,setValue] = useState("");
    const handleClick = ()=>{
        setInputvalue(value);
        setValue("")
    }
    
  return (
    <div className='inputcontainer'>
        <h1>URL <span>Shortener</span></h1>
        <div>
            <input type='text' placeholder='Place a link to shorten' value={value} onChange={e=>setValue(e.target.value)}/>
            <button onClick={handleClick}>shorten</button>
        </div>
        
    </div>
  )
}

export default Inputshortner