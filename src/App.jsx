import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import ChatPage from '@/pages/ChatPage';
import CasesPage from '@/pages/CasesPage';
import DocumentsPage from '@/pages/DocumentsPage';
import AdminPage from '@/pages/AdminPage';
import LlmConfigPage from '@/pages/admin/LlmConfigPage';
import UserLlmConfigPage from '@/pages/admin/UserLlmConfigPage'; // New Import
import UserManagementPage from '@/pages/admin/UserManagementPage';
import RoleMatrixPage from '@/pages/admin/RoleMatrixPage';
import DataSourcePage from '@/pages/admin/DataSourcePage';
import SystemSettingsPage from '@/pages/admin/SystemSettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { motion, AnimatePresence } from 'framer-motion';

const mockAuth = {
  isAuthenticated: () => localStorage.getItem('isAuthenticated') === 'true',
  login: (callback) => {
    localStorage.setItem('isAuthenticated', 'true');
    if (callback) callback();
  },
  logout: (callback) => {
    localStorage.removeItem('isAuthenticated');
    if (callback) callback();
  },
};

function ProtectedRoute({ children }) {
  if (!mockAuth.isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/auth" element={<AuthPage login={mockAuth.login} />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout toggleTheme={toggleTheme} currentTheme={theme} logout={mockAuth.logout}>
                  <Outlet />
                </Layout>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="chat/:caseId" element={<ChatPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="admin" element={<Outlet />}>
              <Route index element={<AdminPage />} />
              <Route path="llm" element={<LlmConfigPage />} />
              <Route path="user-llm" element={<UserLlmConfigPage />} /> {/* New Route */}
              <Route path="users" element={<UserManagementPage />} />
              <Route path="roles" element={<RoleMatrixPage />} />
              <Route path="datasources" element={<DataSourcePage />} />
              <Route path="system" element={<SystemSettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;