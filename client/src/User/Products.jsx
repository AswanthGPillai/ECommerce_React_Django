import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
    const userId = sessionStorage.getItem('user_id');
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/productlist/')
            setProducts(res.data.productdata)
        } catch (error) {
            console.log(error);

        }
    }


    const handleAddtoCart = async (pid) => {
        try {
            const formData = new FormData();
            formData.append('pid', pid);
            const res = await axios.post(`http://127.0.0.1:8000/addcart/${userId}/`, formData)
            alert(res.data.msg)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div>
            <table border={1} cellPadding={10} align='center'>
                <tr>
                    <td>SlNO</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Action</td>
                </tr>
                {products.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.product_name}</td>
                        <td>{data.product_price}</td>
                        <td>
                            <button>Buy Now</button>
                            <button onClick={() => handleAddtoCart(data.id)}>Add to Cart</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Products