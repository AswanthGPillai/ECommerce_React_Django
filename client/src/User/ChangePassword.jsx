import axios from 'axios';
import React, { useState } from 'react'

const ChangePassword = () => {
  const userId = sessionStorage.getItem('user_id');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('old_password', oldPassword);
      formData.append('new_password', newPassword);
      formData.append('confirm_password', confirmPassword);
      const response = await axios.post(`http://127.0.0.1:8000/change_password/${userId}/`, formData);
      console.log(response.data);
      
      if (response.data.msg == "Old password is incorrect") {
        alert('Old password is incorrect.');
      } else if (response.data.msg == "New password and confirm password do not match") {
        alert('New password and confirm password do not match.');
      } else {
        alert('Password changed successfully...');
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <table border={1} align='center' cellPadding={10}>
        <tr>
          <td>Old Password</td>
          <td><input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td>New Password</td>
          <td><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Confirm Password</td>
          <td><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></td>
        </tr>
        <tr>
          <td colSpan={2} align='center'>
            <button onClick={handleChangePassword}>Submit</button>
            <button>Reset</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default ChangePassword