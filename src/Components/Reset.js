import React from 'react';
import '../Styles/Username.css';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { resetpasswordValidate } from '../helper/Validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hooks';

function Reset() {


  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetsession');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetpasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'updating password..',
        success: <b>Password updated successfully</b>,
        error: <b>couldnt update the password</b>
      })

      resetPromise.then(function () {
        navigate('/password')
      })
    }
  })
  if (isLoading) return <h1>isLoading</h1>;
  if (serverError) return <h1>{serverError.message}</h1>
  if(status && status !==201 ) return <Navigate to={'/password'} replace={true}></Navigate>

  return (

    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='Maindiv'>
        <div className='text'>
          <h1>Reset</h1>
          <p>Enter New Password</p>
        </div>
        <div style={{ marginTop: '20px' }} className='form-div'>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input {...formik.getFieldProps('password')} style={{ marginBottom: '10px' }} placeholder='Enter New Password' type="password" className="form-control" />
              <input {...formik.getFieldProps('confirm_pwd')} placeholder='Confirm Password' type="password" className="form-control" />
              <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
            </div>
            <div className='button-div'>
              <button type="submit" className="btn btn-primary" >Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset