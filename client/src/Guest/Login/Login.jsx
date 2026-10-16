import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            const response = await axios.post("http://127.0.0.1:8000/login/", formData);
            console.log(response.data);
            if (response.data.user_status === 0) {
                alert(response.data.msg);
            } else if (response.data.user_status === 2) {
                alert(response.data.msg);
            } else if (response.data.user_status === 1) {
                sessionStorage.setItem('user_id', response.data.user_id);
                alert(response.data.msg);
                navigate('/user');
            }
            else if(response.data.seller_id){
                sessionStorage.setItem('seller_id', response.data.seller_id);
                alert("Welcome Seller");
                navigate('/seller');
            }
            else {
                alert(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <center><h1>Login</h1></center>
            <table border={1} align='center'>
                <tr>
                    <td>Email</td>
                    <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align="center">
                        <button onClick={handleLogin}>Login</button>
                        <button>Reset</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Login