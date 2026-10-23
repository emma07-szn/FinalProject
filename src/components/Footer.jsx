import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='row text-white bg-dark p-3'>
      <div class="col-md-4">
        <h4 class="text-center">About Us</h4>
        <p className='text-white'>Make your special moments sweeter, one cake at a time.At [Sweet Delights], we believe that a cake shouldn't just sit at the center of the table; it should tell your unique story. <br /> What started as a passionate dream in a small family kitchen has blossomed into a premier custom cake boutique dedicated to turning your sweetest ideas into edible reality.</p>
        
    </div>

    <div className='col-md-4'>
      <h4 className='text-center'>Contact Us</h4>
      <form action="">
        <input type="text" className='form-control' placeholder='Enter your Email' /> <br /><br />
        <textarea name="" id="" cols="30" rows="6" className='form-control' placeholder='Leave a comment'></textarea> <br />
        <input type="button" value="Send Message" className='btn btn-info' />
      </form>

    </div>


    
    <div class="col-md-4 ">
        <h4 class="text-center">Follow us</h4>
        <Link><img src="fb.jpeg" alt="" height="40" width="40" p-4/></Link>
        <Link><img src="x.png" alt="" height="40" width="40"/></Link>
        <Link><img src="ig.jpeg" alt="" height="40" width="40" /></Link>
        
        <p class="text-dark"></p>
    </div>

   

   
      <footer class="text-light bg-dark text-center p-2">
    <h5>@2026 Sweet Delights Cake Shop.All rights reserved.</h5>
    </footer>
     </div>

  )
}

export default Footer

