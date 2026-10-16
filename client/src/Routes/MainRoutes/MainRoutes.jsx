
import { Route, Routes } from 'react-router'
import AdminRoutes from '../AdminRoutes/AdminRoutes'
import GuestRoutes from '../GuestRoutes/GuestRoutes'
import UserRoutes from '../UserRoutes/UserRoutes'
import SellerRoutes from '../SellerRoutes/SellerRoutes'

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<GuestRoutes />} />
                <Route path="seller/*" element={<SellerRoutes />} />
                <Route path="user/*" element={<UserRoutes />} />
            </Routes>
        </div>
    )
}

export default MainRoutes