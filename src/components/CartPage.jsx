import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';

const CartPage = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const imgBaseUrl = 'https://emmah.alwaysdata.net/static/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we process your request...");
    setError("");
    setMessage("");

    if (!phone) {
      setError("Please enter a valid M-Pesa phone number.");
      setLoading("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("amount", getCartTotal());

      const response = await axios.post("https://emmah.alwaysdata.net/api/mpesa_payment", formData);
      setMessage(response.data.message);
      
      // If your API confirms success, you can optionally redirect or clear the cart here
      // navigate('/Mpesa', { state: { totalAmount: getCartTotal(), items: cartItems } });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Shopping Cart</h2>

      {loading && <div className="alert alert-info">{loading}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      
      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <p className="text-muted">Your cart is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <div className="row">
          {/* Items List */}
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div className="card mb-3 shadow-sm" key={item.product_id}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={imgBaseUrl + item.product_photo} 
                      className="img-fluid rounded-start" 
                      alt={item.product_name} 
                      style={{ maxHeight: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{item.product_name}</h5>
                      <p className="card-text text-muted">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="col-md-4 text-end pe-4">
                    <p className="fw-bold mb-1">Ksh {item.product_cost * item.quantity}</p>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.product_id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Panel */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h4>Order Summary</h4>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Total Amount:</span>
                <span className="fw-bold text-success">Ksh {getCartTotal()}</span>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label text-muted small">M-Pesa Phone Number</label>
                  <input 
                    id="phoneInput"
                    type="tel" 
                    placeholder='2547XXXXXXXX' 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                    className='form-control' 
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-success w-100" disabled={!!loading}>
                  {loading ? "Processing..." : "Proceed to M-Pesa Payment"}
                </button>
              </form>

              <button className="btn btn-link w-100 mt-2 text-secondary" onClick={() => navigate('/')}>
                Back to Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
