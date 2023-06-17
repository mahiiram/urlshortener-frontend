import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate()
    function userLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/')
      }
  return (
    <div>
        <div className='button-div' onClick={userLogout}><p>Comeback later? <span><Link to='/' >Logout</Link></span></p>
         </div>
    </div>
  )
}

export default Logout