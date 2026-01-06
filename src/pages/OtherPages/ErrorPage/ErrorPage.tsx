import Button from "@rt/components/ui/Button/Button";
import ErrorState from "@rt/components/ui/ErrorState/ErrorState";
import { useRouteError } from "react-router-dom";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import styles from "./ErrorPage.module.scss";

function extractRouteErrorDetails(error: unknown) {
  let code: string | undefined;
  let details: string | undefined;

  if (error instanceof Response) {
    code = String(error.status);
    details = error.statusText || `HTTP ${error.status}`;
  } else if (error instanceof Error) {
    details = error.message;
  } else if (typeof error === "string") {
    details = error;
  } else if (error && typeof error === "object") {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string") details = maybeMessage;

    const maybeStatus = (error as { status?: unknown }).status;
    if (typeof maybeStatus === "number") code = String(maybeStatus);
  }

  const isNotFound = code === "404";

  return {
    code,
    title: isNotFound ? "Page not found" : "Something went wrong",
    description: isNotFound
      ? "We couldn’t find the page you’re looking for."
      : "An unexpected error occurred. You can try again or return to the dashboard.",
    details,
  };
}

export default function ErrorPage() {
  const error = useRouteError();
  const { code, title, description, details } = extractRouteErrorDetails(error);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ErrorState
          icon={<HiOutlineExclamationTriangle aria-hidden="true" />}
          code={code}
          title={title}
          description={description}
          details={details}
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
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
}
