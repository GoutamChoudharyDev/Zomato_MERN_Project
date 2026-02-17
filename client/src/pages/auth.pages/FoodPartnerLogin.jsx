import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const FoodPartnerLogin = () => {
    // usestates
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    // navigate
    const navigate = useNavigate();

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/auth/food-partner/login", {
                email,
                password
            })

            toast.success(res.data.message || "Login successful!");

            navigate("/food-partner/dashboard")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Partner Login</h2>
                    <p className="text-gray-600">Manage your restaurant and orders</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </label>
                        <Link to="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">New restaurant partner?</span>
                    </div>
                </div>

                {/* Register Link */}
                <Link
                    to="/food-partner/register"
                    className="block w-full text-center bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                >
                    Register Restaurant
                </Link>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>By signing in, you agree to our Partner Terms & Conditions</p>
                </div>
            </div>
        </div>
    );
};

export default FoodPartnerLogin;
