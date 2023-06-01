import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteProps = FCWithChildren & {
  condition: boolean;
  redirect: string;
};

export type ProtectedRouteState = { from?: string } | undefined;

function ProtectedRoute({ children, condition, redirect }: ProtectedRouteProps) {
  const location = useLocation();

  if (condition) {
    return (
      <Navigate
        to={redirect}
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }
  if (children) return <>{children}</>;
  return <Outlet />;
}

export default ProtectedRoute;
