import React from 'react'
import { Route, Routes } from 'react-router'
import Product from '../../Seller/Product/Product'
import Stock from '../../Seller/Stock/Stock'
import PageNotFound from '../../PageNotFound/PageNotFound'

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/product" element={<Product />} />
                <Route path="/stock/:id" element={<Stock />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default SellerRoutes