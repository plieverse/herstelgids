import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { configureApiAuth } from './api/client';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DiaryPage from './pages/diary/DiaryPage';
import DiaryVraag1Page from './pages/diary/DiaryVraag1Page';
import DiaryVraag2Page from './pages/diary/DiaryVraag2Page';
import DiaryVraag3Page from './pages/diary/DiaryVraag3Page';
import GuidePage from './pages/guide/GuidePage';
import ArticlePage from './pages/guide/ArticlePage';
import MessagesPage from './pages/messages/MessagesPage';
import ProfilePage from './pages/profile/ProfilePage';
import OnboardingWelcome from './pages/onboarding/OnboardingWelcome';
import OnboardingPrivacy from './pages/onboarding/OnboardingPrivacy';
import OnboardingActivatiecode from './pages/onboarding/OnboardingActivatiecode';
import OnboardingFeature from './pages/onboarding/OnboardingFeature';
import OnboardingDagboek from './pages/onboarding/OnboardingDagboek';
import OnboardingGids from './pages/onboarding/OnboardingGids';
import OnboardingBerichten from './pages/onboarding/OnboardingBerichten';

configureApiAuth({
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  setTokens: (at, rt) => useAuthStore.getState().setTokens(at, rt),
  clearAuth: () => useAuthStore.getState().clear(),
});

function RootRedirect() {
  const onboardingDone = localStorage.getItem('onboardingComplete') === 'true';

  if (!onboardingDone) return <Navigate to="/onboarding" replace />;
  return <Navigate to="/dagboek" replace />;
}

export default function App() {
  const { refreshToken, setTokens, clear } = useAuthStore();

  useEffect(() => {
    if (!refreshToken) return;
    const apiBase = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';
    fetch(`${apiBase}/auth/refresh`, {
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
        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingWelcome />} />
        <Route path="/onboarding/privacy" element={<OnboardingPrivacy />} />
        <Route path="/onboarding/activatiecode" element={<OnboardingActivatiecode />} />
        <Route path="/onboarding/dagboek" element={<OnboardingDagboek />} />
        <Route path="/onboarding/gids" element={<OnboardingGids />} />
        <Route path="/onboarding/berichten" element={<OnboardingBerichten />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registreren" element={<RegisterPage />} />

        {/* App */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dagboek" element={<DiaryPage />} />
          <Route path="/dagboek/invullen" element={<DiaryVraag1Page />} />
          <Route path="/dagboek/invullen/vraag2" element={<DiaryVraag2Page />} />
          <Route path="/dagboek/invullen/vraag3" element={<DiaryVraag3Page />} />
          <Route path="/gids" element={<GuidePage />} />
          <Route path="/gids/:id" element={<ArticlePage />} />
          <Route path="/berichten" element={<MessagesPage />} />
          <Route path="/profiel" element={<ProfilePage />} />
        </Route>

        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
