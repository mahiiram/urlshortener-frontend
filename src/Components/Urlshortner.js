import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Inputshortner from './Inputshortner';
import LinkResult from './LinkResult';
import Logout from './Logout';

function Urlshortner() {
    const [inputvalue,setInputvalue] = useState("");

  return (
    <div className='container'>
        
       <div className='Maindiv'>
         <div className='profile'> 
         <div className='button-div'><p><span><Link to='/profile'>Profile</Link></span></p>
         </div>
         </div>
           <Inputshortner setInputvalue={setInputvalue}/>
           <LinkResult inputvalue={inputvalue}/>
           <Logout/>
       </div>
    </div>
  )
}

export default Urlshortner