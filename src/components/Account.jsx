import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");

  // Running this on mount to populate form fields
  useEffect(() => {
    const GetUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      
      setName(user?.username || "");
      setEmail(user?.email || "");
      setPhone(user?.phone || "");
      setPassword(user?.password || "");
      setUserid(user?.user_id || "");

      console.log(user);
    };

    GetUser();
  }, []); // Safe empty array: runs exactly once when component loads

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading("Please Wait...");

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    try {
      const response = await axios.patch(`https://emmah.alwaysdata.net/api/update_user/${userid}`, formData);

      setLoading("");
      setSuccess(response.data.message);
      console.log(response);
      console.log("Submitting Profile Data:", formData);
    } catch (error) {
      setError(error.message);
      setLoading("");
      console.log(error);
    }
  };

  const deleteuser = async () => {
    const confirm = window.confirm("Are you sure you want to delete this account");
    if (!confirm) return;
    try {
      const response = await axios.delete(`https://emmah.alwaysdata.net/api/delete-user/${userid}`);
      setSuccess(response.data.message);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '700px', margin: '20px auto' }}>
        <div className="row">
          <div className="col-md-4">
            <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Update Account</h3>
          </div>
          <div className="col-md-4">
            <button onClick={deleteuser} type='button' className='btn btn-danger w-70 mb-5'>Delete Account</button>
          </div>
        </div>

        <h4>{loading}</h4>
        <h4>{success}</h4>
        <h4>{error}</h4>

        <input value={name} type="text" placeholder='Enter your name' className='form-control' onChange={(e) => setName(e.target.value)} /> <br /> 
        <input value={email} type="email" placeholder='Enter your email' className='form-control' onChange={(e) => setEmail(e.target.value)} /> <br /> 
        <input value={phone} type="text" placeholder='Enter your phone Number' className='form-control' onChange={(e) => setPhone(e.target.value)} /> <br /> 
        <input value={password} type="password" placeholder='Enter your password' className='form-control' onChange={(e) => setPassword(e.target.value)} /> <br /> 
         
        <button type='submit' className='btn btn-danger w-50'>Save Changes</button><br /><br />
      </form>
    </div>
  );
}

export default Account;
