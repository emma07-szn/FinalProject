import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'

const Getproducts = () => {
  // states
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [product, setProducts] = useState([])


  const navigate = useNavigate()
  const { addToCart } = useCart() // Destructure the addToCart function


  const Getproducts = async () => {
    setLoading("Please Wait, we are retriving the product...")


    try {
      const responce = await axios.get("https://emmah.alwaysdata.net/api/get_products_details")
      console.log(responce)
      setProducts(responce.data)
    } catch (error) {

    }
  }


  useEffect(() => {
    Getproducts()
  }, [])

  const filterproduct = product.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  )

  const imgurl = 'https://emmah.alwaysdata.net/static/images/'

  const handleBuyNow = (prod) => {
    addToCart(prod) // 1. Save product to the global cart state
    navigate('/cart') // 2. Immediately redirect to the cart
  }
  return (
    <div className='m-1'>
      <div className="row justify-content-center">
        <h3>Available Products</h3>
        <div className='col-md-8 justify-content-center'>

          <input type="" className='form-control' placeholder='Search Products...' onChange={(e) => setSearch(e.target.value)} />

        </div>
      </div>


      <div className="row">


        {/* create the product card */}
        {filterproduct.map((product) => (
          <div className='col-md-3 justify-content-center mb-2'>
            <div className='card shadow m-2'>
              <img src={imgurl + product.product_photo} alt="" height="" />
              <div className='card-body'>
                <h5 className='text-dark ms-1'>{product.product_name}</h5>
                <p className='text-muted'>{product.product_description}</p>
                <b className='text-dark'>ksh {product.product_cost}</b><br />
                <button className='btn btn-danger' onClick={() => navigate("/Mpesa", { state: { product } })}>Buy Now</button> <br /> <br />

                {/* Action changed to trigger the dynamic redirect */}
                <button className='btn btn-danger w-50' onClick={() => handleBuyNow(product)}>Add to Cart</button>


              </div>
            </div>



          </div>))}
        {filterproduct.length === 0 && <div className='row justify-content-center'>
          <p className='m-3'>No Product Found</p>
        </div>}
      </div>

    </div>




  )
}

export default Getproducts