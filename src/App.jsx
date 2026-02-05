import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MobileLayout from './components/layout/MobileLayout';
import Hero from './components/layout/Hero';
import Dashboard from './pages/Dashboard';
import NewDashboard from './pages/NewDashboard';
import PostComposer from './pages/PostComposer';
import Accounts from './pages/Accounts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Admin',
  avatar: null,
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected dashboard routes with NEW MOBILE LAYOUT */}
        <Route element={<MobileLayout user={mockUser} />}>
          <Route path="/dashboard" element={<NewDashboard />} />
          <Route path="/post" element={<PostComposer />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Legacy routes with old layout (for comparison) */}
        <Route path="/old/*" element={<Layout navigationItems={[]} user={mockUser} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;