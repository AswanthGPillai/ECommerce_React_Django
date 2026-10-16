import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const Homepage = () => {
  const userId = sessionStorage.getItem('user_id');
  const [name, setName] = useState('');
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/user_single/${userId}/`);
      console.log(response.data);
      
      setName(response.data.userData[0].user_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome {name}</h1>
      <Link to="products">Products</Link><br />
      <Link to="cart">Cart</Link><br />
      <Link to="orders">Orders</Link><br />
      <Link to="myprofile">View Profile</Link>


      </div>
  )
}

export default Homepage