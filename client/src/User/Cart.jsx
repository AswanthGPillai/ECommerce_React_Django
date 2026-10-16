import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const Cart = () => {
    const userId = sessionStorage.getItem('user_id');
    const [cartData, setCartData] = useState([])
    const [msg, setMsg] = useState("")

    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate()

    const fetchCartData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/mycart/${userId}/`)
            if (res.data.cartdata) {
                console.log(res.data.cartdata);
                setCartData(res.data.cartdata)
                calculateTotal()
            }else if(res.data.msg){
                // alert(res.data.msg)
                setMsg(res.data.msg)
            }



        } catch (error) {
            console.log(error);

        }
    }



    const calculateTotal = () => {
        let total = 0;

        for (const cart of cartData) {
            const price = Number(cart.product__product_price) || 0;
            const qty = Number(cart.cart_qty) || 0;

            total += price * qty;
        }

        setGrandTotal(total);
    };




    const handleQty = async (cid, qty) => {
        console.log(qty);

        try {
            const formdata = new FormData()
            formdata.append("qty", qty)
            const res = await axios.post(`http://127.0.0.1:8000/cart_qty/${cid}/`, formdata)



            fetchCartData()

        } catch (error) {
            console.log(error);
        }

    }


    const handleCheckout = async () => {
        try {
            const bookingId = cartData[0].booking_id
            const formdata = new FormData()
            formdata.append("bid", bookingId)
            formdata.append("grandTotal", grandTotal)

            const res = await axios.post(`http://127.0.0.1:8000/mycart/${userId}/`, formdata)
            alert(res.data.msg)
            navigate(`/user/payment/${bookingId}/`)
        } catch (error) {
            console.log(error);

        }
    }


    const handleRemove = async(id)=>{
        try {
            const res = await axios.post(`http://127.0.0.1:8000/cart_item_remove/${id}/`)
            alert(res.data.msg)
            fetchCartData()
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchCartData()

    }, [])


    useEffect(() => {
        calculateTotal()
    }, [cartData]);
    return (
        <div>
            {msg && <h1 align="center">Empty Cart</h1>}
            <table border={1} cellPadding={10} align='center'>
                <tr>
                    <td>Sl.No</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                    <td>Action</td>
                </tr>
                {cartData.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.product__product_name}</td>
                        <td>{data.product__product_price}</td>
                        <td>  <input type="number" value={data.cart_qty} min={1} onChange={(e) => handleQty(data.id, Number(e.target.value))} /></td>
                        <td>
                            {data.product__product_price * data.cart_qty}
                        </td>
                        <td>
                            <button onClick={()=>handleRemove(data.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={6} align='right'>Grand Total : {grandTotal}</td>

                </tr>
                <tr>
                    <td colSpan={6} align='right'>
                        <button onClick={handleCheckout}>CheckOut</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Cart