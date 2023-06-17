import React from 'react';
import '../Styles/Username.css';
import { Link,useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { passwordValidate } from '../helper/Validate.js';
import useFetch from '../hooks/fetch.hooks.js';
import { verifyPassword } from '../helper/helper'



function Password() {
   const navigate = useNavigate();
   const username =  localStorage.getItem('username')
   const [{isLoading,apiData,serverError}]= useFetch(`user/${username}`);

    // console.log('apidata',apiData)
    const formik = useFormik({
    initialValues:{
      password:''
    },
    validate: passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      let loginPromise=verifyPassword({username,password:values.password});
      toast.promise(loginPromise,{
        loading:'checking...',
        success: <b>login successfully</b>,
        error:<b>Password Not match</b>
      })
      loginPromise.then(res=>{
       let {token} = res.data;
       localStorage.setItem('token',token);
       navigate('/urlshortner');
      })
    }
  })
    if(isLoading) return <h1>isLoading</h1>;
    if(serverError) return <h1>{serverError.message}</h1>
  return (
    
    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='Maindiv'>  
       <div className='text'>
        <h1>Login</h1>
        <h4>hello {apiData?.firstname || apiData?.username}</h4>
       </div>
      <div className='imageDiv'>
        <img  src={apiData?.profile || `https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg`} alt='' />
      </div>
      <div className='form-div'>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" placeholder='Enter Email'>Password</label>
            <input {...formik.getFieldProps('password')} placeholder='Password' type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
          </div>
          <div className='button-div'>
          <button type="submit" className="btn btn-primary" >Sign In</button>
          </div>
          <div className='button-div'><p>Forget Password? <span><Link to='/recovery' >Recover Now</Link></span></p>
          </div>
          
        </form>
      </div>
    </div>
    </div>
  )
}

export default Password