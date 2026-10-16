import React from 'react'
import { Route, Routes } from 'react-router'
import { Homepage } from '../../Guest/Homepage/Homepage'
import UserRegistration from '../../Guest/UserRegistration/UserRegistration'
import Login from '../../Guest/Login/Login'
import PageNotFound from '../../PageNotFound/PageNotFound'
import SellerReg from '../../Guest/SellerReg/SellerReg'
const GuestRoutes = () => {
  return (
    <div>
         <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/userregistration" element={<UserRegistration />} />
                <Route path="/sellerregistration" element={<SellerReg />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

    </div>
  )
}

export default GuestRoutes