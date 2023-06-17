import React, { useEffect, useState } from 'react';
import '../Styles/Username.css';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';


function Recovery() {
    const {username} = useAuthStore(state=>state.auth)
    console.log(username)
  const [OTP,setOTP]=useState();
  const navigate = useNavigate();
   
  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault()
    try {
      let {status} = await verifyOTP({username,code:OTP})
    if(status === 201){
      toast.success('verify successfully')
      return navigate('/reset')
    }
    } catch (error) {
      return toast.error('wrong OTP, Enter the Correct OTP!')
    }
  }
   

  ///function for resend OTP

     function resendOTP(){
      let sendPromise = generateOTP(username)

      toast.promise(sendPromise,{
        loading:'sending..',
        success:<b>OTP send to your email</b>,
        error:<b>Couldnt send it</b>
      });
      sendPromise.then(OTP=>{
        console.log(OTP)
      })
     }
  return (
    
    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='Maindiv'>  
       <div className='text'>
        <h1>Recovery</h1>
        <p style={{marginTop:"20px"}}>Enter OTP to recover Password </p>
       </div>
      <div className='form-div'>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
           <label for="inputPassword2" className="visually-hidden">Password</label>
            <input onChange={(e)=>setOTP(e.target.value)} placeholder="One Time Password" type="text" className="form-control"/>
            <div id="emailHelp" className="form-text">Enter 6 digit OTP sent to your Email </div>
          </div>
          <div className='button-div'>
          <button type="submit" className="btn btn-primary" >Recover</button>
          </div>  
        </form>
        
      </div>
      <div className='button'>
            <p>
            Can't get OTP?
            </p>
            <button onClick={resendOTP} type="button" className="btn btn-link">Resend</button>
          </div>
    </div>
    </div>
  )
}

export default Recovery