import React from 'react'
import { Accordion } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  const user=JSON.parse(localStorage.getItem("user"))


  const Logout=()=>{
    localStorage.removeItem("user")
    navigate("/")
    
  }
  return (
    <div>
     {/* <!-- Navbar --> */}
        <div class="row">
            <div class="col-md-12">
    {/* <!--create  navbar --> */}
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" class="navbar-brand text-dark"></a>
        <a>
        <img src="logo.jpeg" alt="" height="50" width="50"  />
        </a>
        {/* <a href="#" class="navbar-brand">
          <img src="images/LOgo cake 2.jpeg" alt="" height="50" width="50" style="border-radius: 50%;"></a> */}
        <a href="#" class="navbar-brand  text-light"></a>
        <div class="logo">
            <h4>Sweet Delight</h4>
            <p>--BAKERY--</p>
            </div>

            

     {/* <!-- nav links --> */}
      <div class="collapse navbar-collapse" id="navbarcollapse">
        <div class="navbar-nav">
            {user&&user.role==="admin"&&<Link to="addproduct" class="nav-link text-dark ms-5">Add Products</Link>}
            {user&&<Link to="getproduct" class="nav-link text-dark ms-5">Get products</Link>}
            {user&&<Link to="ordernow" class="nav-link text-light ms-5 rounded-pill ps-4 pe-4 bg-danger">Cart</Link>}
            {user&&<button onClick={Logout} className='btn btn-warning ms-5 rounded-pill ps-4 pe-4'>Logout</button>}
            {user&&<button onClick={()=>navigate("/account")} className='btn btn-info ms-5 rounded-pill ps-4 pe-4'>Account</button>}
        </div>
      </div>

        </nav>
        </div>
     </div>
          
     
    </div>
  )
}

export default Navbar