import { useState } from 'react'
import LoginPage from './Pages/LoginPage.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import NormalUserDashboard from './Pages/NormalUserDashboard.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/normal-user" element={<NormalUserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

