import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserList = () => {

    const [userData, setUserdata] = useState([])


    console.log(userData);


    const fetchUser = async () => {
        try {

            const response = await axios.get("http://127.0.0.1:8000/user_list/")
            setUserdata(response.data.userdata)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUser()

    }, []);


    const handleAccept = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/user_accept/${id}/`)
            alert('User Accepted Successfully...')
            fetchUser()

        } catch (error) {
            console.log(error);
        }
    }

    const handleReject = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/user_reject/${id}/`)
            alert('User Rejected Successfully...')
            fetchUser()

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div>
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>SINO</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Address</td>
                    <td>District</td>
                    <td>Place</td>
                    <td>Photo</td>
                    <td>Action</td>
                </tr>
                {
                    userData.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.user_name}</td>
                            <td>{data.user_email}</td>
                            <td>{data.user_address}</td>
                            <td>{data.place__district__district_name}</td>
                            <td>{data.place__place_name}</td>
                            <td><img src={`http://127.0.0.1:8000/${data.user_photo}`} width={150} height={150} /></td>
                            <td><button onClick={() => handleAccept(data.id)}>Accept</button>
                                <button onClick={() => handleReject(data.id)}>Reject</button>
                            </td>

                        </tr>
                    ))
                }


            </table>
        </div>
    )
}

export default UserList