import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiInstance";

const Register = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                registerData
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4">

            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">

                <h2 className="text-4xl font-bold text-center text-pink-600 mb-8">
                    CRM Register
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Username */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={registerData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                            required
                        />

                    </div>


                    {/* Email */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={registerData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none"
                            required
                        />

                    </div>


                    {/* Password */}
                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Password"
                                value={registerData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 focus:ring-2 focus:ring-pink-400 outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-3 text-pink-600 font-semibold"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition duration-300"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-pink-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;