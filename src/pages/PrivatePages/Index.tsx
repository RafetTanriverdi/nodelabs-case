import { getToken } from "@rt/authentication/auth-utils";
import PrivateLayout from "@rt/layouts/PrivateLayout";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { Navigate, Outlet } from "react-router-dom";

const Index = () => {
  const isAuthenticated = getToken();
  if (!isAuthenticated) {
    return <Navigate to={getRoutePath(ROUTES_ID.login)} replace />;
  }
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default Index;
