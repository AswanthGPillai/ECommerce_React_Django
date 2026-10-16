import React from 'react'
import District from '../../Admin/District/District'
import Homepage from '../../Admin/Homepage/Homepage'
import { Route, Routes } from 'react-router'
import Place from '../../Admin/Place/Place'
import UserList from '../../Admin/UserList/UserList'
import PageNotFound from '../../PageNotFound/PageNotFound'

const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/district" element={<District />} />
                <Route path="/place" element={<Place />} />
                <Route path="/user_list" element={<UserList />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default AdminRoutes