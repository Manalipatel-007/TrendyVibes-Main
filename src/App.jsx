import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./customer/Auth/RegisterForm";
import LoginForm from "./customer/Auth/LoginForm";

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<RegisterForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
