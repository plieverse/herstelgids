import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import BottomNav from './BottomNav';

export default function ProtectedRoute() {
  const { accessToken, refreshToken } = useAuthStore();

  // Allow through if we have either token (accessToken restores async on boot)
  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}
