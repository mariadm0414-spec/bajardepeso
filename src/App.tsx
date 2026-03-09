import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAuth, useAppState } from './store';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DailyPlan from './pages/DailyPlan';
import Recipes from './pages/Recipes';
import WeightTracker from './pages/WeightTracker';
import Profile from './pages/Profile';

function AppRoutes() {
  const { user } = useAuth();
  const { appState } = useAppState();

  useEffect(() => {
    if (appState.userGoal) {
      document.documentElement.setAttribute('data-theme', appState.userGoal);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [appState.userGoal]);

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/auth" element={<Navigate to="/signup" replace />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    );
  }

  if (!user.onboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/plan" element={<DailyPlan />} />
        <Route path="/plan/:day" element={<DailyPlan />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/progress" element={<WeightTracker />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
