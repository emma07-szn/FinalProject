import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Signup = () => {
    const[success,setSuccess]=useState("")
    const[loading,setLoading]=useState("")
    const[error,setError]=useState("")

    // variables
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")



    const handlesubmit=async (e)=>{
        e.preventDefault()
        setLoading("Please wait a moment...")
        setError("")

        const formData=new FormData()
        formData.append("username",username)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("phone",phone)
    


        try {
            const responce=await axios.post("http://emmah.alwaysdata.net/api/signup",formData)

            setLoading("")
            setSuccess(responce.data.success)

        } catch (error) {
            setLoading("")
            setError(error.message)


            
        }
    }

  return (
    <div className='row mt-4 justify-content-center'>
        <div className="col-md-6 card shadow p-4">
            <h2>Sign up</h2>
            <p>It's quick and easy.Just fill in your details <br /> to get started</p>
            
            

            {/* form */}
 <form action="" onSubmit={handlesubmit}>
    {/* Dinding states */}
    <h4 className='text-primary'>{success}</h4>

    <h4 className='text-secondary'>{loading}</h4>

    <h4 className='text-danger'>{error}</h4>



        <input type="username" placeholder='Enter your Full Name' className='form-control' onChange={(e) =>setUsername(e.target.value)} /> <br />

        
         <input type="email" placeholder='Enter your Email' className='form-control' onChange={(e)=>setEmail(e.target.value)}/><br />

         <input type="password" placeholder='Enter your Password' className='form-control' onChange={(e)=>setPassword(e.target.value)} /> <br />

         <input type='phone' placeholder='Enter your phone' className='form-control' onChange={(e)=>setPhone(e.target.value)} /> <br />

         

        
        <button type='sumbit' className='btn btn-danger w-50'>Sign up</button><br /><br />OR <br />
            </form>

        <p>Already have an account?    <Link to="/">Sign in</Link></p>
        </div>

    </div>
  )
}
  

export default Signup