import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** Make API Requests */


// /** To get username from Token */
 export async function getUsername(){
     const username = localStorage.getItem('username')
     return username;
 }

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('https://urlshortner-6qli.onrender.com/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser(){
    // try {
    //     const { data } = await axios.get(`https://urlshortner-6qli.onrender.com/api/user/${username}`);
    //     return { data };
    // } catch (error) {
    //     return { error : "Password doesn't Match...!"}
    // }
    try {
        const username = localStorage.getItem('username')
        const data = await axios.get(`https://urlshortner-6qli.onrender.com/api/user/${username}`).catch((err)=>console.log(err))
        return data;
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }

    
}

/** register user function */
export async function registerUser(credentials){
    const data  = await axios.post(`https://urlshortner-6qli.onrender.com/api/register`,{
         username:credentials.username,
         email:credentials.email,
         password:credentials.password,
         profile:credentials.profile
      }).catch((err)=>console.log(err))  
       console.log(data)
      let {username,email} = credentials

      if(data.status === 201){
                await axios.post('https://urlshortner-6qli.onrender.com/api/registerMail', { username, userEmail : email, text : data.msg })
            }
      
      if(data.status!==201){
         return console.log("unexpected error occured")
      }
      return Promise.resolve(data.msg)
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('https://urlshortner-6qli.onrender.com/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('https://urlshortner-6qli.onrender.com/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('https://urlshortner-6qli.onrender.com/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('https://urlshortner-6qli.onrender.com/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('https://urlshortner-6qli.onrender.com/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('https://urlshortner-6qli.onrender.com/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}