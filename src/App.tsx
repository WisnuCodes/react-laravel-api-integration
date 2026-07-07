import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import Products from './pages/Products';
import './App.css';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Memuat...</div>;
  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="page-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
            <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.025em', marginBottom: '1rem' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Silakan masuk untuk melanjutkan.</p>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />

        <Route path="/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/users/:id" element={
          <ProtectedRoute>
            <UserDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
