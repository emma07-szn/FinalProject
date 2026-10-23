import axios from 'axios'
import React, { useState } from 'react'

const Addproducts = () => {
   // states
    const[success,setSuccess]=useState("")
    const[loading,setLoading]=useState("")
    const[error,setError]=useState("")

   // variables for user input
      const[product_name,setProduct_name]=useState("")
      const[product_description,setProduct_description]=useState("")
      const[product_cost,setProduct_cost]=useState("")
      const[product_photo,setProduct_photo]=useState("")

   // functions to submit the details
      const handlesubmit=async(e)=>{
        e.preventDefault()
        setLoading("PLease Wait...")
        setError("")

    // form data
        const formData=new FormData()
        formData.append("product_name",product_name)
        formData.append("product_description",product_description)
        formData.append("product_cost",product_cost)
        formData.append("product_photo",product_photo)



          try {

            const responce=await axios.post("https://emmah.alwaysdata.net/api/add_product",formData)

            setLoading("")
            setSuccess(responce.data.success)
            
          } catch (error) {
            setLoading("")
            setError(error.message)

            
          }
      }

  
  return (
      <div className='row mt-4 justify-content-center' >
        <div className="col-md-6 card shadow p-4">
        <h2>Add Products</h2>
      

    {/* form */}
    <form action=""onSubmit={handlesubmit}>
      {/* {Bidding} */}
    <h4 className='text-primary'>{success}</h4>
    <h4 className='text-secondary'>{loading}</h4>
    <h4 className='text-danger'>{error}</h4>

    <input type="text" placeholder='Enter product name' className='form-control' onChange={(e)=>setProduct_name(e.target.value)} /><br/>

    <input type="text" placeholder='Enter product description' className='form-control' onChange={(e)=>setProduct_description(e.target.value)} /> <br />

    <input type="number" placeholder='Enter product cost' className='form-control ' onChange={(e)=>setProduct_cost(e.target.value)} /> <br />

    <input type="file" accept='/image' placeholder='Enter product photo' className='form-control' onChange={(e)=>setProduct_photo(e.target.files[0])} /> <br />
      
    <button type='submit' className='btn btn-outline-warning w-50'>Submit</button>
  
    </form>  

</div>
</div>
   )
}

export default Addproducts
  