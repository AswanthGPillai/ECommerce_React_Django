import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const Product = () => {
    const SellerId = sessionStorage.getItem('seller_id');

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [products, setProducts] = useState([])

    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            const res = await axios.post(`http://127.0.0.1:8000/product/${SellerId}/`, formData)
            alert(res.data.msg)
        } catch (error) {
            console.log(error);

        }
    }

    const fetchSellerProducts = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/seller_productlist/${SellerId}/`)
            console.log(res.data);
            setProducts(res.data.productdata)

        } catch (error) {
            console.log(error);

        }
    }

    const addStock = (pid) => {
        navigate(`/seller/stock/${pid}`)
    }

    useEffect(() => {
        fetchSellerProducts()
    }, [])
    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>Product Name</td>
                    <td><input type="text" onChange={(e) => setName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Product Price</td>
                    <td><input type="text" onChange={(e) => setPrice(e.target.value)} /></td>
                </tr>
                <tr>
                    <td><button onClick={handleSubmit}>Submit</button></td>

                </tr>
            </table>
            <br /><br />
            <table border={1} align='center'>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Action</td>
                </tr>
                {products.map((data, index) => (
                    <tr key={data.id}>
                        <td>{data.product_name}</td>
                        <td>{data.product_price}</td>
                        <td>
                            <button onClick={() => addStock(data.id)}>Add Stock</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Product