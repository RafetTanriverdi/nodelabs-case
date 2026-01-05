import Sidebar from "@rt/components/layout/Sidebar/Sidebar";
import { useLogout } from "@rt/hooks/useAuth";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateLayout({ children }: PropsWithChildren) {
  const mutation = useLogout();

  if (mutation.isSuccess) {
    return <Navigate to={getRoutePath(ROUTES_ID.login)} replace />;
  }

  const onLogout = () => {
    try {
      mutation.mutate();
      toast.success("Logged out successfully.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(`Logout failed: ${message}`);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidebar onLogout={onLogout} />
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
}

export default PrivateLayout;
