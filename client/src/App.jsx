import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { configureApiAuth } from './api/client';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DiaryPage from './pages/diary/DiaryPage';
import GuidePage from './pages/guide/GuidePage';
import ArticlePage from './pages/guide/ArticlePage';
import MessagesPage from './pages/messages/MessagesPage';
import ProfilePage from './pages/profile/ProfilePage';

// Wire auth store into axios interceptors once
configureApiAuth({
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  setTokens: (at, rt) => useAuthStore.getState().setTokens(at, rt),
  clearAuth: () => useAuthStore.getState().clear(),
});

export default function App() {
  const { refreshToken, setTokens, clear } = useAuthStore();

  // On app boot: if we have a refreshToken, exchange it for a new accessToken
  useEffect(() => {
    if (!refreshToken) return;

    fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setTokens(data.accessToken, data.refreshToken))
      .catch(() => clear());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registreren" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dagboek" replace />} />
          <Route path="/dagboek" element={<DiaryPage />} />
          <Route path="/gids" element={<GuidePage />} />
          <Route path="/gids/:id" element={<ArticlePage />} />
          <Route path="/berichten" element={<MessagesPage />} />
          <Route path="/profiel" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
