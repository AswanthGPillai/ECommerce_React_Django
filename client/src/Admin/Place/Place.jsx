import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Place = () => {
    const [place, setPlace] = useState("")
    const [districts, setDistricts] = useState([])
    const [district, setDistrict] = useState("")
    const [places, setPlaces] = useState([])
    const [editId, setEditId] = useState(null);



    const fetchDistricts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/district/')
            // console.log(res.data.district_data);
            setDistricts(res.data.district_data)

        } catch (error) {
            console.log(error);

        }
    }

    const handleSubmit = async () => {
        try {


            if (editId) {
                const formData = new FormData();
                formData.append('place_name', place);
                formData.append('district', district);
                const res = await axios.post(`http://127.0.0.1:8000/place_edit/${editId}/`, formData )
                alert("Place Updated Successfully")
                fetchPlace()
            }
            else {

                const formData = new FormData();
                formData.append('place', place);
                formData.append('district', district);
                const res = await axios.post('http://127.0.0.1:8000/place/', formData)
                alert("Place Added Successfully...")
                setDistrict("")
                setPlace("")
                fetchPlace()
            }

        } catch (error) {
            console.log(error)

        }
    }



    const fetchPlace = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/place/')
            console.log(response.data.placeData);
            setPlaces(response.data.placeData)
        } catch (error) {
            console.log(error);

        }
    }


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/place_delete/${id}/`)
            alert("Place Deleted Successfully...")
            fetchPlace()
        } catch (error) {
            console.log(error);

        }
    }


    const handleUpdate = async (data) => {
        setEditId(data.id)
        setPlace(data.place_name)
        setDistrict(data.district_id)
    }



    useEffect(() => {
        fetchDistricts()
        fetchPlace()
    }, [])



    return (
        <div>
            <table border={1} align='center'>
                <tr>
                    <td>District</td>
                    <td>
                        <select name="" id="" value={district} onChange={(e) => setDistrict(e.target.value)}>
                            <option value="">--Select District--</option>
                            {
                                districts.map((data) => (
                                    <option value={data.id} key={data.id}>{data.district_name}</option>
                                ))
                            }

                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td><input type="text" value={place} onChange={(e) => setPlace(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center' >
                        <button onClick={handleSubmit}>{editId ? "Update" : "Submit"}</button>
                    </td>
                </tr>
            </table>
            <br /><br /><br />
            <table border={1} align='center' cellPadding={10}>
                <tr>
                    <td>Slno</td>
                    <td>Place</td>
                    <td>District</td>
                    <td>Action</td>
                </tr>
                {places.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.place_name}</td>
                        <td>{data.district__district_name}</td>
                        <td>
                            <button onClick={() => handleUpdate(data)}>Edit</button>
                            <button onClick={() => handleDelete(data.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Place