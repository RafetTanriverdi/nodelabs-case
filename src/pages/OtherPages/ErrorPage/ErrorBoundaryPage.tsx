import React, { type ErrorInfo, type ReactNode } from "react";
import Button from "@rt/components/ui/Button/Button";
import ErrorState from "@rt/components/ui/ErrorState/ErrorState";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import styles from "./ErrorBoundaryPage.module.scss";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { hasError: false };
    constructor(props: ErrorBoundaryProps) {
        super(props);
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Component error caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.page}>
                    <div className={styles.container}>
                        <ErrorState
                            icon={
                                <HiOutlineExclamationTriangle aria-hidden="true" />
                            }
                            code="APP"
                            title="Something went wrong"
                            description="The app hit an unexpected error. You can reload the page or go back to the dashboard."
                            actions={
                                <>
                                    <Button
                                        variant="primary"
                                        type="button"
                                        onClick={() =>
                                            window.location.assign("/")
                                        }
                                    >
                                        Go to Dashboard
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() =>
                                            window.location.reload()
                                        }
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

        return this.props.children;
    }
}

export default ErrorBoundary;
