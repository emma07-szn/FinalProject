import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MpesaCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely extract cart details with fallbacks to avoid crashes
  const totalAmount = location.state?.totalAmount || 0;
  const cartItems = location.state?.items || [];
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const imgBaseUrl = 'https://emmah.alwaysdata.net/static/images/';

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setMessage("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Replace with your real STK Push backend API endpoint
      const response = await axios.post("https://emmah.alwaysdata.net/api/mpesa_payment", {
        phone: phoneNumber,
        amount: totalAmount,
      });

      if (response.data.success) {
        setMessage("STK Push prompt sent successfully! Please check your phone.");
      } else {
        setMessage("Payment initiation failed. Try again.");
      }
    } catch (err) {
      setMessage("An error occurred during payment processing.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // If the user navigates here directly with an empty cart, gracefully redirect them back
  if (cartItems.length === 0 && totalAmount === 0) {
    return (
      <div className="container text-center mt-5">
        <p className="text-muted">No checkout data found.</p>
        <button className="btn btn-danger" onClick={() => navigate('/')}>Go to Products</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center text-success mb-4">Lipa na M-Pesa</h3>
            
            {/* Display list of items being purchased */}
            <div className="mb-4">
              <h5>Order Summary</h5>
              <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                {cartItems.map((item) => (
                  <div key={item.product_id} className="d-flex align-items-center justify-content-between border-bottom py-2">
                    <div className="d-flex align-items-center">
                      <img 
                        src={imgBaseUrl + item.product_photo} 
                        alt={item.product_name} 
                        style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px" }}
                        className="rounded"
                      />
                      <span>{item.product_name} <small className="text-muted">x{item.quantity}</small></span>
                    </div>
                    <span className="fw-bold">Ksh {item.product_cost * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span className="fs-5">Total to Pay:</span>
                <span className="fs-5 fw-bold text-dark">Ksh {totalAmount}</span>
              </div>
            </div>

            {/* Mpesa Payment Form */}
            <form onSubmit={handlePayment}>
              <div className="mb-3">
                <label className="form-label fw-bold">Safricom M-Pesa Phone Number</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="e.g. 0712345678 or 254712345678" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                />
              </div>

              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
                  {message}
                </div>
              )}

              <button type="submit" className="btn btn-success w-100 fw-bold py-2" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing STK Push...
                  </>
                ) : (
                  `Pay Ksh ${totalAmount}`
                )}
              </button>
            </form>

            <button className="btn btn-link text-secondary w-100 mt-3" onClick={() => navigate('/cart')} disabled={loading}>
              Cancel and Return to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpesaCheckout;
