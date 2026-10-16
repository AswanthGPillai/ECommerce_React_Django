import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const UserRegistration = () => {
    const [UserName, setUserName] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserAddress, setUserAddress] = useState("")
    const [UserPhoto, setUserPhoto] = useState(null)
    const [UserPassword, setUserPassword] = useState("")
    const [district, setDistrict] = useState("")
    const [place, setPlace] = useState("")
    const [districts, setDistricts] = useState([])
    const [places, setPlaces] = useState([])

    const InputRef = useRef()
    console.log(district);

    console.log(places);

    const handleReset = () => {
        setUserName("");
        setUserEmail("");
        setUserAddress("");
        setUserPassword("");
        setPlace();
        setDistrict();

        InputRef.current.value = ""


    }

    const fetchDistricts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/district/')
            setDistricts(res.data.district_data)

        } catch (error) {
            console.log(error);

        }
    }

    const fetchPlace = async (did) => {
        try {

            const response = await axios.get('http://127.0.0.1:8000/place/')
            console.log(response.data.placeData);
            setPlaces(response.data.placeData)
        } catch (error) {
            console.log(error);

        }
    }


    const handleSubmit = async () => {
        try {

            const formData = new FormData();
            formData.append('name', UserName);
            formData.append('email', UserEmail);
            formData.append('address', UserAddress);
            formData.append('photo', UserPhoto);
            formData.append('password', UserPassword);
            formData.append('place', place);

            console.log(Object.fromEntries(formData));



            const response = await axios.post("http://127.0.0.1:8000/user/", formData)
            alert('User Registered Successfully')
            handleReset();



        } catch (err) {
            console.log(err);

        }


    }
    useEffect(() => {
        fetchDistricts()
        fetchPlace()
    }, []);



    return (
        <div>
            <table cellPadding={8} border={1} align='center'>
                <tr>
                    <td>Name</td>
                    <td><input type="text" name="" id="" value={UserName} onChange={(e) => setUserName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="text" name="" id="" value={UserEmail} onChange={(e) => setUserEmail(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td><textarea name="" id="" value={UserAddress} onChange={(e) => setUserAddress(e.target.value)}></textarea></td>
                </tr>
                <tr>
                    <td>Photo</td>
                    <td><input type="file" name="" id="" ref={InputRef} onChange={(e) => setUserPhoto(e.target.files[0])} /></td>
                </tr>
                <tr>
                    <td>District</td>
                    <td><select name="" id="" value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option value="">--Select District --</option>
                        {
                            districts.map((data, index) => (
                                <option key={data.id} value={data.id}>{data.district_name}</option>
                            ))
                        }
                    </select></td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td>
                        <select name="" id="" value={place} onChange={(e) => setPlace(e.target.value)}>
                            <option value="">--Select Place --</option>
                            {district != "" &&
                                places.filter(data => district == data.district_id).map((data, index) => (
                                    <option key={data.id} value={data.id}>{data.place_name}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>


                <tr>
                    <td>Password</td>
                    <td><input type="password" name="" id="" value={UserPassword} onChange={(e) => setUserPassword(e.target.value)} /></td>
                </tr>

                <tr>
                    <td colSpan={2} align='center'>
                        <button onClick={handleSubmit}>Register</button>
                        <button onClick={handleReset}>Reset</button>
                    </td>
                </tr>
            </table>

        </div>
    )
}

export default UserRegistration