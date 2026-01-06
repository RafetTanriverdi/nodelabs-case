import Button from "@rt/components/ui/Button/Button";
import ErrorState from "@rt/components/ui/ErrorState/ErrorState";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import styles from "./NotFound404Page.module.scss";

export default function NotFound404Page() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ErrorState
          icon={<HiOutlineMagnifyingGlass aria-hidden="true" />}
          code="404"
          title="Page not found"
          description="The page you’re looking for doesn’t exist or was moved."
          actions={
            <>
              <Button
                variant="primary"
                type="button"
                onClick={() => window.location.assign("/")}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}
