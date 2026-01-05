import Sidebar from "@rt/components/layout/Sidebar/Sidebar";
import { useLogout } from "@rt/hooks/useAuth";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./PrivateLayout.module.scss";

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
    <div className={styles.layout}>
      <Sidebar onLogout={onLogout} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default PrivateLayout;
