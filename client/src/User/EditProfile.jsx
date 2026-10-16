import axios from 'axios';
import React, { useState, useEffect } from 'react'

const EditProfile = () => {
  const userId = sessionStorage.getItem('user_id');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState(null);
  console.log(district);

  const [place, setPlace] = useState(null);
  console.log(place);

  const [photo, setPhoto] = useState('');
  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);
  console.log(districts);

  console.log(places);


  const fetchDistricts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/district/');

      setDistricts(response.data.district_data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/place/`);
      setPlaces(response.data.placeData);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/user_single/${userId}/`);
      console.log(response.data);

      setName(response.data.userData[0].user_name);
      setEmail(response.data.userData[0].user_email);
      setAddress(response.data.userData[0].user_address);
      setDistrict(response.data.userData[0].place__district_id);
      setPlace(response.data.userData[0].place);
      setPhoto(response.data.userData[0].user_photo);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const handleUpdate = async () => {
    try {
      if(place == ""){
        alert("Place Should Be Selected..")
        return
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('place', place);
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await axios.post(`http://127.0.0.1:8000/user_edit/${userId}/`, formData);
      alert('Profile Updated Successfully');
      fetchUserData();

    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchDistricts();
    fetchPlaces();
  }, [userId]);

  return (
    <div>
      <table border={1} align='center' cellPadding={10}>
        <tr>
          <td>Name</td>
          <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Email</td>
          <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Address</td>
          <td><textarea name="" id="" value={address} onChange={(e) => setAddress(e.target.value)}></textarea></td>
        </tr>
        <tr>
          <td>District</td>
          <td>
            <select name="" id="" value={district} onChange={(e) => { setDistrict(e.target.value); setPlace('') }}>
              <option value="">--Select District--</option>

              {districts.map((district) => (
                <option key={district.id} value={district.id}>{district.district_name}</option>
              ))}

            </select></td>
        </tr>
        <tr>
          <td>Place</td>
          <td>
            <select name="" id="" value={place || ''} onChange={(e) => setPlace(e.target.value)}>
              <option value="">--Select Place--</option>

              {places.filter((data) => data.district_id == district).map((data) => (
                <option key={data.id} value={data.id}>
                  {data.place_name}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td><img src={`http://127.0.0.1:8000/${photo}`} alt="" width="100" height="100" /></td>
          <td><input type="file" onChange={(e) => setPhoto(e.target.files[0])} /></td>
        </tr>
        <tr>
          <td colSpan={2} align='center'>
            <button onClick={handleUpdate}>Update</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default EditProfile