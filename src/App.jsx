import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import protectedRoute from "./components/protectedRoute";

function App() {

    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/"
                element={
                    <protectedRoute>
                        <Home />
                    </protectedRoute>
                }
            />

        </Routes>
    );
}

export default App;