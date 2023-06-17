import React from "react";
import { toast } from "react-hot-toast";
import { authenticate } from "./helper.js";

export async function usernameValidate(values){
    const errors = userNameVerify({},values);
    if(values.username){
       //check user exist or not
       const {status}= await authenticate(values.username);

       if(status!==200){
        errors.exist = toast.error('User Not exist')
       }
    }
    return errors;
}
export async function passwordValidate(values){
    const errors = passwordVerify({},values);
    return errors;
}

export async function resetpasswordValidate(values){
    const errors = passwordVerify({},values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error('Password not match..');
    }
    return errors;
}

export async function registerValidation(values){
    const errors = userNameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values)

    return errors;
}

export async function profileValidation(values){
    const errors = emailVerify({},values);
    return errors;
}

//validate password
function passwordVerify(error={},values){
const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890`]/;

    if(!values.password){
        error.password = toast.error('Password Required')
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid Password')
    }else if(values.password.length<6){
        error.password = toast.error('Passord must be in more than 6 character')
    }else if(!specialChar.test(values.password)){
        error.password = toast.error('Password must have one special character and number')
    }
     return error;

}


//validate username
function userNameVerify(error={}, values){
    if(!values.username){
        error.username = toast.error('UserName Required')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username')
    }
     return error;

}

function emailVerify(error={},values){
    if(!values.email){
        error.email = toast.error('Email Required');
    }else if(values.email.includes(" ")){
        error.email = toast.error('Wrong Email');
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error('Invalid Email Address')
    }
    return error
}