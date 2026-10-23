import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'


const Buynowmpesa = () => {
//   extract the product received from getproducts using uselocation
  const {product}=useLocation().state||{};
  const [phone,setPhone]=useState("")
  const [loading,setLoading]=useState("")
  const [message,setMessage]=useState("")

  console.log(product)

// image url
 const imgurl= 'https://emmah.alwaysdata.net/static/images/'

 const handlesubmit=async(e)=>{
  e.preventDefault()
  setLoading("Please wait as we proccess your request...")




  // form data
  const formData=new FormData()
  formData.append("phone",phone)
  formData.append("amount",product.product_cost);
  
  const responce=await axios.post("https://emmah07.alwaysdata.net/api/mpesa_payment",formData)
  setMessage(responce.data.message)
  setLoading("")

 }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-8 card shadow p-3 bg-success">
        <h3 className='text-white'>Lipa na M-pesa</h3>

        <h2 className='text-danger'>{loading}</h2>
        <h2 className='text-success'>{message}</h2>

        <img src={imgurl+product.product_photo} alt="" height="500" />
        <div className="card-body">
          <h4 className='text-white'>{product.product_name}</h4>
          <p className='text-white'>{product.product_description}</p>
          <b className='text-warning'>Cost: ksh {product.product_cost}</b>

          {/* form for payment */}
          <form action=""onSubmit={handlesubmit}>
       <input type="tel" placeholder='+25423456789' className='form-control'onChange={(e)=>setPhone(e.target.value)} /><br />
            <input type="submit" value="make payment" className='btn btn-outline-warning w-50'/>
          </form>
          
        </div>
      </div>

      </div>
     
    
  )
}
export default Buynowmpesa