import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router'

const Stock = () => {
    const { id } = useParams()
    const [stock, setStock] = useState("")

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('stock', stock);
            formData.append('stock', stock);
            const res = await axios.post(`http://127.0.0.1:8000/addstock/${id}/`, formData)
            alert(res.data.msg)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>Stock</td>
                    <td><input type="text" onChange={(e) => setStock(e.target.value)} /></td>
                </tr>
                <tr>
                    <td><button onClick={handleSubmit}>Submit</button></td>
                </tr>
            </table>
        </div>
    )
}

export default Stock