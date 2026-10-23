import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const[success,setSuccess]=useState("")
    const[loading,setLoading]=useState("")
    const[error,setError]=useState("")


    const navigate=useNavigate()


    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")



    const handlesubmit=async (e)=>{
        e.preventDefault()
        setLoading("Please Wait...")
        setError("")


        const formData=new FormData()

        formData.append("email",email)
        formData.append("password",password)


        try {


            const responce=await axios.post("https://emmah.alwaysdata.net/api/signin",formData)
            console.log(responce)
            setSuccess(responce.data.message)

            setLoading("")
            if(responce.data.user){
                navigate('/getproduct')
                localStorage.setItem("user",JSON.stringify(responce.data.user))
            }
            else{
                setError(responce.data.message)
            }
            
        } catch (error) {
            setError(error.message)
            setLoading("")
            
        }
    }


  return (
    <div className='row mt-4 justify-content-center'>
        <div className="col-md-6 card shadow p-4">
            <h2>Signin</h2>
            <p>Welcome back! Please sign in to your <br />Sweat Delight account!</p>
            
            

            {/* form */}
 <form action="" onSubmit={handlesubmit}>
    {/* Dinding states */}
    <h4 className='text-primary'>{success}</h4>
    <h4 className='text-secondary'>{loading}</h4>
    <h4 className='text-danger'>{error}</h4>


        
         <input type="email" placeholder='Enter Email' className='form-control' onChange={(e)=>setEmail(e.target.value)}/><br />


         <input type="password" placeholder='Enter Password' className='form-control' onChange={(e)=>setPassword(e.target.value)} /> <br />
         
        <button type='sumbit' className='btn btn-danger w-50'>Signin</button><br />
            </form><br />

        <p>Don't have an account?   <Link to="/signup">Sign up</Link></p>
        </div>

    </div>
  

  )
}

export default Signin