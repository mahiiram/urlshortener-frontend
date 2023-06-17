import React, { useState } from 'react';
import '../Styles/Username.css';
import { Link,useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { registerValidation } from '../helper/Validate';
import convertTobase64 from '../helper/Converter';
import { registerUser } from '../helper/helper';


function Register() {
   
   const [file,setFile]=useState()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      email:'',
      username:'',
      password:''
    },
    validate: registerValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      values = await Object.assign(values,{profile:file || ''})
     const registerPromise = registerUser(values);
     toast.promise(registerPromise,{
      loading:'creating....',
      success: <b>Register successfully</b>,
      error: <b>Couldnt Register</b>

     })
       console.log(values)
       registerPromise.then(function(){navigate('/')})
    }
    
  })
  //formik doesnt support file upload so we need to create this handler
   const onUpload = async e =>{
    const base64 =await convertTobase64(e.target.files[0]);
    setFile(base64)
   }

  return (
    
    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='Maindiv'>  
       <div className='text'>
        <h1>SignUp</h1>
        <p>Happy to join you</p>
       </div>
       <div className='imageDiv'>
        <label htmlFor='profile'>
        <img  src={file || "https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"} alt='' />
        </label>
        <input onChange={onUpload} type='file' id='profile' name='profile'/>
         <h6>upload a profile</h6>
      </div>
      
      <div className='form-div'>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" >Email</label>
            <input {...formik.getFieldProps('email')} placeholder='Enter Email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <label for="exampleInputEmail1" className="form-label" >UserName</label>
            <input {...formik.getFieldProps('username')} placeholder='Enter Username' type="text" className="form-control"/>
            <label for="exampleInputEmail1" className="form-label" placeholder='Enter Email'>Password</label>
            <input {...formik.getFieldProps('password')} placeholder='Enter Password' type="password" className="form-control"/>
            <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
          </div>
          <div className='button-div'>
          <button type="submit" className="btn btn-primary" >SignUp</button>
          </div>
          <div className='button-div'><p>Already registered? <span><Link to='/' >Login</Link></span></p>
          </div>
          
          
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register