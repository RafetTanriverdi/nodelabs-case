import Sidebar from "@rt/components/layout/Sidebar/Sidebar";
import { useLogout } from "@rt/hooks/useAuth";
import { usePrivateLayoutStore } from "@rt/stores/private-layout-store";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import styles from "./PrivateLayout.module.scss";

function PrivateLayout({ children }: PropsWithChildren) {
  const mutation = useLogout();
  const isSidebarOpen = usePrivateLayoutStore((s) => s.isSidebarOpen);
  const closeSidebar = usePrivateLayoutStore((s) => s.closeSidebar);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    return () => closeSidebar();
  }, [closeSidebar]);

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
      <div
        className={styles.backdrop}
        data-open={isSidebarOpen ? "true" : "false"}
        onClick={closeSidebar}
        aria-hidden={!isSidebarOpen}
      />

      <div
        className={styles.sidebarSlot}
        data-open={isSidebarOpen ? "true" : "false"}
      >
        <Sidebar
          id="private-sidebar"
          onLogout={onLogout}
          onClose={closeSidebar}
          onNavigate={closeSidebar}
        />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default PrivateLayout;
