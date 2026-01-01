import React, { type ErrorInfo, type ReactNode } from "react";

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
                <>
                    <h1>Oops! An error occurred.</h1>
                    <button
                        onClick={() => window.location.replace("/")}
                    >
                        GO HOME
                    </button>
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;