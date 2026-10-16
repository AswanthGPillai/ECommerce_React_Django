import axios from 'axios';
import React, { useEffect, useState } from 'react'

const District = () => {
    const [districtName, setDistrictName] = useState("");
    const [editId, setEditId] = useState(null);
    const [districtData, setDistrictData] = useState([]);

    const handleSubmit = async () => {
        try {
            if (editId) {
                const formData = new FormData();
                formData.append('districtName', districtName);
                const response = await axios.post(`http://127.0.0.1:8000/district_edit/${editId}/`, formData)
                alert('District Updated Successfully')
                setDistrictName("")
                setEditId(null)
                fetchData()
            }
            else {
                const formData = new FormData();
                formData.append('districtName', districtName);
                const response = await axios.post("http://127.0.0.1:8000/district/", formData)
                alert('District Inserted Successfully')
                setDistrictName("")
                fetchData()
            }


        } catch (err) {
            console.log(err);

        }
    }


    const handleDelete = async (did) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/district_del/${did}/`)
            alert('District Deleted Successfully')
            fetchData()


        } catch (err) {
            console.log(err);

        }
    }


    const handleUpdate = async (data) => {
        setEditId(data.id)
        setDistrictName(data.district_name)

    }


    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/district/")
            setDistrictData(response.data.district_data)
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        fetchData()
    }, [])

    return (

        <div>
            <table border={1} align='center' cellPadding={8}>
                <tr>
                    <td>District</td>
                    <td><input type="text" name="" id="" value={districtName} onChange={(e) => setDistrictName(e.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'><button onClick={handleSubmit}>{editId ? "Update" : "Submit"}</button></td>

                </tr>
            </table>
            <br />

            <table border={1} align='center'>
                <tr>
                    <td>SNO</td>
                    <td>District Name</td>
                    <td>Action</td>
                </tr>
                {
                    districtData.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.district_name}</td>
                            <td>
                                <button onClick={() => handleDelete(data.id)}> Delete </button>
                                <button onClick={() => handleUpdate(data)}> Edit </button>
                            </td>
                        </tr>

                    ))


                }

            </table>

        </div>
    )
}

export default District