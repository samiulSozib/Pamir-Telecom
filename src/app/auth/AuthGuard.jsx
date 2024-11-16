import { Navigate, useLocation } from "react-router-dom";
// HOOK
import useAuth from "app/hooks/useAuth";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useSelector((state)=>state.auth);
  const { pathname } = useLocation();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
}
