import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth.pages/UserRegister'
import UserLogin from '../pages/auth.pages/UserLogin'
import FoodPartnerRegister from '../pages/auth.pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth.pages/FoodPartnerLogin'
import Home from '../pages/general.pages/Home'
import CreateFood from '../pages/food-partner/CreateFood'


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/food-partner/dashboard" element={<CreateFood />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes