import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import Report from "./pages/Report/Report.jsx";

function App() {
    return (
        <div className="flex w-full items-center justify-center h-screen">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/report" element={<Report />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;