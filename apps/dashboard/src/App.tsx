import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CallbackPage from './pages/CallbackPage';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

// Main App Component
const App: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
