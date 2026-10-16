import React from 'react'
import { Route, Routes } from 'react-router'
import Homepage from '../../User/Homepage'
import MyProfile from '../../User/MyProfile'
import EditProfile from '../../User/EditProfile'
import ChangePassword from '../../User/ChangePassword'
import PageNotFound from '../../PageNotFound/PageNotFound'
import Products from '../../User/Products'
import Cart from '../../User/Cart'
import Orders from '../../User/Orders'
import Payment from '../../User/Payment'

const UserRoutes = () => {
  return (
    <div>
        <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment/:id" element={<Payment />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
    </div>
  )
}

export default UserRoutes