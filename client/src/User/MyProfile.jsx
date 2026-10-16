import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const MyProfile = () => {
  const userId = sessionStorage.getItem('user_id');

  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [photo, setPhoto] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/user_single/${userId}/`);
      setName(response.data.userData[0].user_name);
      setEmail(response.data.userData[0].user_email);
      setAddress(response.data.userData[0].user_address);
      setDistrict(response.data.userData[0].place__district__district_name);
      setPlace(response.data.userData[0].place__place_name);
      setPhoto(response.data.userData[0].user_photo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <table border={1} align='center' cellPadding={10}>
        <tr>
          <td colSpan={2} align='center'><img src={`http://127.0.0.1:8000/${photo}`} alt="" width="200" height="200"/></td>
        </tr>
        <tr>
          <td width={200}>Name</td>
          <td width={200}>{name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{address}</td>
        </tr>
        <tr>
          <td>District</td>
          <td>{district}</td>
        </tr>
        <tr>
          <td>Place</td>
          <td>{place}</td>
        </tr>
        <tr>
          <td colSpan={2} align='center'>
            <button onClick={()=>navigate('/user/editprofile')}>Edit Profile</button>
            <button onClick={()=>navigate('/user/changepassword')}>Change Password</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default MyProfile