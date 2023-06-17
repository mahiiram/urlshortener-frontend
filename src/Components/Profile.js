import React, { useState } from 'react';
import '../Styles/Username.css';
import { Link,useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import { profileValidation} from '../helper/Validate';
import convertTobase64 from '../helper/Converter';
import useFetch from '../hooks/fetch.hooks.js';
import { useAuthStore } from '../store/store';
import { updateUser } from '../helper/helper';
function Profile() {
   const navigate =  useNavigate()
  const [file, setFile] = useState()
 const username = localStorage.getItem('username')
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      firstname:apiData?.firstname || '',
      lastname:apiData?.lastname || '',
      email:apiData?.email || '',
      address:apiData?.address || '',
      mobile:apiData?.mobile || '',
      profile: file || apiData?.profile || ''
    },
    enableReinitialize:true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // values = await Object.assign(values, { profile: file || apiData?.profile || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise,{
        loading:'updating',
        success:<b>updated successfully</b>,
        error:<b>Couldnt updated</b>
      })
      updatePromise.then(res=>{
        navigate('/urlshortner');
       })
    }
  })
  //formik doesnt support file upload so we need to create this handler
  const onUpload = async e => {
    const base64 = await convertTobase64(e.target.files[0]);
    setFile(base64)
  }

  
  if (isLoading) return <h1>isLoading</h1>;
  if (serverError) return <h1>{serverError.message}</h1>
  return (

    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='Maindiv'>
        <div className='text'>
          <h1>Profile</h1>
          <p>You can update the details</p>
        </div>
        <div className='imageDiv'>
          <label htmlFor='profile'>
            <img src={apiData?.profile || file || "https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"} alt='' />
          </label>
          <input onChange={onUpload} type='file' id='profile' name='profile' /><br />
        </div>

        <div className='form-div'>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <div className='input-div'>
                <input {...formik.getFieldProps('firstname')} placeholder='Firstname' type="text" className="form-control" />
                <input {...formik.getFieldProps('lastname')} placeholder='Lastname' type="text" className="form-control" />
              </div>
              <div className='input-div'>
                <input {...formik.getFieldProps('mobile')} placeholder='Mobile' type="text" className="form-control" />
                <input {...formik.getFieldProps('email')} placeholder='Email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className='input-div'>
                <input {...formik.getFieldProps('address')} placeholder='Address' type="text" className="form-control" />
              </div>
            </div>
            <div className='button-div'>
              <button type="submit" className="btn btn-primary" >update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile