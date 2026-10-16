import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const Payment = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [bookingData, setBookingData] = useState([])

    const fetchBookingData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/payment/${id}/`)
            console.log(res.data);
            setBookingData(res.data.bookingData[0])
        } catch (error) {
            console.log(error);

        }
    }

    const handlePay = async () => {
        try {
            const res = await axios.post(`http://127.0.0.1:8000/payment/${id}/`)
            alert(res.data.msg)
            navigate('/user/orders', { replace: true })
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchBookingData()
    }, [])
    return (
        <div>
            <table border={1} cellPadding={10} align='center'>
                <tr>
                    <td>Card Number</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>Card Holders Name</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>CVV Number</td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td>Grand Total</td>
                    <td>{bookingData.booking_amount}</td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handlePay}>Pay Now</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Payment