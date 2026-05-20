import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/apiInstance";

const Home = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const decoded = token ? jwtDecode(token) : null;

    const [customers, setCustomers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        phone: "",
        company: "",
        status: "Lead",
    });

    const fetchCustomers = async () => {

        try {

            const response = await api.get(
                "/customers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCustomers(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateCustomer = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/customers/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchCustomers();

            setFormData({
                customerName: "",
                email: "",
                phone: "",
                company: "",
                status: "Lead",
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateCustomer = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/customers/${editingId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditingId(null);

            fetchCustomers();

        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteCustomer = async (id) => {

        try {

            await api.delete(
                `/customers/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchCustomers();

        } catch (err) {
            console.log(err);
        }
    };

    const handleEditCustomer = (customer) => {

        setEditingId(customer._id);

        setFormData({
            customerName: customer.customerName,
            email: customer.email,
            phone: customer.phone,
            company: customer.company,
            status: customer.status,
        });
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">

            {/* Navbar */}
            <nav className="bg-white shadow-md px-6 py-4">

                <div className="max-w-7xl mx-auto flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold text-purple-700">
                            CRM Dashboard
                        </h1>

                        <p className="text-gray-600">
                            Welcome {decoded?.username}
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </div>

            </nav>


            <div className="max-w-7xl mx-auto p-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">

                    <h2 className="text-2xl font-bold text-purple-700 mb-6">

                        {editingId
                            ? "Update Customer"
                            : "Add Customer"}

                    </h2>

                    <form
                        onSubmit={
                            editingId
                                ? handleUpdateCustomer
                                : handleCreateCustomer
                        }
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        <input
                            type="text"
                            name="customerName"
                            placeholder="Customer Name"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Customer Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />

                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
                            required
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl px-4 py-3"
                        >
                            <option value="Lead">Lead</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 font-semibold hover:scale-105 hover:from-purple-600 hover:to-pink-600 transition duration-300"
                        >
                            {editingId
                                ? "Update Customer"
                                : "Add Customer"}
                        </button>

                    </form>

                </div>


                {/* Customer Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {customers.map((customer) => (

                        <div
                            key={customer._id}
                            className="bg-white p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300"
                        >

                            <h2 className="text-2xl font-bold text-purple-700 mb-3">
                                {customer.customerName}
                            </h2>

                            <p className="text-gray-700 mb-1">
                                {customer.email}
                            </p>

                            <p className="text-gray-700 mb-1">
                                {customer.phone}
                            </p>

                            <p className="text-gray-700 mb-1">
                                {customer.company}
                            </p>

                            <p className="font-semibold text-pink-600 mt-2">
                                {customer.status}
                            </p>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() =>
                                        handleEditCustomer(customer)
                                    }
                                    className="flex-1 bg-yellow-400 py-2 rounded-xl hover:bg-yellow-500 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDeleteCustomer(customer._id)
                                    }
                                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Home;