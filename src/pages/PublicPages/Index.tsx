import { checkUserAuthentication } from "@rt/authentication/auth-utils";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";

import { Navigate, Outlet } from "react-router-dom";

const Index = () => {
  const isAuthenticated = checkUserAuthentication();
  if (isAuthenticated) {
    return <Navigate to={getRoutePath(ROUTES_ID.dashboard)} replace />;
  }
  return (
    <Outlet />
  );
};

export default Index;