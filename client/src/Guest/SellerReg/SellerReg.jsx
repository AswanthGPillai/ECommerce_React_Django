import axios from 'axios'
import React, { useState } from 'react'

const SellerReg = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            const res = await axios.post('http://127.0.0.1:8000/seller/', formData)
            alert(res.data.msg)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>Name</td>
                    <td><input type="text" onChange={(e)=>setName(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="email" onChange={(e)=>setEmail(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" onChange={(e)=>setPassword(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handleSubmit}>Submit</button>
                    </td>
                </tr>

            </table>
        </div>
    )
}

export default SellerReg