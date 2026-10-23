import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router'

const Orders = () => {
    const uid = sessionStorage.getItem("user_id")
    const [cartData, setCartData] = useState([])
    const [bookingData, setBookingData] = useState([])

    const navigate = useNavigate()
    console.log(uid);


    const fetchOrders = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/orders/${uid}/`)
            console.log(res.data);
            setCartData(res.data.cartData)
            setBookingData(res.data.bookingData)

        } catch (error) {
            console.log(error);

        }
    }


    const handlePayment = async (id) => {
        try {
            const bookingId = id
            navigate(`/user/payment/${bookingId}/`)
        } catch (error) {
            console.log(error);

        }
    }




    useEffect(() => {
        fetchOrders()
    }, [])


    return (
        <div>
            {bookingData.filter((data) => data.booking_status == 2).map((data, index) => (
                <table border={1} align='center' cellPadding={10} key={data.id}>
                    <tr>
                        <td>Sl.No</td>
                        <td>Product</td>
                        <td>price</td>
                        <td>Quantity</td>
                        <td>Stock</td>
                    </tr>
                    {cartData.filter((cart) => cart.booking_id === data.id).map((cart, cartIndex) => (
                        <tr>
                            <td>{cartIndex + 1}</td>
                            <td>{cart.product__product_name}</td>
                            <td>{cart.product__product_price}</td>
                            <td>{cart.cart_qty}</td>
                            <td>{cart.product__product_price * cart.cart_qty}</td>
                        </tr>))}
                    <tr>
                        <td colSpan={5} align='right'>Grand Total : {data.booking_amount} </td>
                    </tr>
                </table>))}

            <br /><br /><br />

            {bookingData.filter((data) => data.booking_status == 1).map((data, index) => (
                <table border={1} align='center' cellPadding={10} key={data.id}>
                    <tr>
                        <td>Sl.No</td>
                        <td>Product</td>
                        <td>price</td>
                        <td>Quantity</td>
                        <td>Stock</td>
                    </tr>
                    {cartData.filter((cart) => cart.booking_id === data.id).map((cart, cartIndex) => (
                        <tr>
                            <td>{cartIndex + 1}</td>
                            <td>{cart.product__product_name}</td>
                            <td>{cart.product__product_price}</td>
                            <td>{cart.cart_qty}</td>
                            <td>{cart.product__product_price * cart.cart_qty}</td>

                        </tr>))}
                    <tr>
                        <td colSpan={5} align='right'>Grand Total : {data.booking_amount} </td>
                    </tr>
                    <tr>
                        <td colSpan={5} align='right'>
                            <button onClick={() => handlePayment(data.id)}>Payment</button>
                        </td>
                    </tr>
                </table>))}
        </div>
    )
}

export default Orders