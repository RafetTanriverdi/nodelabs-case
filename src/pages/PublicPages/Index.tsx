import { getToken } from "@rt/authentication/auth-utils";
import PublicLayout from "@rt/layouts/PublicLayout/PublicLayout";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";

import { Navigate, Outlet } from "react-router-dom";

const Index = () => {
  const isAuthenticated = getToken();
  if (isAuthenticated) {
    return <Navigate to={getRoutePath(ROUTES_ID.dashboard)} replace />;
  }
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default Index;
